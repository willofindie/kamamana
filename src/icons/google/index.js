import React from 'react';
import GoogleLogo from './google-2015';
import WrapperStyled from '../wrapper-styled';

import type { Props as WrapperProps } from '../wrapper-styled';

const GoogleIcon = (props: WrapperProps) => {
  return (
    <WrapperStyled {...props}>
      <GoogleLogo />
    </WrapperStyled>
  );
};

export default GoogleIcon;
