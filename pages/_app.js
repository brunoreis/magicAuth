import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: '#fafafa',
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
