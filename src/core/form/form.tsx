import { colors } from '@Core';
import { Heading, Text } from '@Core/text';

import React, { useEffect, useState, ReactElement } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ $bgcolor: string }>`
  background-color: ${(props) => props.$bgcolor};
  // TODO - Two in a row, but split into one if not much space
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
`;

export const Form = ({
  bgColor = colors.white,
  children,
}: {
  bgColor?: any;
  children: ReactElement[];
}) => {
  return <Container $bgcolor={bgColor}>{children}</Container>;
};

const FormInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${colors.gray090};
  gap: 10px;
`;

const FormInputContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 2px solid ${colors.gray070};
  border-radius: 2px;
`;

const LeadingText = styled(Text)`
  border-bottom-right-radius: 0;
  border-right: 2px solid ${colors.gray070};
  border-top-right-radius: 0;
  height: 100%;
  display: flex;
  padding: 0 4px;
  align-items: center;
  color: ${colors.gray070};
`;

const TrailingText = styled(Text)`
  border-bottom-left-radius: 0;
  border-left: 2px solid ${colors.gray070};
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
  color: ${colors.gray070};
  &:focus {
    outline: none;
    box-shadow: 0px;
  }
`;

export const FormInput = ({
  label,
  leading,
  onChange,
  placeholder = '',
  size = 'sm',
  trailing,
  type,
  value,
}: {
  label?: string;
  leading?: string;
  onChange: (val: any) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg';
  trailing?: string;
  type: 'number';
  value: any;
}) => {
  const [input, setInput] = useState(value);

  useEffect(() => {
    onChange(input);
  }, [input]);

  const height: number = size === 'sm' ? 18 : size === 'md' ? 24 : 32;

  return (
    <FormInputWrapper>
      <Heading typography="heading08">{label}</Heading>
      <FormInputContent>
        {leading && <LeadingText typography="body07">{leading}</LeadingText>}
        <StyledInput
          height={height}
          min="1"
          onChange={(event: any) => {
            setInput(event.currentTarget.value);
          }}
          placeholder={placeholder}
          style={{}}
          // step="any"
          type={type}
          value={input}
        />
        {trailing && (
          <TrailingText typography="body07">{trailing}</TrailingText>
        )}
      </FormInputContent>
    </FormInputWrapper>
  );
};
