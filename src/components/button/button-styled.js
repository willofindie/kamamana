import { jsx } from '/src/nano';

// Static Styles goes here, dynamic props need to be used by child-component
const Button = jsx(
  'button',
  {
    d: 'flex',
    ai: 'center',
    bxz: 'border-box',
    bdrs: '2px',
    fz: '16px',
    lh: 1.4,
    m: '0 8px 15px 0',
    p: '8px 15px',
    cur: 'pointer',
    trs: 'all 0.3s ease-out',
    '&:focus': {
      ol: 'none',
    },
    '& .btn-icon': {
      h: 16,
      w: 16,
    },
    '& .btn-text': {
      fz: '1em',
    },
    '& .btn-icon + .btn-text': {
      ml: '8px',
    },
  },
  'ButtonStyled'
);

export default Button;

export const disabledCSS = (context: Object) => ({
  cur: 'not-allowed',
  bgc: context.light.disabled,
  c: context.light.disabledFg,
  bd: `1px solid ${context.light.disabledFg}`,
});
