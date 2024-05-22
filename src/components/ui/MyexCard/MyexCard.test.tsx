import { expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import MyexCard from './MyexCard';

describe('Home', () => {
  it('renders a heading', () => {
    const { container } = render(<MyexCard label='Card Header'>whatever</MyexCard>);

    const heading = screen.getByRole('heading', {
      name: /Card Header/i,
    });

    expect(heading).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
