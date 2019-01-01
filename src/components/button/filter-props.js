import type { Props } from './index.d';
export default (props: Props) => {
  const {
    style,
    bgcHover,
    fgcHover,
    type,
    block,
    text,
    disabled,
    icon,
    iconW,
    iconH,
    className,
    ...rest
  } = props;
  return {
    custom: {
      style,
      bgcHover,
      fgcHover,
      type,
      block,
      text,
      disabled,
      icon,
      iconW,
      iconH,
      className,
    },
    rest,
  };
};
