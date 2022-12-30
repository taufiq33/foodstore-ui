import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, LayoutOne, Responsive } from 'upkit';
import FaHome from '@meronex/icons/fa/FaHome';
import FaAddressBook from '@meronex/icons/fa/FaAddressBook';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaFileInvoice from '@meronex/icons/fa/FaFileInvoice';

import IconWrapper from '../../components/IconWrapper';
import TopBar from '../../components/TopBar';

function UserAccount() {
  const navigate = useNavigate();
  const menus = [
    {
      label: 'Beranda',
      icon: (
        <IconWrapper><FaHome /></IconWrapper>
      ),
      url: '/',
    },
    {
      label: 'Alamat Pengiriman',
      icon: (
        <IconWrapper><FaAddressBook /></IconWrapper>
      ),
      url: '/alamat-pengiriman',
    },
    {
      label: 'Pesanan Saya',
      icon: (
        <IconWrapper><FaFileInvoice /></IconWrapper>
      ),
      url: '/orders',
    },
    {
      label: 'Logout',
      icon: (
        <IconWrapper><FaArrowRight /></IconWrapper>
      ),
      url: '/account/logout',
    },
  ];
  console.log(menus);
  return (
    <LayoutOne>
      <TopBar />
      <Responsive desktop={4} mobile={2}>
        {menus.map((items) => (
          <Card
            body={<p className="font-bold text-white text-center">{items.label}</p>}
            header={items.icon}
            onClick={() => navigate(items.url)}
          />
        ))}
      </Responsive>
    </LayoutOne>
  );
}

export default UserAccount;
