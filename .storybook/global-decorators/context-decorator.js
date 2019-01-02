import React from 'react';
import { KamamanaProvider } from '/src/context';
import theme from '/src/context-theme';

const Context = (storyFn: Function) => {
  return <KamamanaProvider kTheme={theme}>{storyFn()}</KamamanaProvider>;
};

export default Context;
