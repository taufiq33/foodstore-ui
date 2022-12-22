import axios from 'axios';
import config from '../config';
import store from '../app/store';

const { token } = store.getState().auth || JSON.parse(localStorage.getItem('auth'));

async function getDeliveryAddress(params) {
  // eslint-disable-next-line no-return-await
  return await axios.get(`${config.apiHost}/api/deliveryaddress`, {
    params: {
      limit: params.limit,
      skip: params.page * params.limit - params.limit,
    },
    headers: {
      authorization: token,
    },
  });
}

async function createDeliveryAddress(payload) {
  // eslint-disable-next-line no-return-await
  return await axios.post(`${config.apiHost}/api/deliveryaddress`, payload, {
    headers: {
      authorization: token,
    },
  });
}

export {
  createDeliveryAddress, getDeliveryAddress,
};
