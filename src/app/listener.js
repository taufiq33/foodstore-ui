import store from './store';
import { saveCart } from '../api/cart';

let currentAuth;
let currentCart;

function listener() {
  const previousAuth = currentAuth;
  currentAuth = store.getState().auth;

  const previousCart = currentCart;
  currentCart = store.getState().cart;

  if (currentAuth !== previousAuth) {
    localStorage.setItem('auth', JSON.stringify(currentAuth));
    saveCart(currentCart);
  }

  if (currentCart !== previousCart) {
    localStorage.setItem('cart', JSON.stringify(currentCart));
    saveCart(currentCart);
  }
}

function listen() {
  store.subscribe(listener);
}

export default listen;
