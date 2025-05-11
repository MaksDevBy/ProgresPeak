import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export function useLogout() {
  const navigate = useNavigate();

  useEffect(() => {
    async function performLogout() {
      try {
        // запрос к бекенду для удаления куки и блэклиста токена
        const response = await axios.post(
            'http://127.0.0.1:8000/api/logout/',
            {},
            {withCredentials: true}
        );
        console.log('Logout response:', response.data);
      } catch (err) {
        console.error('Ошибка при логауте:', err);
      } finally {
        // очистка клиентских данных
        delete axios.defaults.headers.common['Authorization'];
        // перенаправление на страницу логина
        navigate('/login', {replace: true});
      }
    }

    performLogout();
  }, [navigate]);
}
