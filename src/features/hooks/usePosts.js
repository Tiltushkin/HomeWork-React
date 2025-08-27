import axios from "axios";
import { useEffect, useState } from "react";

export function usePosts(baseUrl, { start = 0, limit = 10, userId = null } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    setError(null);

    const params = { _start: start, _limit: limit };
    if (userId) params.userId = userId;

    axios
      .get(baseUrl, {
        params,
        cancelToken: source.token,
      })
      .then((res) => {
        setPosts(res.data || []);
        const total = res.headers["x-total-count"];
        setTotalCount(total ? Number(total) : null);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(err.message || String(err));
        setPosts([]);
        setTotalCount(null);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      source.cancel("usePosts: canceled");
    };
  }, [baseUrl, start, limit, userId]);

  return [posts, loading, error, totalCount];
}