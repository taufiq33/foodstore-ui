import React from 'react';
import {
  HashRouter, Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { object, string } from 'prop-types';

import store from './app/store';
import listen from './app/listener';
import { getCart } from './api/cart';

import Home from './pages/Home';
import UserAccount from './pages/UserAccount';
import UserLogout from './pages/UserLogout';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Login from './pages/Login';
import UserAddressList from './pages/UserAddressList';
import UserAddressAdd from './pages/UserAddressAdd';
import Checkout from './pages/Checkout';
import UserOrders from './pages/UserOrders';
import Invoices from './pages/Invoices';

function ProtectedRoute({ user, redirectPath = '/login' }) {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return <Outlet />;
}

function App() {
  React.useEffect(() => {
    listen();
    getCart();
  }, []);
  return (
    <div>
      <Provider store={store}>
        <HashRouter>
          <Routes>
            <Route element={<ProtectedRoute user={store.getState().auth.user} />}>
              <Route path="/account" element={<UserAccount />} />
              <Route path="/account/logout" element={<UserLogout />} />
              <Route path="/alamat-pengiriman" element={<UserAddressList />} />
              <Route path="/alamat-pengiriman/tambah" element={<UserAddressAdd />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders" element={<UserOrders />} />
              <Route path="/invoice/:id" element={<Invoices />} />
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/berhasil" element={<RegisterSuccess />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </HashRouter>
      </Provider>
    </div>
  );
}

ProtectedRoute.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  user: object.isRequired,
  redirectPath: string,
};

ProtectedRoute.defaultProps = {
  redirectPath: '/login',
};

export default App;
