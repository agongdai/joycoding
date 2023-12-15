import { render, screen } from '@testing-library/react';

import Card from './Card';

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(<Card />);

    const heading = screen.getByRole('heading', {
      name: /Card Header/i,
    });

    expect(heading).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
