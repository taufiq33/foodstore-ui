/* eslint-disable no-underscore-dangle */
import React from 'react';
import 'upkit/dist/style.min.css';
import {
  SideNav, LayoutSidebar, CardProduct, Responsive,
} from 'upkit';
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';

import config from '../../config';
import menus from './menus';
import TopBar from '../../components/TopBar';
import { fetchProduct } from '../../features/Products/actions';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div>
      <LayoutSidebar
        sidebar={<SideNav items={menus} verticalAlign="top" />}
        content={
          (
            <div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen pt-4">
              <div className="w-full md:w-3/4 pl-5 pb-5">
                <TopBar />

                {
                  products.status === 'process' && !products.data.length
                    ? (
                      <div className="flex flex-col justify-center items-center h-full">
                        <p className="text-red-600 font-bold text-2xl italic pb-5">Please wait..</p>
                        <SyncLoader color="red" size={20} />
                      </div>
                    )
                    : ''
                }

                <Responsive desktop={2} justify="stretch" items="stretch">
                  {products.data.map((product) => (
                    <div key={product._id} className="p-2 m-3">
                      <CardProduct
                        title={product.name}
                        imgUrl={product.image_url ? `${config.apiHost}/uploads/${product.image_url}` : 'https://picsum.photos/seed/food/248/248'}
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
              </div>
              <div className="w-full md:w-1/4 h-full shadow-lg bg-gray-100 border-r-2 border-white pl-5">
                Bagian keranjang aplikasi
              </div>
            </div>
          )
        }
        sidebarSize={80}
      />
    </div>
  );
}

export default Home;
