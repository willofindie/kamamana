import pallete from 'utils/pallete';

import { jsx } from 'src/nano';

// Static Styles goes here, dynamic props need to be used by child-component
const Button = jsx(
  'button',
  {
    boxSizing: 'border-box',
    borderRadius: '2px',
    fontSize: '14px',
    lineHeight: 1.4,
    margin: '0 8px 15px 0',
    padding: '5px 10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-out',
    '&:focus': {
      outline: 'none',
    },
    '&[disabled], &.disabled': {
      cursor: 'not-allowed',
      backgroundColor: pallete.grey[100],
      color: pallete.grey[300],
      border: `1px solid ${pallete.grey[200]}`,
    },
    '& .btn-icon': {
      verticalAlign: 'middle',
    },
    '& .btn-text': {
      fontSize: '14px',
    },
    '& .btn-icon + .btn-text': {
      marginLeft: '8px',
    },
  },
  'ButtonStyled'
);

export default Button;
