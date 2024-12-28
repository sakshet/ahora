import React from 'react';

import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import { SvgIconProps } from '@mui/material/SvgIcon';

interface IconProps {
  name: string;
  type?: 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

const getSize = (
  size: 'sm' | 'md' | 'lg' | undefined,
): SvgIconProps['fontSize'] => {
  switch (size) {
    case 'sm':
      return 'small';
    case 'lg':
      return 'large';
    case 'md':
    default:
      return 'medium';
  }
};

export const Icon: React.FC<IconProps> = ({
  name,
  type = 'filled',
  size = 'sm',
}) => {
  const fontSize = getSize(size);

  switch (name) {
    case 'home':
      return type === 'outlined' ? (
        <HomeOutlinedIcon fontSize={fontSize} />
      ) : (
        <HomeIcon fontSize={fontSize} />
      );
    case 'search':
      return type === 'outlined' ? (
        <SearchOutlinedIcon fontSize={fontSize} />
      ) : (
        <SearchIcon fontSize={fontSize} />
      );
    case 'bag':
      return type === 'outlined' ? (
        <ShoppingBagOutlinedIcon fontSize={fontSize} />
      ) : (
        <ShoppingBagIcon fontSize={fontSize} />
      );
    case 'ac_unit':
      return type === 'outlined' ? (
        <AcUnitOutlinedIcon fontSize={fontSize} />
      ) : (
        <AcUnitIcon fontSize={fontSize} />
      );
    // Add more cases for other icons as needed
    default:
      return null;
  }
};
