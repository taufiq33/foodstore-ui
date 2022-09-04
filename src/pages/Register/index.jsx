/* eslint-disable camelcase */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import {
  Button,
  Card,
  FormControl,
  InputPassword,
  InputText,
  LayoutOne,
} from 'upkit';

import rules from './validation';
import { registerUser } from '../../api/auth';
import StoreLogo from '../../components/StoreLogo';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

function Register() {
  const [status, setStatus] = React.useState(statusList.idle);

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (auth?.user) {
      navigate('/');
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async (formData) => {
    const { password, password_confirmation } = formData;
    if (password !== password_confirmation) {
      return setError('password_confirmation', {
        type: 'equality', message: 'Konfirmasi password harus sama',
      });
    }

    setStatus(statusList.process);

    const { data } = await registerUser(formData);

    if (data.error) {
      const fields = Object.keys(data.fields);

      fields.forEach((field) => {
        setError(field, {
          type: 'server',
          message: data.fields[field]?.properties?.message,
        });
      });

      setStatus(statusList.error);
      return false;
    }

    setStatus(statusList.success);
    return navigate('/register/berhasil/');
  };

  return (
    <LayoutOne size="small">
      <Card color="white">
        <StoreLogo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl errorMessage={errors?.full_name?.message}>
            <InputText
              name="full_name"
              placeholder="Nama Lengkap"
              {...register('full_name', rules.full_name)}
              fitContainer
            />
          </FormControl>

          <FormControl errorMessage={errors?.email?.message}>
            <InputText
              name="email"
              placeholder="Alamat email"
              {...register('email', rules.email)}
              fitContainer
            />
          </FormControl>

          <FormControl errorMessage={errors?.password?.message}>
            <InputPassword
              name="password"
              placeholder="Kata sandi"
              {...register('password', rules.password)}
              fitContainer
            />
          </FormControl>

          <FormControl errorMessage={errors?.password_confirmation?.message}>
            <InputPassword
              name="password_confirmation"
              placeholder="Konfirmasi Kata sandi"
              {...register('password_confirmation', rules.password_confirmation)}
              fitContainer
            />
          </FormControl>

          <Button
            size="large"
            fitContainer
            disabled={status === statusList.process}
          >
            {status === statusList.process ? 'Sedang memproses ...' : 'Register'}
          </Button>
        </form>
        <div className="text-center mt-2">
          <p>Sudah punya akun?  </p>
          <Link className="text-red-600 font-bold underline" to="/login"> Masuk Sekarang.</Link>
        </div>
      </Card>
    </LayoutOne>
  );
}

export default Register;
