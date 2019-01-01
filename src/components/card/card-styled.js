import defaultTheme from '/src/theme';

import { jsx } from '/src/nano';

// Static Styles goes here, dynamic props need to be used by child-component
const CardStyled = jsx(
  'div',
  {
    bxz: 'border-box',
    bdrs: '2px',
    fz: '16px',
    lh: 1.4,
    p: '15px',
    bxsh: '0 0 15px -8px rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.2)',
  },
  'CardStyled'
);

export default CardStyled;
