import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { buildStore } from '../app/store';
import { Provider } from 'react-redux';

export const addTheme = component => <ThemeProvider theme={theme}>{component}</ThemeProvider>
export const addReduxProvider = component => <Provider store={buildStore()}>{component}</Provider>

