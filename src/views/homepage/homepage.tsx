import { MIN_SIZE_FOR_DESKTOP } from '@Utils';

import React from 'react';
import styled from 'styled-components';

const getPleasantColor = () => {
  const hue = Math.floor(Math.random() * 360);
  const saturation = 20;
  const lightness = 90;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Tile = styled.div<{ bgColor: string }>`
  display: flex;
  justify-content: center;
  height: 500px;
  width: 100%;
  background-color: ${(props) => props.bgColor};
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (min-width: ${MIN_SIZE_FOR_DESKTOP}px) {
    width: 70%;
  }
`;

const tiles = [
  {
    title: 'Title 1',
  },
  {
    title: 'Title 2',
  },
  {
    title: 'Title 3',
    subTiles: [
      {
        title: 'Subtile 1',
      },
      {
        title: 'Subtile 2',
      },
    ],
  },
  {
    title: 'Title 4',
    subTiles: [
      {
        title: 'Subtile 3',
      },
      {
        title: 'Subtile 4',
      },
      {
        title: 'Subtile 5',
      },
    ],
  },
  {
    title: 'Title 5',
  },
];

export const Homepage = () => {
  return (
    <Container>
      {tiles.map((tile, key) =>
        (tile.subTiles || []).length === 0 ? (
          <Tile key={key} bgColor={getPleasantColor()}>
            <Content>{tile.title}</Content>
          </Tile>
        ) : (
          <Tiles key={key} tiles={tile.subTiles} />
        ),
      )}
    </Container>
  );
};

const Tiles = ({ tiles = [] }: { tiles: { title: string }[] | undefined }) => {
  const numTiles: number = tiles.length;

  const TilesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 15px;
    width: 100%;
    @media (min-width: ${MIN_SIZE_FOR_DESKTOP}px) {
      grid-template-columns: repeat(${numTiles}, 1fr);
    }
  `;

  return (
    <TilesWrapper>
      {tiles.map((tile, key) => (
        <Tile key={key} bgColor={getPleasantColor()}>
          <Content>{tile.title}</Content>
        </Tile>
      ))}
    </TilesWrapper>
  );
};
