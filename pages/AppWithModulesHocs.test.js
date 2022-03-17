import { render, screen } from '@testing-library/react'
import AppWithModulesHocs from './AppWithModulesHocs'
describe('AppWithModulesHocs', () => {
  it('renders home', async () => {
    render(<AppWithModulesHocs />);
    expect(screen.getByText('checking user info..')).toBeInTheDocument();
  });
});