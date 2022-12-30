/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useParams } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';
import { LayoutOne, Table, Text } from 'upkit';

import TopBar from '../../components/TopBar';
import getInvoiceById from '../../api/invoice';
import formatRupiah from '../../utils/format-rupiah';
import StatusLabel from '../../components/StatusLabel';
import config from '../../config';

function Invoices() {
  const [invoice, setInvoice] = React.useState(null);
  const [status, setStatus] = React.useState('process');
  const [error, setError] = React.useState(null);
  const { id } = useParams();

  React.useEffect(() => {
    getInvoiceById(id)
      .then((data) => {
        if (data?.error) {
          setError(data?.error || 'Terjadi kesalahan');
        }
        const { data: invoiceData } = data;
        setInvoice(invoiceData);
      })
      .finally(() => setStatus('idle'));
  }, [id]);

  if (status === 'process') {
    return (
      <LayoutOne>
        <div className="py-10 text-center">
          <div className="inline-block">
            <BounceLoader color="red" />
          </div>
        </div>
      </LayoutOne>
    );
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <LayoutOne>
      <TopBar />
      <div className="my-10">
        <Text as="h3">Invoice Page for #{id}</Text>
        <Table
          showPagination={false}
          items={[
            { label: 'Status Order', value: <StatusLabel status={invoice.status} /> },
            { label: 'ORDER id', value: `#${invoice.order.order_number}` },
            { label: 'Total Amount', value: `${formatRupiah(invoice.total)}` },
            {
              label: 'Total Amount',
              value: (
                <div>
                  <ul className="list-none">
                    <li className="font-bold">{invoice.user.full_name}</li>
                    <li className="font-bold">{invoice.user.email}</li>
                    <li className="font-bold">{invoice.delivery_address.detail}</li>
                    <li className="font-bold">{invoice.delivery_address.kelurahan}</li>
                    <li className="font-bold">{invoice.delivery_address.kecamatan}</li>
                    <li className="font-bold">{invoice.delivery_address.kabupaten}</li>
                    <li className="font-bold">{invoice.delivery_address.provinsi}</li>
                  </ul>
                </div>
              ),
            },
            {
              label: 'Payment to',
              value: (
                <div>
                  <ul className="list-none">
                    <li className="font-bold">{config.owner}</li>
                    <li className="font-bold">{config.billing.account_no}</li>
                    <li className="font-bold">{config.billing.bank_name}</li>
                    <li className="font-bold">{config.contact}</li>
                  </ul>
                </div>
              ),
            },
          ]}
          columns={[
            {
              Header: 'Invoice',
              accessor: 'label',
            },
            {
              Header: '',
              accessor: 'value',
            },
          ]}
        />
      </div>
    </LayoutOne>
  );
}

export default Invoices;
