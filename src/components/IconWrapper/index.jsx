import { any } from 'prop-types';
import React from 'react';

// eslint-disable-next-line react/prop-types
function IconWrapper({ children }) {
  return (
    <div className="flex justify-center text-white text-4xl font-bold my-2">
      {children}
    </div>
  );
}

IconWrapper.propsTypes = {
  children: any.isRequired,
};

export default IconWrapper;
