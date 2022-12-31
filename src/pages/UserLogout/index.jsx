import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { LayoutOne } from 'upkit';

import { userLogout } from '../../features/Auth/actions';
import { logout } from '../../api/auth';

function UserLogout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    logout()
      .then(() => dispatch(userLogout()))
      .then(() => localStorage.setItem('cart', JSON.stringify([])))
      .then(() => navigate('/'));
  }, [dispatch, navigate]);

  return (
    <LayoutOne>
      <div className="text-center flex flex-col items-center justify-center my-10">
        <BounceLoader color="red" />
        <p className="text-2xl text-red-600 font-bold">Logging out... </p>
      </div>
    </LayoutOne>
  );
}

export default UserLogout;
