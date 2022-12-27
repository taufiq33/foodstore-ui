/* eslint-disable no-return-await */
import axios from 'axios';
import store from '../app/store';
import config from '../config';

const { token } = store.getState().auth || JSON.parse(localStorage.getItem('auth'));

async function getOrders(params) {
  return await axios.get(`${config.apiHost}/api/orders`, {
    params: {
      limit: params.limit,
      skip: params.skip,
    },
    headers: {
      authorization: token,
    },
  });
}

async function createOrders(payload) {
  return axios.post(`${config.apiHost}/api/orders`, payload, {
    headers: {
      authorization: token,
    },
  });
}

export {
  getOrders, createOrders,
};
