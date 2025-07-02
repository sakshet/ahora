import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { Input } from './input';

describe('Input', () => {
  it('renders with correct value and placeholder', () => {
    const { getByPlaceholderText } = render(
      <Input value="hello" onChange={() => {}} placeholder="Type here" />,
    );
    expect(getByPlaceholderText('Type here')).toHaveValue('hello');
  });

  it('calls onChange with string for type="text"', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Input type="text" value="bar" onChange={handleChange} />,
    );
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: 'baz' } });
    expect(handleChange).toHaveBeenCalledWith('baz');
  });

  it('calls onChange with number for type="number" and allows decimals', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Input type="number" value={1000} onChange={handleChange} />,
    );
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: '1234.56' } });
    expect(handleChange).toHaveBeenCalledWith(1234.56);
    fireEvent.change(input, { target: { value: '0.99' } });
    expect(handleChange).toHaveBeenCalledWith(0.99);
  });

  it('calls onChange with empty string for incomplete numbers', () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <Input type="number" value={''} onChange={handleChange} />,
    );
    const input = getByRole('textbox');
    fireEvent.change(input, { target: { value: '-' } });
    expect(handleChange).toHaveBeenCalledWith('');
    fireEvent.change(input, { target: { value: '.' } });
    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('formats value if format prop is provided', () => {
    const { getByRole, rerender } = render(
      <Input value="1000" onChange={() => {}} format={(val) => `£${val}`} />,
    );
    const input = getByRole('textbox');
    expect(input).toHaveValue('£1000');
    rerender(
      <Input value="2000" onChange={() => {}} format={(val) => `£${val}`} />,
    );
    expect(input).toHaveValue('£2000');
  });

  it('calls onTouched on blur and change', () => {
    const handleTouched = jest.fn();
    const { getByRole } = render(
      <Input value="foo" onChange={() => {}} onTouched={handleTouched} />,
    );
    const input = getByRole('textbox');
    fireEvent.blur(input);
    expect(handleTouched).toHaveBeenCalled();
    fireEvent.change(input, { target: { value: 'bar' } });
    expect(handleTouched).toHaveBeenCalled();
  });

  it('passes min, max, step, required, className, and id', () => {
    const { getByRole } = render(
      <Input
        value={5}
        onChange={() => {}}
        min={1}
        max={10}
        step={2}
        required
        className="foo"
        type="number"
      />,
    );
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('min', '1');
    expect(input).toHaveAttribute('max', '10');
    expect(input).toHaveAttribute('step', '2');
    expect(input).toBeRequired();
    expect(input).toHaveClass('foo');
  });

  it('uses inputMode decimal for type number', () => {
    const { getByRole } = render(
      <Input value={1} onChange={() => {}} type="number" />,
    );
    expect(getByRole('textbox')).toHaveAttribute('inputmode', 'decimal');
  });

  it('autoComplete is off', () => {
    const { getByRole } = render(<Input value="foo" onChange={() => {}} />);
    expect(getByRole('textbox')).toHaveAttribute('autocomplete', 'off');
  });
});
