/* eslint-disable no-underscore-dangle */
import React from 'react';
import {
  Button, LayoutOne, Steps, Table, Card,
} from 'upkit';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import FaCartPlus from '@meronex/icons/fa/FaCartPlus';
import FaAddressCard from '@meronex/icons/fa/FaAddressCard';
import FaInfoCircle from '@meronex/icons/fa/FaInfoCircle';
import FaArrowRight from '@meronex/icons/fa/FaArrowRight';
import FaArrowLeft from '@meronex/icons/fa/FaArrowLeft';
import FaRegCheckCircle from '@meronex/icons/fa/FaRegCheckCircle';

import config from '../../config';
import formatRupiah from '../../utils/format-rupiah';
import sumPrice from '../../utils/sum-price';
import TopBar from '../../components/TopBar';
import useAddressHook from '../../hooks/addressHook';
import { createOrders } from '../../api/orders';
import { clearItems } from '../../features/Cart/actions';

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
  const [invoiceCreateStatus, setInvoiceCreateStatus] = React.useState('idle');
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (!cart.length) return navigate('/');

  async function handleCreateOrder() {
    const payload = {
      delivery_fee: config.globalOngkir,
      // eslint-disable-next-line no-underscore-dangle
      delivery_address: selectedAddress._id,
    };
    setInvoiceCreateStatus('loading');
    const { data } = await createOrders(payload);
    if (data?.error) return false;
    if (data._id) {
      setInvoiceCreateStatus('idle');
      dispatch(clearItems());
    }
    return navigate(`/invoice/${data._id}`);
  }

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
                showPagination={false}
              />
              <div className="mt-2 flex justify-center items-center flex-col gap-2">
                <h4 className="text-lg font-bold">
                  {`Subtotal : ${formatRupiah(sumPrice(cart))}`}
                </h4>
                <Button
                  className="mr-10"
                  onClick={() => setActiveStep(activeStep + 1)}
                  iconAfter={<FaArrowRight />}
                  size="large"
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
              <div className="mt-5">
                <Button>
                  <Link to="/alamat-pengiriman/tambah">Tambah alamat baru</Link>
                </Button>
              </div>
              <div className="my-10">
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
              </div>
              <div className="flex items-center justify-evenly">
                <Button
                  onClick={() => setActiveStep(activeStep - 1)}
                  iconBefore={<FaArrowLeft />}
                  size="large"
                >
                  Sebelumnya
                </Button>
                <Button
                  onClick={() => setActiveStep(activeStep + 1)}
                  iconAfter={<FaArrowRight />}
                  size="large"
                  disabled={!selectedAddress}
                >
                  Selanjutnya
                </Button>
              </div>
            </>
          )
          : null
      }

      {
        activeStep === 2
          ? (
            <>
              <Table
                showPagination={false}
                columns={[
                  { Header: '', accessor: 'label' }, { Header: '', accessor: 'value' },
                ]}
                items={[
                  {
                    label: 'Alamat kirim',
                    value: (
                      <div>
                        <Card
                          header={selectedAddress.nama}
                          body={`${selectedAddress.detail}, ${selectedAddress.kelurahan}, ${selectedAddress.kecamatan}, ${selectedAddress.kabupaten}, ${selectedAddress.provinsi}`}
                          color="white"
                        />
                      </div>
                    ),
                  },
                  {
                    label: 'Subtotal', value: formatRupiah(sumPrice(cart)),
                  },
                  {
                    label: 'Ongkir', value: formatRupiah(Number(config.globalOngkir)),
                  },
                  {
                    label: 'Total keseluruhan', value: formatRupiah(Number(sumPrice(cart)) + Number(config.globalOngkir)),
                  },
                ]}
              />
              <div className="mt-5 flex items-center justify-evenly">
                <Button
                  onClick={() => setActiveStep(activeStep - 1)}
                  iconBefore={<FaArrowLeft />}
                  size="large"
                >
                  Sebelumnya
                </Button>
                <Button
                  onClick={() => handleCreateOrder()}
                  iconAfter={<FaRegCheckCircle />}
                  size="large"
                  disabled={invoiceCreateStatus === 'loading'}
                >
                  Buat Order
                </Button>
              </div>
            </>
          )
          : null
      }
      <hr className="my-10 opacity-20" />
    </LayoutOne>
  );
}

export default Checkout;
