import { jsx } from '/src/nano';

const Container = jsx(
  'div',
  {
    d: 'flex',
    ai: 'center',
    '& .input-label': {
      mr: 8,
      flex: '1 1 20%',
    },
    '& .input-component': {
      flex: '1 1 80%',
    },
    '& .input-component > input': {
      w: '100%',
      fz: 16,
      lh: 1.4,
      bdrs: 2,
      bxz: 'border-box',
      p: '8px 15px',
      transition: 'border 0.3s ease-out, box-shadow 0.3s ease-out',
      '&:focus': {
        ol: 'none',
      },
    },
  },
  'FormComponentStyled'
);

export default Container;
