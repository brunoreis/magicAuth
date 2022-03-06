import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import store from 'app/store';
import modules from 'app/modules'

const wrappers = modules.wrappers

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
