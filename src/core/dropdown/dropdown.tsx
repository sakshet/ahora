import { colors, createStyleSheet, useStyleSheet } from '@Core/styles';
import { Text } from '@Core/text';
import React, { useEffect, useRef, useState } from 'react';

export type DropdownData = {
  label: string;
  value: string | number;
};

const dropdownStyleSheet = createStyleSheet(
  'dropdownStyles',
  ({ width }: { width: number }) => ({
    container: {
      position: 'relative',
      width: `${width > 1000 ? 1000 : width}px`,
    },
    input: {
      padding: '5px',
      width: 'calc(100% - 10px)',
      border: 'none',
      boxShadow: `0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)`,
      outline: 'none',
    },
    options: {
      listStyleType: 'none',
      padding: 0,
      margin: 0,
      position: 'absolute',
      width: '100%',
      maxHeight: '150px',
      overflowY: 'auto',
      backgroundColor: colors.white,
      zIndex: 1,
      marginTop: '5px',
      borderRadius: '2px',
      boxShadow: `0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1.5px 5px 0 rgba(0, 0, 0, 0.19)`,
    },
    option: {
      padding: '10px',
      cursor: 'pointer',
      backgroundColor: colors.white,
      color: colors.black,
      alignItems: 'flex-start',
      borderBottom: `1px solid ${colors.gray020}`,
      '&:hover': {
        backgroundColor: colors.lightBlue010,
      },
    },
    selected: {
      backgroundColor: colors.lightBlue020,
    },
    noOption: {
      padding: '10px',
      color: colors.gray060,
    },
  }),
);
export const Dropdown = ({
  onSelect,
  options,
  placeholder = 'Search or select...',
  selectedOption = null,
  width = 200,
}: {
  onSelect: (selectedOption: DropdownData) => void;
  options: DropdownData[];
  placeholder?: string;
  selectedOption?: DropdownData | null;
  width?: number;
}) => {
  const [searchInput, setSearchInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<DropdownData | null>(
    selectedOption,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(selectedOption);
  }, [selectedOption]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  const filteredOptions: DropdownData[] = options.filter((option) =>
    option.label.toLowerCase().includes(searchInput.toLowerCase()),
  );

  const handleSelect = (option: DropdownData) => {
    setSelectedValue(option);
    setIsOpen(false);
    setSearchInput('');
    onSelect(option);
  };

  const classes = useStyleSheet(dropdownStyleSheet, { width });
  return (
    <div ref={dropdownRef} className={classes.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={isOpen || !selectedValue ? searchInput : selectedValue.label}
        onChange={(e) => {
          setSearchInput(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onClick={() => setIsOpen(true)}
        className={classes.input}
      />
      {isOpen && (
        <ul className={classes.options}>
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option)}
              className={`${classes.option} ${option.value === selectedValue?.value ? classes.selected : null}`}
            >
              <Text typography="body07">{option.label}</Text>
            </li>
          ))}
          {filteredOptions.length === 0 && (
            <li className={classes.noOption}>
              <Text typography="body08">No options found</Text>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
