import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { buildStore } from '../store';

import modules from 'modules/app/modules';

const hocs = modules.hocs;
const store = buildStore();

export const FeatureWrappers = (Component) =>
  hocs.reduce((previous, FeatureHoc) => {
    return FeatureHoc(previous);
  }, Component);

function AppWithModuleHocs({ Component, pageProps = {} }) {
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

export default AppWithModuleHocs;
