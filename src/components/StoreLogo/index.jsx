import React from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';

function StoreLogo() {
  return (
    <Link to="/">
      <div className="text-red-600 font-bold text-4xl text-center mb-5">
        { config.siteTitle }
      </div>
    </Link>
  );
}

export default StoreLogo;
