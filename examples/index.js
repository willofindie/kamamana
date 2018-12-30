import React from 'react';
import ReactDOM from 'react-dom';
import { Flexbox } from 'kamamana';

import Center from './demos/components/centered';
import ButtonDemo from './demos/button-demo';

import './styles.css';

const App = props => {
  return (
    <Center>
      <Flexbox style={{ w: 900, fxd: 'column' }}>
        <ButtonDemo />
      </Flexbox>
    </Center>
  );
};

const rootDOM = document.getElementById('root');
rootDOM && ReactDOM.render(<App />, rootDOM);
