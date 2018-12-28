// Default Theme Object used by this module, Should be overriden and passed to components
// to update the theme...
// keeping the names similar to Emmet based CSS Keys, to keep things simple and memorable...
// Checkout [this](https://docs.emmet.io/cheat-sheet/) for details on supported keys...

// Most of the keys here are for review purpose, so that themes can be created by
export default {
  // Colors
  fadedWhite: '#FAFAFA',
  fadedBlack: '#424242',
  light: {
    primary: '#00897B', // Teal 600
    primaryFg: '#FAFAFA', // Grey 50
    secondary: '#FFB300', // Amber 600
    secondaryFg: '#212121', // Grey  900
    disabled: '#F5F5F5', // Grey 100
    disabledFg: '#E0E0E0', // Grey 300
  },
  fz: '16px',
  btn: {
    // If `bgc` and `c` are not passed, default Primary Color will be used...
    fz: 16,
    bdrs: 4,
  },
};
