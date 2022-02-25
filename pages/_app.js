import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import store from 'app/store';

import authenticationPageWrappers from 'features/authentication/authenticationPageWrappers';
import usersPageWrappers from 'features/users/usersPageWrappers';

// All the feature specific wrappers that will be put around the inner page component. You can add more by pushing into this array. 
const wrappers = [].concat(usersPageWrappers, authenticationPageWrappers)

const FeatureWrappers = ({ children, pageProps }) => wrappers.reduce(
  (previous, Current) => {
    return (<Current {...pageProps}>{previous}</Current>)
  },
  children
)


function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
          <Provider store={store}>
            <FeatureWrappers pageProps={pageProps}>
              <Component {...pageProps} />
            </FeatureWrappers>
          </Provider> 
      </ThemeProvider>
    </>
  );
}

export default MyApp;
