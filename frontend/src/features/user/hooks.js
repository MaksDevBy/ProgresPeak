import { useState, useEffect } from 'react';
import { fetchCurrentUser } from '../../api/user';

/**
 * Хук для получения данных текущего пользователя
 */
export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCurrentUser()
      .then(data => setUser(data))
      .catch(e => setError(e.response?.data || e.message))
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}
