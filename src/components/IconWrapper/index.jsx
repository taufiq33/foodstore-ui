import { any } from 'prop-types';
import React from 'react';

// eslint-disable-next-line react/prop-types
function IconWrapper({ children }) {
  return (
    <div className="flex justify-center">
      {children}
    </div>
  );
}

IconWrapper.propsTypes = {
  children: any.isRequired,
};

export default IconWrapper;
