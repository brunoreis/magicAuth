import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { ThemeProvider } from 'styled-components';
import store from 'app/store';
import { Provider } from 'react-redux';
import LoadingBranch from 'components/LoadingBranch'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
          <Provider store={store}>
            <LoadingBranch>
              <Component {...pageProps} />
            </LoadingBranch>
          </Provider> 
      </ThemeProvider>
    </>
  );
}

export default MyApp;
