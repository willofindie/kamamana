import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'kamamana';

import './styles.css';

const rootDOM = document.getElementById('root');

rootDOM && ReactDOM.render(<Button text='Click Me' />, rootDOM);
