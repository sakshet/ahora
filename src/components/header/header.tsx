import { useServicesData } from '@Context';
import { colors, Icon, Link, Text } from '@Core';

import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${colors.black};
  opacity: 85%;
  color: ${colors.white};
  height: 45px;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1000;
  &:hover {
    opacity: 100%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  color: ${colors.gray050};
  @media (min-width: 1250px) {
    width: 70%;
  }
`;

export const Header = () => {
  const data = useServicesData();

  return (
    <Container>
      <Content>
        {data.map((service, key) => (
          <Text typography='body07' key={key}>
            <Link to={service.path} key={key}>
              {service.icon && <Icon name={service.icon} type={service.iconType ? service.iconType : 'outlined'} />}
              {service.label}
            </Link>
          </Text>
        ))}
      </Content>
    </Container>
  );
};