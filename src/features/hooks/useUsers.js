import { useEffect, useState } from 'react';
import axios from 'axios';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    axios.get('http://jsonplaceholder.typicode.com/users')
      .then(res => {
        if (mounted) {
          setUsers(res.data || []);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          console.error(err);
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { users, loading, error };
}