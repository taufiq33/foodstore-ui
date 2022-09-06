/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Responsive, CardProduct } from 'upkit';

export default function DummyProduct() {
  const products = [];
  for (let l = 1; l < 5; l += 1) {
    products.push({
      _id: +(new Date()),
      name: 'please wait... ',
      image_url: 'https://picsum.photos/seed/food/248/248',
      price: 'please wait... ',
    });
  }
  return (
    <Responsive desktop={2} justify="stretch" items="stretch">
      {products.map((product) => (
        <div key={product._id} className="p-2 m-3 opacity-25">
          <CardProduct
            color="white"
            title={product.name}
            imgUrl={product.image_url}
            price={product.price}
            onAddToCart={() => console.log(`${product._id} added to cart`)}
            withFavorite
            subText={(
              <p className="italic text-slate-100">
                {`${product?.description?.substr(0, 25) || ''}...`}
              </p>
            )}
          />
        </div>
      ))}
    </Responsive>
  );
}
