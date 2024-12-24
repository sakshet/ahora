import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Oregon';
    src: url('./core/fonts/Oregon.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'OregonBold';
    src: url('./core/fonts/OregonBold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  body {
    // font-family: Oregon, Arial, sans-serif;
    // font-family: 'Times New Square';
  }
`;
