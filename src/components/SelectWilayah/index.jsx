import axios from 'axios';
import React from 'react';
import {
  oneOf, number, oneOfType, string, func, shape,
} from 'prop-types';
import { Select } from 'upkit';

import config from '../../config';

function SelectWilayah({
  tingkat, kodeInduk, value, onChange,
}) {
  const [resultData, setResultData] = React.useState([]);
  const [isFetching, setIsFetching] = React.useState(false);

  React.useEffect(() => {
    setIsFetching(true);
    axios
      .get(`${config.apiHost}/api/wilayah/${tingkat}?kode_induk=${kodeInduk}`)
      .then(({ data }) => setResultData(data))
      .finally(setIsFetching(false));
  }, [tingkat, kodeInduk]);

  return (
    <Select
      options={resultData.map((wilayah) => ({ label: wilayah.nama, value: wilayah.kode }))}
      value={value}
      placeholder={`Pilih ${tingkat}`}
      onChange={onChange}
      isLoading={isFetching}
      isDisabled={isFetching || !resultData.length}
    />
  );
}

SelectWilayah.defaultProps = {
  kodeInduk: 0,
  value: { label: '', value: '' },
};

SelectWilayah.propTypes = {
  tingkat: oneOf(['provinsi', 'kabupaten', 'kecamatan', 'kelurahan']).isRequired,
  kodeInduk: oneOfType([number, string]),
  onChange: func.isRequired,
  value: shape({ label: string, value: oneOfType([number, string]) }),
};

export default SelectWilayah;
