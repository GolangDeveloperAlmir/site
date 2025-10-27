import { render, screen } from '@testing-library/react';
import React from 'react';

describe('sanity test', () => {
  it('renders a simple element', () => {
    render(<div>hello</div>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
