import defaultTheme from '/src/theme';

import { jsx } from '/src/nano';

// Static Styles goes here, dynamic props need to be used by child-component
const CardContentStyled = jsx(
  'div',
  {
    c: defaultTheme.fadedBlack,
  },
  'CardContentStyled'
);

export default CardContentStyled;
