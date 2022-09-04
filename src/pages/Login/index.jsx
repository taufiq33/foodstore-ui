/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  LayoutOne,
  Card,
  FormControl,
  InputText,
  InputPassword,
  Button,
} from 'upkit';

import StoreLogo from '../../components/StoreLogo';
import rules from './validation';
import { userLogin } from '../../features/Auth/actions';
import { login } from '../../api/auth';

const statusList = {
  idle: 'idle',
  process: 'process',
  success: 'success',
  error: 'error',
};

function Login() {
  const [status, setStatus] = React.useState(statusList.idle);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (auth?.user) {
      navigate('/');
    }
  }, []);

  async function onSubmit(formData) {
    setStatus(statusList.process);

    const { email, password } = formData;
    const { data } = await login(email, password);
    if (data.error) {
      setError('password', {
        type: 'invalidCredential',
        message: data.message,
      });

      setError('email', {
        type: 'invalidCredential',
        message: data.message,
      });

      return setStatus(statusList.error);
    }

    const { user, token } = data;
    dispatch(userLogin(user, token));
    setStatus(statusList.success);
    return navigate('/');
  }

  return (
    <LayoutOne size="small">
      <Card color="white">
        <StoreLogo />
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl errorMessage={errors?.email?.message}>
            <InputText
              name="email"
              placeholder="Masukkan alamat email"
              fitContainer
              {...register('email', rules.email)}
            />
          </FormControl>
          <FormControl errorMessage={errors?.password?.message}>
            <InputPassword
              name="password"
              placeholder="Masukkan kata sandi"
              fitContainer
              {...register('password', rules.password)}
            />
          </FormControl>
          <Button size="large" fitContainer disabled={status === statusList.process}>
            {status === statusList.process ? 'Sedang memproses...' : 'Login'}
          </Button>
        </form>
        <div className="text-center mt-2">
          <p>Belum punya akun?  </p>
          <Link className="text-red-600 font-bold underline" to="/register"> Daftar Sekarang.</Link>
        </div>
      </Card>
    </LayoutOne>
  );
}

export default Login;
