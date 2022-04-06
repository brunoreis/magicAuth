import { render, screen } from '@testing-library/react'
import AppWithModulesHocs from './AppWithModulesHocs'

const mockText = "mock text";
const Component = () => <span>{mockText}</span>;

describe('AppWithModulesHocs', () => {
  it('renders successfully (this adds the modules hocs)', async () => {
    render(<AppWithModulesHocs Component={Component} />);
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  it.todo('wraps with the store provider')
  it.todo('wraps with the theme provider')
});