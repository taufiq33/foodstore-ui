import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutOne, Table, Button } from 'upkit';
import AiOutlineFileAdd from '@meronex/icons/ai/AiOutlineFileAdd';
import TopBar from '../../components/TopBar';
import useAddressHook from '../../hooks/addressHook';

const columns = [
  { Header: 'Nama', accessor: 'nama' },
  {
    Header: 'Detail',
    accessor: (alamat) => (
      <div>
        {alamat.detail}
        <br />
        <p>
          {`${alamat.kelurahan}, ${alamat.kecamatan}, ${alamat.kabupaten}, ${alamat.provinsi}`}
        </p>
      </div>
    ),
  },
];

function UserAddressList() {
  const {
    status,
    addressData,
    page,
    setPage,
    limit,
    // setLimit,
    addressDataCount,
  } = useAddressHook();

  return (
    <LayoutOne size="large">
      <TopBar />
      <Link to="/alamat-pengiriman/tambah">
        <Button iconBefore={<AiOutlineFileAdd />} className="p-4">
          Tambah Baru
        </Button>
      </Link>
      <div className="my-2">
        <Table
          columns={columns}
          items={addressData}
          totalItems={addressDataCount}
          page={page}
          perPage={limit}
          isLoading={status === 'process'}
          onPageChange={(pg) => setPage(pg)}
        />
      </div>
      {
        status === 'success' && !addressData.length
          ? (
            <div>
              <p className="font-bold">Data Alamat kosong..</p>
            </div>
          )
          : ''
      }
    </LayoutOne>
  );
}

export default UserAddressList;
