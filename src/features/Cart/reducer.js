/* eslint-disable no-underscore-dangle */
import * as constant from './constant';

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// eslint-disable-next-line default-param-last
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case constant.ADD_ITEM:
      if (state.find((cartItem) => (cartItem._id === action.item._id))) {
        return state.map((cartItem) => (
          cartItem._id === action.item._id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        ));
      }
      return [...state, { ...action.item, qty: 1 }];

    case constant.REMOVE_ITEM:
      return state.map((cartItem) => (
        cartItem._id === action.item._id ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
      )).filter((cartItem) => cartItem.qty > 0);

    case constant.CLEAR_ITEMS:
      return [];

    case constant.SET_ITEMS:
      return action.items;

    default:
      return state;
  }
}

export default cartReducer;
