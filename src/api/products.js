import axios from 'axios';
import config from '../config';

async function getProducts(params) {
  // eslint-disable-next-line no-return-await
  return await axios.get(`${config.apiHost}/products`, { params });
}

export default getProducts;
