/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  string,
  arrayOf,
  shape,
  number,
  func,
  oneOfType,
} from 'prop-types';
import { CardItem } from 'upkit';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';

import config from '../../config';

function Cart({ items, onDecFunc, onIncFunc }) {
  return (
    <div className="p-2">
      <div className="flex text-2xl text-red-700 font-bold items-center justify-center">
        <FaCartPlus />
        <h2 className="ml-2">YourCart</h2>
      </div>
      {items.length === 0 && (
        <p className="text-sm text-red-800 text-center mt-5 italic">
          Your cart is empty now..
        </p>
      )}
      {items.map((item) => (
        <div className="my-4" key={item._id}>
          <CardItem
            imgUrl={`${config.apiHost}/uploads/${item.image_url || item.product.image_url}`}
            qty={item.qty}
            name={item.name}
            onDec={() => onDecFunc(item)}
            onInc={() => onIncFunc(item)}
          />
        </div>
      ))}
    </div>
  );
}

Cart.propTypes = {
  items: arrayOf(shape({
    _id: string.isRequired,
    name: string.isRequired,
    qty: oneOfType([string, number]).isRequired,
  })).isRequired,
  onIncFunc: func.isRequired,
  onDecFunc: func.isRequired,
};

export default Cart;
