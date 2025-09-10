import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  FullUser,
  FullUserDiary,
  AttendanceStatus,
} from "../features/users/types";

interface UsersState {
  users: FullUserDiary[];
}

const res = await axios.get<FullUser[]>(
  "https://jsonplaceholder.typicode.com/users"
);

const initialUsers: FullUserDiary[] = res.data.map((u) => ({
  ...u,
  diary: { status: "absent", rating: null },
}));

const initialState: UsersState = {
  users: initialUsers,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<Omit<FullUser, "id">>
    ) => {
      const maxId = state.users.length
        ? Math.max(...state.users.map((u) => u.id))
        : 0;
      state.users.push({
        id: maxId + 1,
        diary: { status: "absent", rating: null },
        ...action.payload,
      });
    },

    updateUser: (
      state,
      action: PayloadAction<{ id: number; changes: Partial<FullUserDiary> }>
    ) => {
      const { id, changes } = action.payload;
      const i = state.users.findIndex((u) => u.id === id);
      if (i !== -1) {
        state.users[i] = { ...state.users[i], ...changes, id };
      }
    },

    deleteUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },

    setDiaryStatus: (
      state,
      action: PayloadAction<{ id: number; status: AttendanceStatus }>
    ) => {
      const { id, status } = action.payload;
      const u = state.users.find((x) => x.id === id);
      if (u) {
        u.diary = {
          ...(u.diary ?? { rating: null }),
          status,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    setDiaryRating: (
      state,
      action: PayloadAction<{ id: number; rating: number | null }>
    ) => {
      const { id, rating } = action.payload;
      const u = state.users.find((x) => x.id === id);
      if (u) {
        u.diary = {
          ...(u.diary ?? { status: "absent" }),
          rating,
          updatedAt: new Date().toISOString(),
        };
      }
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  setDiaryStatus,
  setDiaryRating,
} = usersSlice.actions;

export const selectAllUsers = (state: { users: UsersState }) =>
  state.users.users;

export const selectUserByID = (
  state: { users: UsersState },
  userId: number
) => state.users.users.find((user) => user.id === userId);

export default usersSlice.reducer;