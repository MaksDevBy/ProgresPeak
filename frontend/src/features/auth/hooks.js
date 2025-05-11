import { useState } from 'react';
import { login } from '../../api/auth';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function doLogin(email, password) {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      return data;
    } catch (e) {
      setError(e.response?.data || e.message);
    } finally {
      setLoading(false);
    }
  }

  return { doLogin, loading, error };
}
