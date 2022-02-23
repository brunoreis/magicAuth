import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import store from 'app/store';
import LoadingBranch from 'features/authentication/components/LoadingBranch'

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
