import axios from 'axios';
import config from '../config';
import store from '../app/store';

const { token } = store.getState().auth || JSON.parse(localStorage.getItem('auth'));

async function getInvoiceById(orderId) {
  // eslint-disable-next-line no-return-await
  return await axios.get(`${config.apiHost}/api/invoices/${orderId}`, {
    headers: {
      Authorization: token,
    },
  });
}

export default getInvoiceById;
