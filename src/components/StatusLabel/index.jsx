import { string } from 'prop-types';
import React from 'react';
import { Badge } from 'upkit';

function StatusLabel({ status }) {
  switch (status) {
    case 'waiting_payment':
      return (
        <Badge color="orange">Menunggu Pembayaran</Badge>
      );
    case 'paid':
      return (
        <Badge color="green">Terbayar Lunas</Badge>
      );
    case 'processing':
      return (
        <Badge color="yellow">Memproses Pesanan</Badge>
      );
    case 'in_delivery':
      return (
        <Badge color="blue">Dalam pengiriman</Badge>
      );
    case 'delivered':
      return (
        <Badge color="teal">Barang diterima</Badge>
      );
    default:
      return (
        <Badge color="orange">Menunggu Pembayaran</Badge>
      );
  }
}

StatusLabel.propTypes = {
  status: string.isRequired,
};

export default StatusLabel;
