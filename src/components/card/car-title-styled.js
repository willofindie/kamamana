import defaultTheme from '/src/theme';

import { jsx } from '/src/nano';

// Static Styles goes here, dynamic props need to be used by child-component
const CardTitleStyled = jsx(
  'div',
  {
    fz: 24,
    mb: 15,
  },
  'CardTitleStyled'
);

export default CardTitleStyled;
