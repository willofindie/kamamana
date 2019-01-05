import { jsx } from '/src/nano';

const Container = jsx(
  'div',
  {
    d: 'flex',
    ai: 'center',
    fz: 16,
    lh: 1.4,
    '& .input-label': {
      mr: 8,
    },
    '& .input-component > input': {
      bdrs: 2,
      bxz: 'border-box',
      p: '8px 15px',
      transition: 'border 0.3s ease-out, box-shadow 0.3s ease-out',
    },
  },
  'FormComponentStyled'
);

export default Container;
