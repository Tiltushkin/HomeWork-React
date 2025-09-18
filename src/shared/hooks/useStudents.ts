import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../store/store';
import { fetchStudents, selectStudentsError, selectStudentsLoading } from '../../slices/studentsSlice';

export default function useStudents() {
  const d = useDispatch<AppDispatch>();
  const loading = useSelector(selectStudentsLoading);
  const error = useSelector(selectStudentsError);

  useEffect(() => {
    d(fetchStudents());
  }, [d]);

  return { loading, error };
}