import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true,
});

export async function login(email, password) {
  try {
    const response = await api.post('/login/', {email, password});
    return response.data; // Возвращает, например, { message: "Login successful" }
  } catch (error) {
    console.error('Login failed:', error.response?.data);
    throw error;
  }
}

export async function logout() {
  const response = await api.post('/logout')
  return response.data
}