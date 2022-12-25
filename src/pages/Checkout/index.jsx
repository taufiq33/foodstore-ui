import React from 'react';
import {
  Button, LayoutOne, Steps, Table, Card,
} from 'upkit';
import { useSelector } from 'react-redux';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';
import FaAddressCard from '@meronex/icons/fa/FaAddressCard';
import FaInfoCircle from '@meronex/icons/fa/FaInfoCircle';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';

import config from '../../config';
import formatRupiah from '../../utils/format-rupiah';
import sumPrice from '../../utils/sum-price';
import TopBar from '../../components/TopBar';
import useAddressHook from '../../hooks/addressHook';

const cartColumns = [
  {
    Header: 'Nama Produk',
    accessor: (item) => (
      <div className="flex items-center jusitfy-center">
        <img src={`${config.apiHost}/uploads/${item.product.image_url}`} alt="Gambar produk" width={48} />
        <span className="pl-2">{item.name}</span>
      </div>
    ),
  },
  {
    Header: 'Jumlah Produk',
    accessor: 'qty',
  },
  {
    Header: 'Harga Satuan',
    accessor: (item) => formatRupiah(item.price),
  },
  {
    Header: 'Harga Total',
    accessor: (item) => formatRupiah(item.price * item.qty),
  },
];

const addressColumn = [
  {
    Header: 'Pilih Alamat',
    accessor: (alamat) => (
      <div>
        <b>{alamat.nama}</b>
        <br />
        {`${alamat.detail}, ${alamat.kelurahan}, ${alamat.kecamatan}, ${alamat.kabupaten}, ${alamat.provinsi}`}
      </div>
    ),
  },
];

// eslint-disable-next-line react/prop-types
function IconWrapper({ children }) {
  return (
    <div className="flex justify-center">
      {children}
    </div>
  );
}

function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState(null);
  const {
    addressData,
    addressDataCount,
    limit,
    page,
    setPage,
    status,
  } = useAddressHook();
  const cart = useSelector((state) => state.cart);

  const steps = [
    {
      label: 'Item',
      icon: <IconWrapper><FaCartPlus /></IconWrapper>,
    },
    {
      label: 'Alamat',
      icon: <IconWrapper><FaAddressCard /></IconWrapper>,
    },
    {
      label: 'Konfirmasi',
      icon: <IconWrapper><FaInfoCircle /></IconWrapper>,
    },
  ];

  return (
    <LayoutOne size="large">
      <TopBar />
      <h2 className="text-xl font-bold underline mb-8 text-center">Checkout Page</h2>
      <div className="max-w-lg mx-auto">
        <Steps active={activeStep} onChange={(step) => setActiveStep(step)} steps={steps} />
      </div>
      <hr className="my-4 opacity-60" />
      {
        activeStep === 0
          ? (
            <>
              <Table
                items={cart}
                columns={cartColumns}
                perPage={cart.length}
                showPagination={0}
              />
              <div className="mt-2 flex justify-center items-center flex-col gap-2">
                <h4 className="text-lg font-bold">
                  {`Subtotal : ${formatRupiah(sumPrice(cart))}`}
                </h4>
                <Button
                  className="mr-10"
                  onClick={() => setActiveStep(activeStep + 1)}
                  iconAfter={<FaArrowRight />}
                >
                  Selanjutnya
                </Button>
              </div>
            </>
          )
          : null
      }

      {
        activeStep === 1
          ? (
            <>
              <Table
                items={addressData}
                totalItems={addressDataCount}
                selectable
                columns={addressColumn}
                page={page}
                perPage={limit}
                onPageChange={(pg) => setPage(pg)}
                isLoading={status === 'process'}
                selectedRow={selectedAddress}
                onSelectRow={(address) => setSelectedAddress(address)}
              />
              <p>
                Your Selected Address is :
                {
                  selectedAddress
                    ? (
                      <Card
                        header={selectedAddress.nama}
                        body={`${selectedAddress.detail}, ${selectedAddress.kelurahan}, ${selectedAddress.kecamatan}, ${selectedAddress.kabupaten}, ${selectedAddress.provinsi}`}
                        color="white"
                      />
                    )
                    : ''
                }
              </p>
            </>
          )
          : null
      }
      <hr className="my-10 opacity-20" />
    </LayoutOne>
  );
}

export default Checkout;
