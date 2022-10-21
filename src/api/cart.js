import axios from 'axios';

import store from '../app/store';
import config from '../config';
import { setItems } from '../features/Cart/actions';

const { token } = store.getState().auth || JSON.parse(localStorage.getItem('auth'));

async function saveCart(cart) {
  // eslint-disable-next-line no-return-await
  return await axios.put(`${config.apiHost}/api/carts`, {
    items: cart,
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

async function getCart() {
  const requestCart = await axios.get(`${config.apiHost}/api/carts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!requestCart.data.error) {
    store.dispatch(setItems(requestCart.data));
  }
}

export {
  saveCart, getCart,
};
