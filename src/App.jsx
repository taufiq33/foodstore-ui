import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './app/store';
import listen from './app/listener';
import { getCart } from './api/cart';

import Home from './pages/Home';
import Register from './pages/Register';
import RegisterSuccess from './pages/RegisterSuccess';
import Login from './pages/Login';
import UserAddressList from './pages/UserAddressList';
import UserAddressAdd from './pages/UserAddressAdd';
import Checkout from './pages/Checkout';

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
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register/berhasil" element={<RegisterSuccess />} />
            <Route path="/login" element={<Login />} />
            <Route path="/alamat-pengiriman" element={<UserAddressList />} />
            <Route path="/alamat-pengiriman/tambah" element={<UserAddressAdd />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </HashRouter>
      </Provider>
    </div>
  );
}

export default App;
