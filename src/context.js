import React from 'react';
import theme from './context-theme';
import type { Node, Context } from 'react';

type KContext = Context<Object>;
const KamamanaContext: KContext = React.createContext(theme);

type Props = {
  kTheme: Object,
  children: Node,
};

export const KamamanaProvider = ({ children, kTheme }: Props) => (
  <KamamanaContext.Provider value={kTheme}>{children}</KamamanaContext.Provider>
);

export const KamamanaConsumer = KamamanaContext.Consumer;
