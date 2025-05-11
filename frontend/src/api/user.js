import api from './client.js'

/**
 * GET /user/ для получения данных текущего пользователя
 */

export async function fetchCurrentUser() {
    const response = await api.get('/user/');
    return response.data;
}
