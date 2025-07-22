import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from './button';

describe('<Button />', () => {
  it('renders with string children', () => {
    render(<Button onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with JSX children', () => {
    render(
      <Button onClick={() => {}}>
        <span data-testid="custom-child">Custom</span>
      </Button>,
    );
    expect(screen.getByTestId('custom-child')).toBeInTheDocument();
  });

  it('calls onClick when not disabled', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has type submit by default', () => {
    render(<Button onClick={() => {}}>Submit</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
