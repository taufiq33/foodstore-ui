import React from 'react';
import { useSelector } from 'react-redux';
import {
  Responsive,
  ButtonCircle,
} from 'upkit';
import FaUser from '@meronex/icons/fa/FaUser';
import { Link } from 'react-router-dom';

import StoreLogo from '../StoreLogo';

function TopBar() {
  const auth = useSelector((state) => state.auth);

  return (
    <Responsive desktop={2} items="center" justify="beetween">
      <div>
        <StoreLogo />
      </div>
      <div className="text-right mr-5">
        <Link to={auth.user ? '/account' : '/login'}>
          <div className="text-red-600 font-bold inline-block mr-2 text-center text-lg">
            {auth?.user?.email || 'Login' }
          </div>
          <ButtonCircle icon={<FaUser />} />
        </Link>
      </div>
    </Responsive>
  );
}

export default TopBar;
