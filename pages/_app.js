import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import store from 'app/store';

console.log({ store })

import authenticationPageWrappers from 'features/authentication/authenticationPageWrappers';
import usersPageWrappers from 'features/users/usersPageWrappers';

// All the feature specific wrappers that will be put around the inner page component. You can add more by pushing into this array. 
const wrappers = [].concat(usersPageWrappers, authenticationPageWrappers)

const FeatureWrappers = (Component) => wrappers.reduce(
  (previous, FeatureHoc) => {
    return FeatureHoc(previous)
  },
  Component
)


function MyApp({ Component, pageProps }) {
  const WrappedComponent = FeatureWrappers(Component, pageProps)
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
          <Provider store={store}>
              <WrappedComponent {...pageProps} />
          </Provider> 
      </ThemeProvider>
    </>
  );
}

export default MyApp;
