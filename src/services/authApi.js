// services/authApi.js

import api from './api';

export const loginUser = async (email, password) => {
  const response = await api.post('/auth/signin', {
    email,
    password,
  });

  return response.data;
};