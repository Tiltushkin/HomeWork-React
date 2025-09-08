import { useEffect, useState } from "react";
import axios from "axios";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: object;
  phone: string;
  website: string;
  company: object;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get<User[]>(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(res.data);
      } catch (e: any) {
        if (axios.isCancel(e)) return;
        setError(e?.message ?? "Не удалось загрузить задачи");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {
    users,
    loading,
    error
  };
}

export default useUsers;