/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  LayoutOne, InputText, FormControl, Textarea, Button,
} from 'upkit';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import TopBar from '../../components/TopBar';
import SelectWilayah from '../../components/SelectWilayah';
import rules from './validation';
import { createDeliveryAddress } from '../../api/address';

function UserAddressAdd() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = useForm();

  const allFields = watch();

  const updateValue = (field, value) => {
    setValue(field, value, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (formData) => {
    const payload = {
      nama: formData.nama_alamat,
      provinsi: formData.provinsi.label,
      kabupaten: formData.kabupaten.label,
      kecamatan: formData.kecamatan.label,
      kelurahan: formData.desa.label,
      detail: formData.detail_alamat,
    };

    const { data } = await createDeliveryAddress(payload);

    if (data.error) {
      return false;
    }

    return navigate('/alamat-pengiriman');
  };

  React.useEffect(() => {
    register('provinsi', rules.provinsi);
    register('kabupaten', rules.kabupaten);
    register('kecamatan', rules.kecamatan);
    register('desa', rules.desa);
  }, [register]);

  React.useEffect(() => {
    updateValue('kabupaten', null);
    updateValue('kecamatan', null);
    updateValue('desa', null);
  }, [allFields.provinsi]);

  React.useEffect(() => {
    updateValue('kecamatan', null);
    updateValue('desa', null);
  }, [allFields.kabupaten]);

  React.useEffect(() => {
    updateValue('desa', null);
  }, [allFields.kecamatan]);

  return (
    <div className="pt-3">
      <LayoutOne>
        <TopBar />
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl label="Nama Alamat" errorMessage={errors.nama_alamat?.message} color="black">
              <InputText
                placeholder="Nama alamat"
                fitContainer
                name="nama_alamat"
                {...register('nama_alamat', rules.nama_alamat)}
              />
            </FormControl>
            <FormControl label="Provinsi" errorMessage={errors.provinsi?.message} color="black">
              <SelectWilayah
                onChange={(option) => updateValue('provinsi', option)}
                name="provinsi"
                tingkat="provinsi"
                value={getValues('provinsi')}
              />
            </FormControl>
            <FormControl label="Kabupaten/Kota" errorMessage={errors.kabupaten?.message} color="black">
              <SelectWilayah
                onChange={(option) => updateValue('kabupaten', option)}
                name="kabupaten"
                tingkat="kabupaten"
                kodeInduk={getValues().provinsi?.value}
                value={getValues('kabupaten')}
              />
            </FormControl>
            <FormControl label="Kecamatan" errorMessage={errors.kecamatan?.message} color="black">
              <SelectWilayah
                onChange={(option) => updateValue('kecamatan', option)}
                name="kecamatan"
                tingkat="kecamatan"
                kodeInduk={getValues('kabupaten')?.value}
                value={getValues('kecamatan')}
              />
            </FormControl>
            <FormControl label="Kelurahan/Desa" errorMessage={errors.desa?.message} color="black">
              <SelectWilayah
                onChange={(option) => updateValue('desa', option)}
                name="desa"
                tingkat="kelurahan"
                kodeInduk={getValues('kecamatan')?.value}
                value={getValues('desa')}
              />
            </FormControl>
            <FormControl label="Detail Alamat" errorMessage={errors.detail_alamat?.message} color="black">
              <Textarea
                placeholder="Detail alamat"
                fitContainer
                name="detail_alamat"
                {...register('detail_alamat', rules.detail_alamat)}
              />
            </FormControl>
            <Button fitContainer>
              Simpan
            </Button>
          </form>
        </div>
      </LayoutOne>
    </div>
  );
}

export default UserAddressAdd;
