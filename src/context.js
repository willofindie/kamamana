import React from 'react';
import PropTypes from 'prop-types';
import theme from './context-theme';

const KamamanaContext = React.createContext(theme);

export const KamamanaProvider = ({ children, kTheme }) => (
  <KamamanaContext.Provider value={kTheme}>{children}</KamamanaContext.Provider>
);

KamamanaProvider.propTypes = {
  kTheme: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export const KamamanaConsumer = KamamanaContext.Consumer;
