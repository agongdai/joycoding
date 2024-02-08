import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import Card from './Card';

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(<Card label='Card Header'>whatever</Card>);

    const heading = screen.getByRole('heading', {
      name: /Card Header/i,
    });

    expect(heading).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
