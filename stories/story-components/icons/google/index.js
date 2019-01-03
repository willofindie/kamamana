import React from 'react';
import GoogleLogo from './google-2015';
import WrapperStyled from '../wrapper-styled';

import type { Props } from './google.d';

const GoogleIcon = (props: Props) => {
  return <GoogleLogo className={props.className} />;
};

export default GoogleIcon;
