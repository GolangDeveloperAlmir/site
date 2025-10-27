import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, it, expect } from 'vitest';

describe('sanity test', () => {
  it('renders a simple element', () => {
    render(<div>hello</div>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });
});
