import { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

export const addTheme = component => <ThemeProvider theme={theme}>{component}</ThemeProvider>
