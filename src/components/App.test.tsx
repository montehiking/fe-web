import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { App } from 'src/components/App';

describe('Test render', () => {
  test('render without errors', async () => {
    const { getByTestId } = render(<App />, { wrapper: MemoryRouter });

    await waitFor(() => expect(getByTestId('page')).toBeInTheDocument());
  });
});
