import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export type StatusFilter = "all" | "completed" | "incomplete";
export type SortOrder = "new" | "old";

export interface UserStat {
  id: number;
  total: number;
  completed: number;
  incomplete: number;
}

export function useTodos() {
  const [rawTodos, setRawTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [userId, setUserId] = useState<number | "all">("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sortOrder, setSortOrder] = useState<SortOrder>("new");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<Todo[]>(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setRawTodos(res.data);
      } catch (e: any) {
        if (axios.isCancel(e)) return;
        setError(e?.message ?? "Не удалось загрузить задачи");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const todos = useMemo(() => {
    let list = rawTodos;

    if (userId !== "all") {
      list = list.filter((t) => t.userId === userId);
    }

    if (status === "completed") list = list.filter((t) => t.completed);
    else if (status === "incomplete") list = list.filter((t) => !t.completed);

    return [...list].sort((a, b) =>
      sortOrder === "new" ? b.id - a.id : a.id - b.id
    );
  }, [rawTodos, userId, status, sortOrder]);

  const userStats: UserStat[] = useMemo(() => {
    const map = new Map<number, { total: number; completed: number }>();
    for (const t of rawTodos) {
      const m = map.get(t.userId) ?? { total: 0, completed: 0 };
      m.total += 1;
      if (t.completed) m.completed += 1;
      map.set(t.userId, m);
    }
    return Array.from(map.entries())
      .map(([id, { total, completed }]) => ({
        id,
        total,
        completed,
        incomplete: total - completed,
      }))
      .sort((a, b) => a.id - b.id);
  }, [rawTodos]);

  const resetFilters = () => {
    setUserId("all");
    setStatus("all");
    setSortOrder("new");
  };

  return {
    todos,
    loading,
    error,
    userId,
    setUserId,
    status,
    setStatus,
    sortOrder,
    setSortOrder,
    resetFilters,
    userStats,
  };
}

export default useTodos;