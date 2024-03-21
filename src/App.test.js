import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Choose code block title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Choose code block/i);
  expect(titleElement).toBeInTheDocument();
});
