import styled from 'styled-components';
import pallete from '../../utils/pallete';

const getBgColors = ({ ghost, bg, bgHover, fg }, hover) => {
  if (ghost) return pallete.white;
  const hoverColor = getBgHoverColor(bgHover);
  return hover ? hoverColor : bg;
};

const getBgHoverColor = bgHover => (bgHover ? bgHover : pallete.white);

const getFgHoverColor = fgHover => (fgHover ? fgHover : pallete.blueGrey[500]);

const getFgColors = ({ fgHover, fg }, hover) => {
  const hoverColor = getFgHoverColor(fgHover);
  return hover ? hoverColor : fg;
};

const getBorderColors = ({ ghost, bgHover, fgHover, bg, fg }, hover) => {
  const hoverColor = bgHover ? getBgHoverColor(bgHover) : getFgHoverColor(fgHover);
  if (hover) {
    return `1px solid ${hoverColor}`;
  } else {
    return `1px solid ${ghost || bgHover ? lighten(0.2, fg) : bg}`;
  }
};

const Styled = styled.button`
  width: ${props => (props.block ? '100%' : 'auto')};
  box-sizing: border-box;
  background-color: ${props => getBgColors(props)};
  color: ${props => getFgColors(props)};
  border: ${props => getBorderColors(props)};
  border-radius: 2px;
  font-size: 14px;
  line-height: 1.4;
  margin: 0 8px 15px 0;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s ease-out;

  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    background-color: ${props => getBgColors(props, true)};
    color: ${props => getFgColors(props, true)};
    border: ${props => getBorderColors(props, true)};
  }

  &[disabled] {
    cursor: not-allowed;
    background-color: ${pallete.grey[100]};
    color: ${pallete.grey[300]};
    border: 1px solid ${pallete.grey[200]};
  }

  .btn-icon {
    vertical-align: middle;
  }

  .btn-text {
    font-size: 14px;
  }

  .btn-icon + .btn-text {
    margin-left: 8px;
  }
`;

Styled.defaultProps = {
  bg: 'transparent',
  fg: pallete.grey[500],
};

export default Styled;
