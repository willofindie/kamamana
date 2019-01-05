export type Props = {
  id?: string,
  className?: string,
  label?: string,
  type: string,
  placeholder?: string,
  defaultValue?: string | number,
  value?: string | number,

  // styles:
  inputStyle: Object,
  bdcHover?: string,

  // Methods...
  onChange?: Function,
};

export type State = {
  value: string | number,
};
