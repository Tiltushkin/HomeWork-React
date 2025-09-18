import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import type { Student, StudentUpdateAttend, StudentUpdateGrade } from '../features/students/types';
import * as api from '../api/studentsApi';

const studentsAdapter = createEntityAdapter<Student>({
  sortComparer: (a: Student, b: Student) => a.name.localeCompare(b.name, 'ru'),
});

export const fetchStudents = createAsyncThunk('students/fetchAll', async () => {
  return await api.fetchStudents();
});

export const updateAttend = createAsyncThunk(
  'students/updateAttend',
  async ({ id, attend }: StudentUpdateAttend) => {
    await api.putAttend(id, attend);
    // тела ответа не ждём — успех по статусу; вернём аргумент
    return { id, attend };
  }
);

export const updateGrade = createAsyncThunk(
  'students/updateGrade',
  async ({ id, grade }: StudentUpdateGrade) => {
    await api.putGrade(id, grade);
    return { id, grade };
  }
);

const slice = createSlice({
  name: 'students',
  initialState: studentsAdapter.getInitialState<{ loading: boolean; error: string | null }>({
    loading: false,
    error: null,
  }),
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchStudents.pending, (st) => {
      st.loading = true;
      st.error = null;
    });
    b.addCase(fetchStudents.fulfilled, (st, { payload }) => {
      st.loading = false;
      studentsAdapter.setAll(st, payload);
    });
    b.addCase(fetchStudents.rejected, (st, { error }) => {
      st.loading = false;
      st.error = error.message ?? 'Ошибка загрузки';
    });

    // ✅ Оптимистичное обновление статуса
    b.addCase(updateAttend.pending, (st, { meta }) => {
      studentsAdapter.updateOne(st, { id: meta.arg.id, changes: { attend: meta.arg.attend } });
    });
    // Подтверждение успеха (ничего не делаем — уже поменяли)
    b.addCase(updateAttend.fulfilled, () => {});
    // В случае ошибки покажем сообщение (при желании можно refetch)
    b.addCase(updateAttend.rejected, (st, { error }) => {
      st.error = error.message ?? 'Не удалось обновить статус';
    });

    // ✅ Оптимистичное обновление оценки
    b.addCase(updateGrade.pending, (st, { meta }) => {
      studentsAdapter.updateOne(st, { id: meta.arg.id, changes: { grade: meta.arg.grade } });
    });
    b.addCase(updateGrade.fulfilled, () => {});
    b.addCase(updateGrade.rejected, (st, { error }) => {
      st.error = error.message ?? 'Не удалось обновить оценку';
    });
  },
});

export default slice.reducer;
export const {
  selectAll: selectAllStudents,
  selectById: selectStudentById,
  selectEntities: selectStudentEntities,
} = studentsAdapter.getSelectors<RootState>((s) => s.students);
export const selectStudentsLoading = (s: RootState) => s.students.loading;
export const selectStudentsError = (s: RootState) => s.students.error;