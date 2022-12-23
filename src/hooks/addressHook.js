import { useCallback, useState, useEffect } from 'react';
import { getDeliveryAddress } from '../api/address';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

function useAddressHook() {
  const [status, setStatus] = useState(statusList.idle);
  const [addressData, setAddressData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [addressDataCount, setAddressDataCount] = useState(0);

  // eslint-disable-next-line prefer-arrow-callback, consistent-return
  const fetchAddress = useCallback(async function getAddress() {
    setStatus(statusList.process);
    const { data: fetchResult } = await getDeliveryAddress({ page, limit });
    const { data, count, error } = fetchResult;

    if (error) {
      setStatus(statusList.error);
      return false;
    }

    setStatus(statusList.success);
    setAddressData(data);
    setAddressDataCount(count);
  }, [page, limit]);

  useEffect(() => {
    fetchAddress();
  }, [fetchAddress]);

  return {
    status,
    addressData,
    page,
    setPage,
    limit,
    setLimit,
    addressDataCount,
  };
}

export default useAddressHook;
