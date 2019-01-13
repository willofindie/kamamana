import { jsx } from '/src/nano';

// Static Styles goes here, dynamic props need to be used by child-component
const InputButton = jsx(
  'span',
  {
    d: 'inline-flex',
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
      lh: 1.4,
      bdrs: '2px',
      m: 0,
      p: 0,
      bgc: 'transparent',
      bd: 0,
      c: 'inherit',
      cur: 'inherit',
      pointerEvents: 'none',
    },
    '& .btn-icon + .btn-text': {
      ml: '8px',
    },
  },
  'InputButtonStyled'
);

export default InputButton;

export const disabledCSS = (context: Object) => ({
  cur: 'not-allowed',
  bgc: context.light.disabled,
  c: context.light.disabledFg,
  bd: `1px solid ${context.light.disabledFg}`,
});
