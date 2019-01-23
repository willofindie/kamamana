import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogo from './google-2015';
import WrapperStyled from '../wrapper-styled';

const GoogleIcon = props => {
  return <GoogleLogo className={props.className} />;
};

GoogleIcon.propTypes = {
  className: PropTypes.string.isRequired,
};

export default GoogleIcon;
