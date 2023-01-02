/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  LayoutOne, Text, Table, Button,
} from 'upkit';
import { Link } from 'react-router-dom';
import FaFileInvoiceDollar from '@meronex/icons/fa/FaFileInvoiceDollar';

import TopBar from '../../components/TopBar';
import StatusLabel from '../../components/StatusLabel';
import { getOrders } from '../../api/orders';
import sumPrice from '../../utils/sum-price';
import formatRupiah from '../../utils/format-rupiah';
import config from '../../config';

const columns = [
  {
    Header: '',
    id: 'Status',
    accessor: (order) => (
      <div>
        <Text as="h5">
          #
          {' '}
          {order.order_number}
        </Text>
        <div>
          <StatusLabel status={order.status} />
        </div>
      </div>
    ),
  },
  {
    Header: 'Items',
    accessor: (order) => (
      <div>
        <ul>
          {order.order_items.map((item) => <li key={item.name}>{`${item.name}, ${item.qty}`}</li>)}
        </ul>
      </div>
    ),
  },
  {
    Header: 'Total',
    accessor: (order) => (
      <div>
        <Text as="h5">{formatRupiah(Number(sumPrice(order.order_items)) + Number(config.globalOngkir))}</Text>
      </div>
    ),
  },
  {
    Header: 'Invoice',
    accessor: (order) => (
      <div>
        <Link to={`/invoice/${order._id}`}>
          <Button iconBefore={<FaFileInvoiceDollar />}>Invoice</Button>
        </Link>
      </div>
    ),
  },
];

function UserOrders() {
  const [ordersData, setOrdersData] = React.useState([]);
  const [ordersDataCount, setOrdersDataCount] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(3);
  const [pendingStatus, setPendingStatus] = React.useState(false);

  const getUserOrders = React.useCallback(async () => {
    setPendingStatus(true);
    const { data } = await getOrders({ limit, page });

    if (data.error) {
      return setPendingStatus('error');
    }

    console.log(data.data);
    setOrdersData(data.data);
    setOrdersDataCount(data.count);
    setPendingStatus(false);
    return true;
  }, [page, limit]);

  React.useEffect(() => {
    getUserOrders();
  }, [getUserOrders]);

  return (
    <LayoutOne>
      <TopBar />
      <div className="text-center font-bold mb-4">
        <Text as="h4">Riwayat Pesanan</Text>
      </div>
      <hr className="shadow-sm" />
      {ordersDataCount < 1 && !pendingStatus ? (
        <div className="text-center font-bold text-2xl">
          Data Pesanan anda kosong.
        </div>
      ) : (
        <Table
          columns={columns}
          items={ordersData}
          totalItems={ordersDataCount}
          onPageChange={(pg) => setPage(pg)}
          isLoading={pendingStatus}
        />
      )}
    </LayoutOne>
  );
}

export default UserOrders;
