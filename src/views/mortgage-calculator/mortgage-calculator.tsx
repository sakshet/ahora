import { colors, Form, FormInput } from '@Core';
import {
  MIN_SIZE_FOR_DESKTOP,
  MIN_SIZE_FOR_SMALL_SCREEN,
} from '@Utils/constants';

import React, { useState } from 'react';
import styled from 'styled-components';

enum MortgageType {
  Interest = 'Interest Only',
  Repayment = 'Repayment',
}

type MortgageRequest = {
  debt: number;
  term: number;
  type: MortgageType;
  rate: number;
};

const defaultInputs: MortgageRequest = {
  debt: 130000,
  term: 25,
  type: MortgageType.Repayment,
  rate: 4.5,
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${colors.gray030};
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  @media (min-width: ${MIN_SIZE_FOR_DESKTOP}px) {
    width: 70%;
  }
`;
export const MortgageCalculator = () => {
  const [inputs, setInputs] = useState<MortgageRequest>(defaultInputs);

  return (
    <Container>
      <Content>
        <Input inputs={inputs} setInputs={setInputs} />
        <Result />
      </Content>
    </Container>
  );
};

const StyledForm = styled(Form)`
  display: grid;
  grid-template-columns: 1fr;
  padding: 10px;
  box-sizing: border-box;
  gap: 25px;
  @media (min-width: ${MIN_SIZE_FOR_SMALL_SCREEN}px) {
    grid-template-columns: 1fr 1fr;
  }
`;
export const Input = ({
  inputs,
  setInputs,
}: {
  inputs: MortgageRequest;
  setInputs: (input: MortgageRequest) => void;
}) => {
  return (
    <StyledForm>
      <FormInput
        label="Mortgage Debt"
        leading="£"
        onChange={(debt: number) => setInputs({ ...inputs, debt })}
        type="number"
        value={inputs.debt}
      />
      <FormInput
        label="Mortgage Term"
        onChange={(term: number) => setInputs({ ...inputs, term })}
        trailing="years"
        type="number"
        value={inputs.term}
      />
      <FormInput
        label="Mortgage Type"
        onChange={(type: MortgageType) => setInputs({ ...inputs, type })}
        options={[MortgageType.Interest, MortgageType.Repayment]}
        type="radio"
        value={inputs.type}
      />
      <FormInput
        label="Interest Rate"
        onChange={(rate: number) => setInputs({ ...inputs, rate })}
        trailing="%"
        type="number"
        value={inputs.rate}
      />
    </StyledForm>
  );
};

export const Result = () => {
  return <div style={{ backgroundColor: colors.white }}>Result</div>;
};
