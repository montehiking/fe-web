import { render, screen } from '@testing-library/react';

import { App } from 'src/components/App';

describe('Test render', () => {
  test('render without errors', () => {
    render(<App />);

    expect(screen.getByTestId('page')).toBeInTheDocument();
  });
});
