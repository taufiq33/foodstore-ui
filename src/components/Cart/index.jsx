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
import { CardItem, Button, Text } from 'upkit';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';

import config from '../../config';
import sumPrice from '../../utils/sum-price';
import formatRupiah from '../../utils/format-rupiah';

function Cart({
  items, onDecFunc, onIncFunc, onCheckout,
}) {
  const total = sumPrice(items);
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
      <div className="p-2">
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
      <div className="text-center">
        <Text as="h5" bold>
          Total :
          {formatRupiah(total)}
        </Text>
      </div>
      <div className="p-2 border-b mb-5 mt-5">
        <Button
          text="Checkout"
          fitContainer
          iconAfter={<FaArrowRight />}
          disabled={!items.length}
          onClick={() => onCheckout()}
        />
      </div>
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
  onCheckout: func.isRequired,
};

export default Cart;
