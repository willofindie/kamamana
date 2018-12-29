import defaultTheme from 'src/theme';

import { jsx } from 'src/nano';

// Static Styles goes here, dynamic props need to be used by child-component
const Button = jsx(
  'button',
  {
    bxz: 'border-box',
    bdrs: '2px',
    fz: '14px',
    lh: 2.2,
    m: '0 8px 15px 0',
    p: '0 10px',
    cur: 'pointer',
    trs: 'all 0.3s ease-out',
    '&:focus': {
      ol: 'none',
    },
    '&[disabled], &.disabled': {
      cur: 'not-allowed',
      bgc: defaultTheme.light.disabled,
      c: defaultTheme.light.disabledFg,
      bd: `1px solid ${defaultTheme.light.disabledFg}`,
    },
    '& .btn-icon': {
      va: 'middle',
    },
    '& .btn-text': {
      fz: '14px',
    },
    '& .btn-icon + .btn-text': {
      ml: '8px',
    },
  },
  'ButtonStyled'
);

export default Button;
