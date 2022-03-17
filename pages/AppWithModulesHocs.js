import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { buildStore } from 'app/store';

import modules from 'app/modules';

const hocs = modules.hocs;

export const FeatureWrappers = (Component) =>
  hocs.reduce((previous, FeatureHoc) => {
    return FeatureHoc(previous);
  }, Component);

function AppWithModuleHocs({ Component, pageProps }) {
  const WrappedComponent = FeatureWrappers(Component, pageProps)
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Provider store={buildStore()}>
          <WrappedComponent {...pageProps} />
        </Provider>
      </ThemeProvider>
    </>
  );
}

export default AppWithModuleHocs;
