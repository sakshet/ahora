import { colors } from '@Core';
import { Heading, Text } from '@Core/text';

import React, { useEffect, useState, ReactElement } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ $bgcolor: string }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 10px;
  background-color: ${(props) => props.$bgcolor};
`;

export const Form = ({
  bgColor = colors.white,
  children,
  className,
}: {
  bgColor?: any;
  children: ReactElement[];
  className?: string | undefined;
}) => {
  return (
    <Container className={className} $bgcolor={bgColor}>
      {children}
      <Submit />
    </Container>
  );
};

const StyledBtn = styled.button`
  width: 100px;
  background-color: ${colors.blueGray040};
  border: none;
  padding: 5px;
  border-radius: 2px;
  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;
const Submit = () => {
  return (
    <StyledBtn type="submit">
      <Heading typography="heading09">Calculate</Heading>
    </StyledBtn>
  );
};

const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${colors.gray090};
  gap: 10px;
`;

const FormInputContent = styled.div<{ border: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid ${colors.gray070};
  border: ${(props) => (props.border ? `1px solid ${colors.gray070}` : 'none')};
  border-radius: 2px;
  width: 100%;
`;

const LeadingText = styled(Text)`
  border-bottom-right-radius: 0;
  border-right: 1px solid ${colors.gray070};
  border-top-right-radius: 0;
  height: 100%;
  display: flex;
  padding: 0 4px;
  align-items: center;
  color: ${colors.gray070};
`;

const TrailingText = styled(Text)`
  border-bottom-left-radius: 0;
  border-left: 1px solid ${colors.gray070};
  border-top-left-radius: 0;
  height: 100%;
  display: flex;
  padding: 0 4px;
  align-items: center;
  color: ${colors.gray070};
`;

const StyledInput = styled.input<{ height: number }>`
  border: none;
  height: ${(props) => props.height}px;
  width: 100%;
  margin: 0;
  padding: 2px 6px;
  color: ${colors.black};
  background-color: ${colors.blueGray010};
  &:focus {
    outline: none;
    box-shadow: 0px;
  }
`;

export const FormInput = ({
  label,
  leading,
  onChange,
  options = [],
  placeholder = '',
  size = 'sm',
  trailing,
  type,
  value,
}: {
  label?: string;
  leading?: string;
  onChange: (val: any) => void;
  options?: any[];
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  trailing?: string;
  type: 'number' | 'radio';
  value: any;
}) => {
  const [input, setInput] = useState(value);

  useEffect(() => {
    onChange(input);
  }, [input]);

  const height: number = size === 'sm' ? 18 : size === 'md' ? 24 : 32;

  return (
    <FormInputWrapper>
      {label && <Heading typography="heading10">{label}</Heading>}
      <FormInputContent border={type === 'number'}>
        {leading && <LeadingText typography="body06">{leading}</LeadingText>}
        {type === 'number' ? (
          <StyledInput
            height={height}
            min="1"
            onChange={(event: any) => {
              setInput(event.currentTarget.value);
            }}
            placeholder={placeholder}
            step="any"
            type={type}
            value={input}
          />
        ) : (
          <Radio
            onSelect={onChange}
            options={options}
            size={size}
            value={value}
          />
        )}
        {trailing && (
          <TrailingText typography="body06">{trailing}</TrailingText>
        )}
      </FormInputContent>
    </FormInputWrapper>
  );
};

const RadioWrapper = styled.div<{ height: number }>`
  height: ${(props) => props.height}px;
  color: ${colors.black};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  border: none;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 5px;
  align-items: center;
  background-color: ${colors.blueGray010};
  padding: 2px 6px;
  border: 1px solid ${colors.gray070};
`;
const Radio = ({
  options,
  onSelect,
  size = 'sm',
  value,
}: {
  options: any[];
  onSelect: (val: any) => void;
  size?: 'sm' | 'md' | 'lg';
  value: string;
}) => {
  const height: number = size === 'sm' ? 18 : size === 'md' ? 24 : 32;
  return (
    <RadioWrapper height={height}>
      {options.map((option, key) => (
        <Wrapper key={key}>
          <StyledInput
            name="radio"
            height={height}
            onClick={() => onSelect(option)}
            type="radio"
          />
          {option}
        </Wrapper>
      ))}
    </RadioWrapper>
  );
};
