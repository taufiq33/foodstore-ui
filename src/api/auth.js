/* eslint-disable no-return-await */
import axios from 'axios';
import config from '../config';

async function registerUser(data) {
  return await axios.post(`${config.apiHost}/auth/register`, data);
}

async function login(email, password) {
  return await axios.post(`${config.apiHost}/auth/login`, {
    email, password,
  });
}

async function logout() {
  const { token } = localStorage.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth'))
    : {};

  return await axios.post(`${config.apiHost}/auth/logout`, null, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      localStorage.removeItem('auth');
      return response;
    });
}

export {
  registerUser, login, logout,
};
