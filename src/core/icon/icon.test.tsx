import React from 'react';
import { render } from '@testing-library/react';
import { Icon } from './icon';

describe('Icon', () => {
  it('renders HomeIcon (filled) by default', () => {
    const { container } = render(<Icon name="home" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
    // MUI icons have data-testid="HomeIcon" etc.
    expect(container.innerHTML).toContain('data-testid="HomeIcon"');
  });

  it('renders HomeOutlinedIcon when type is outlined', () => {
    const { container } = render(<Icon name="home" type="outlined" />);
    expect(container.innerHTML).toContain('data-testid="HomeOutlinedIcon"');
  });

  it('renders SearchIcon and SearchOutlinedIcon', () => {
    const { container: c1 } = render(<Icon name="search" />);
    expect(c1.innerHTML).toContain('data-testid="SearchIcon"');
    const { container: c2 } = render(<Icon name="search" type="outlined" />);
    expect(c2.innerHTML).toContain('data-testid="SearchOutlinedIcon"');
  });

  it('renders ShoppingBagIcon and ShoppingBagOutlinedIcon', () => {
    const { container: c1 } = render(<Icon name="bag" />);
    expect(c1.innerHTML).toContain('data-testid="ShoppingBagIcon"');
    const { container: c2 } = render(<Icon name="bag" type="outlined" />);
    expect(c2.innerHTML).toContain('data-testid="ShoppingBagOutlinedIcon"');
  });

  it('renders AcUnitIcon and AcUnitOutlinedIcon', () => {
    const { container: c1 } = render(<Icon name="ac_unit" />);
    expect(c1.innerHTML).toContain('data-testid="AcUnitIcon"');
    const { container: c2 } = render(<Icon name="ac_unit" type="outlined" />);
    expect(c2.innerHTML).toContain('data-testid="AcUnitOutlinedIcon"');
  });

  it('renders DragHandleIcon and DragHandleOutlinedIcon', () => {
    const { container: c1 } = render(<Icon name="drag_handle" />);
    expect(c1.innerHTML).toContain('data-testid="DragHandleIcon"');
    const { container: c2 } = render(
      <Icon name="drag_handle" type="outlined" />,
    );
    expect(c2.innerHTML).toContain('data-testid="DragHandleOutlinedIcon"');
  });

  it('applies correct fontSize for sm, md, lg', () => {
    const { container: sm } = render(<Icon name="home" size="sm" />);
    const { container: md } = render(<Icon name="home" size="md" />);
    const { container: lg } = render(<Icon name="home" size="lg" />);
    // Check the style attribute for fontSize
    expect(sm.querySelector('svg')).toHaveStyle({ fontSize: '16px' });
    expect(md.querySelector('svg')).toHaveStyle({ fontSize: '24px' });
    expect(lg.querySelector('svg')).toHaveStyle({ fontSize: '32px' });
  });

  it('returns null for unknown icon name', () => {
    const { container } = render(<Icon name="unknown" />);
    expect(container.firstChild).toBeNull();
  });
});
