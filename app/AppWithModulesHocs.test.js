import { render, screen } from '@testing-library/react'
import AppWithModulesHocs from './AppWithModulesHocs'

const mockText = "mock text";
const Component = () => <span>{mockText}</span>;

describe('AppWithModulesHocs', () => {
  it('renders successfully', async () => {
    render(<AppWithModulesHocs Component={Component} />);
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });
});