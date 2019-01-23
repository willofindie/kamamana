import React from 'react';
import ReactDOM from 'react-dom';
import { Flexbox, KamamanaProvider } from 'kamamana';

import Center from './demos/components/centered';
import ButtonDemo from './demos/button-demo';
import InputMemoizedDemo from './demos/input-demo/input-text';

import './styles.css';

const App = props => {
  return (
    <Center>
      <Flexbox style={{ w: 900, fxd: 'column' }}>
        <ButtonDemo />
        <InputMemoizedDemo />
      </Flexbox>
    </Center>
  );
};

const rootDOM = document.getElementById('root');
rootDOM && ReactDOM.render(<App />, rootDOM);
