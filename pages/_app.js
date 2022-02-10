import GlobalStyle from '../styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { store } from '../app/store';
import { Provider } from 'react-redux';



function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider> 
      </ThemeProvider>
    </>
  );
}

export default MyApp;
