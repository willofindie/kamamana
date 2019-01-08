export type Props = {
  id?: string,
  className?: string,
  label?: string,
  htmlType: string,
  type: 'material' | 'default',
  placeholder?: string,
  defaultValue?: string | number,
  value?: string | number,
  validator?: Function,

  // styles:
  style?: Object, // Reflects Container Styles...
  inputStyle: Object, // Reflects Input Styles..
  bdcHover?: string,

  // Methods...
  onChange?: Function,
};

export type State = {
  value: string | number,
  invalid: boolean,
};

export type MemoizedData = {
  type: string,
  css: Object,
};
