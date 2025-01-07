import { colors, Form, FormInput } from '@Core';
import { MIN_SIZE_FOR_DESKTOP } from '@Utils/constants';

import React, { useState } from 'react';
import styled from 'styled-components';

enum MortgageType {
  Interest = 'interest',
  Repayment = 'repayment',
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
  height: 100%;
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

export const Input = ({
  inputs,
  setInputs,
}: {
  inputs: MortgageRequest;
  setInputs: (input: MortgageRequest) => void;
}) => {
  return (
    <Form>
      <FormInput
        label="Mortgage Debt"
        type="number"
        leading="£"
        value={inputs.debt}
        onChange={(debt: number) => setInputs({ ...inputs, debt })}
      />
      <FormInput
        label="Mortgage Term"
        type="number"
        trailing="years"
        value={inputs.term}
        onChange={(term: number) => setInputs({ ...inputs, term })}
      />
    </Form>
  );
};

export const Result = () => {
  return <div style={{ backgroundColor: colors.white }}>Result</div>;
};
