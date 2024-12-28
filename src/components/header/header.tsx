import { useServicesData } from '@Context';
import { colors, Icon, Link, Text } from '@Core';
import {
  getDragOption,
  formerOptions,
  latterOptions,
  MIN_SIZE_FOR_DESKTOP,
  MIN_SIZE_FOR_SMALL_SCREEN,
} from '@Utils/constants';
import { Service } from '@Utils/types';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.black};
  opacity: 85%;
  color: ${colors.white};
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 1000;
  overflow-y: auto;
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
  padding: 10px 20px;
  box-sizing: border-box;
  color: ${colors.gray050};
  @media (min-width: ${MIN_SIZE_FOR_DESKTOP}px) {
    width: 70%;
  }
`;

const DefaultOptions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
  align-items: center;
`;

export const Header = () => {
  const { enhancedOptions, options } = useServicesData();
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <Content>
        {width > MIN_SIZE_FOR_SMALL_SCREEN ? (
          getOptions(enhancedOptions)
        ) : (
          <>
            <DefaultOptions>{getOptions(formerOptions)}</DefaultOptions>
            <DefaultOptions>
              {getOptions([
                ...latterOptions,
                getDragOption(() => setShowOptions(!showOptions)),
              ])}
            </DefaultOptions>
          </>
        )}
      </Content>
      {showOptions && <HiddenOptions services={options} />}
    </Container>
  );
};

const HiddenOptions = ({ services }: { services: Service[] }) => {
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    gap: 20px;
    padding: 0 15px;
    box-sizing: border-box;
    max-height: 100vh;
    overflow-y: auto;
  `;

  return <Wrapper>{getOptions(services, true)}</Wrapper>;
};

const getOptions = (
  services: Service[],
  large: boolean = false,
): JSX.Element[] => {
  return services.map((service, key) => (
    <Text typography={large ? 'body01' : 'body07'} key={key}>
      <Link to={service.path} onClick={service.onClick}>
        {service.icon && (
          <Icon name={service.icon} type={service.iconType || 'outlined'} />
        )}
        {service.label}
      </Link>
    </Text>
  ));
};
