/* eslint-disable no-underscore-dangle */
import React from 'react';
import 'upkit/dist/style.min.css';
import {
  SideNav, LayoutSidebar, CardProduct, Responsive, Pagination, InputText,
} from 'upkit';
import { useDispatch, useSelector } from 'react-redux';
import { SyncLoader } from 'react-spinners';
import FaSearch from '@meronex/icons/fa/FaSearch';

import config from '../../config';
import menus from './menus';
import TopBar from '../../components/TopBar';
import DummyProduct from '../../components/DummyProduct';
import {
  fetchProduct, goToNextPage, goToPrevPage, setKeyword, setPage,
} from '../../features/Products/actions';

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  React.useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch, products.currentPage, products.keyword]);

  return (
    <div>
      <LayoutSidebar
        sidebar={<SideNav items={menus} verticalAlign="top" />}
        content={
          (
            <div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen pt-4">
              <div className="w-full md:w-3/4 pl-5 pb-5">
                <TopBar />
                <div className="w-full my-5 lg:px-8 md:px-6 sm:px-4 text-center">
                  <InputText
                    iconBefore={<FaSearch />}
                    placeholder="Search for something ..."
                    fitContainer
                    fullRound
                    value={products.keyword}
                    onChange={(e) => dispatch(setKeyword(e.target.value))}
                  />
                </div>

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

                {products.status === 'process' && <DummyProduct />}

                <Responsive desktop={2} justify="stretch" items="stretch">
                  {products.status === 'success' && products.data.map((product) => (
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

                {
                  products.status === 'process'
                    ? (
                      <div className="flex items-center justify-center">
                        <SyncLoader color="red" size={16} />
                      </div>
                    )
                    : null
                }

                <div className="flex justify-center items-center my-10">
                  <Pagination
                    totalItems={products.totalItems}
                    perPage={products.perPage}
                    page={products.currentPage}
                    onNext={() => dispatch(goToNextPage())}
                    onPrev={() => dispatch(goToPrevPage())}
                    onChange={(page) => dispatch(setPage(page))}
                  />
                </div>
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
