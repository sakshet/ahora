import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { Dropdown, DropdownData } from './dropdown';

const options: DropdownData[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

describe('<Select />', () => {
  test('renders with placeholder text', () => {
    render(
      <Dropdown
        onSelect={jest.fn()}
        options={options}
        placeholder="Search or select..."
      />,
    );
    expect(
      screen.getByPlaceholderText('Search or select...'),
    ).toBeInTheDocument();
  });

  test('displays options when input is clicked', () => {
    render(<Dropdown onSelect={jest.fn()} options={options} />);
    fireEvent.click(screen.getByPlaceholderText('Search or select...'));
    options.forEach((option) => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  test('filters options based on input', () => {
    render(<Dropdown onSelect={jest.fn()} options={options} />);
    fireEvent.click(screen.getByPlaceholderText('Search or select...'));
    fireEvent.change(screen.getByPlaceholderText('Search or select...'), {
      target: { value: 'Option 1' },
    });
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  test('calls onSelect with correct option when an option is clicked', () => {
    const handleSelect = jest.fn();
    render(<Dropdown onSelect={handleSelect} options={options} />);
    fireEvent.click(screen.getByPlaceholderText('Search or select...'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(handleSelect).toHaveBeenCalledWith({
      label: 'Option 1',
      value: '1',
    });
  });

  test('displays selected option label in the input after selection', () => {
    render(<Dropdown onSelect={jest.fn()} options={options} />);
    fireEvent.click(screen.getByPlaceholderText('Search or select...'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
  });

  test('closes dropdown when clicking outside', () => {
    render(<Dropdown onSelect={jest.fn()} options={options} />);
    fireEvent.click(screen.getByPlaceholderText('Search or select...'));
    fireEvent.mouseDown(document);
    options.forEach((option) => {
      expect(screen.queryByText(option.label)).not.toBeInTheDocument();
    });
  });

  test('displays "No options found" when no options match the input', () => {
    render(<Dropdown onSelect={jest.fn()} options={options} />);
    fireEvent.click(screen.getByPlaceholderText('Search or select...'));
    fireEvent.change(screen.getByPlaceholderText('Search or select...'), {
      target: { value: 'Non-existent option' },
    });
    expect(screen.getByText('No options found')).toBeInTheDocument();
  });

  test('displays selected option on mount if selectedOption prop is provided', () => {
    render(
      <Dropdown
        onSelect={jest.fn()}
        options={options}
        selectedOption={{ label: 'Option 2', value: '2' }}
      />,
    );
    expect(screen.getByDisplayValue('Option 2')).toBeInTheDocument();
  });

  test('opens dropdown when input is clicked if it is not already open', () => {
    render(<Dropdown onSelect={jest.fn()} options={options} />);
    const input = screen.getByPlaceholderText('Search or select...');
    fireEvent.click(input);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    fireEvent.click(document);
    fireEvent.click(input);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  test('applies the selected class to the selected option', () => {
    const handleSelect = jest.fn();
    render(
      <Dropdown
        onSelect={handleSelect}
        options={options}
        selectedOption={options[1]}
      />,
    );
    fireEvent.click(screen.getByPlaceholderText('Search or select...'));
    const selectedOption = screen.getByText('Option 2');
    expect(selectedOption.parentElement).toHaveClass(
      'dropdownStyles-option dropdownStyles-selected',
    );
  });
});
