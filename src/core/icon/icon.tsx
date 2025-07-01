import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DragHandleOutlinedIcon from '@mui/icons-material/DragHandleOutlined';

interface IconProps {
  name: string;
  type?: 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

const getSize = (size: 'sm' | 'md' | 'lg' | undefined): string => {
  switch (size) {
    case 'sm':
      return '16px';
    case 'lg':
      return '32px';
    case 'md':
    default:
      return '24px';
  }
};

export const Icon: React.FC<IconProps> = ({
  name,
  type = 'filled',
  size = 'md',
}) => {
  const fontSize = getSize(size);

  switch (name) {
    case 'home':
      return type === 'outlined' ? (
        <HomeOutlinedIcon style={{ fontSize }} />
      ) : (
        <HomeIcon style={{ fontSize }} />
      );
    case 'search':
      return type === 'outlined' ? (
        <SearchOutlinedIcon style={{ fontSize }} />
      ) : (
        <SearchIcon style={{ fontSize }} />
      );
    case 'bag':
      return type === 'outlined' ? (
        <ShoppingBagOutlinedIcon style={{ fontSize }} />
      ) : (
        <ShoppingBagIcon style={{ fontSize }} />
      );
    case 'ac_unit':
      return type === 'outlined' ? (
        <AcUnitOutlinedIcon style={{ fontSize }} />
      ) : (
        <AcUnitIcon style={{ fontSize }} />
      );
    case 'drag_handle':
      return type === 'outlined' ? (
        <DragHandleOutlinedIcon style={{ fontSize }} />
      ) : (
        <DragHandleIcon style={{ fontSize }} />
      );
    // Add more cases for other icons as needed
    default:
      return null;
  }
};
