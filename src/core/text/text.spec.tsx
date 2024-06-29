import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Text, Heading } from './text';

describe('Text component', () => {
  it('should render correctly with typography "body01"', () => {
    const { container } = render(<Text typography="body01">Hello World!</Text>);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveStyle('fontSize: 24px');
  });

  it('should render correctly with typography "body02"', () => {
    const { container } = render(<Text typography="body02">Hello World!</Text>);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveStyle('fontSize: 22px');
  });

  it('should render correctly with typography "body03"', () => {
    const { container } = render(<Text typography="body03">Hello World!</Text>);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveStyle('fontSize: 20px');
  });

  it('should render correctly with typography "body04"', () => {
    const { container } = render(<Text typography="body04">Hello World!</Text>);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveStyle('fontSize: 18px');
  });

  it('should render correctly with typography "body05"', () => {
    const { container } = render(<Text typography="body05">Hello World!</Text>);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveStyle('fontSize: 16px');
  });

  it('should render correctly with typography "body06"', () => {
    const { container } = render(<Text typography="body06">Hello World!</Text>);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveStyle('fontSize: 14px');
  });

  it('should render correctly with typography "body07"', () => {
    const { container } = render(<Text typography="body07">Hello World!</Text>);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveStyle('fontSize: 12px');
  });

  it('should render correctly with typography "body08"', () => {
    const { container } = render(<Text typography="body08">Hello World!</Text>);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveStyle('fontSize: 10px');
  });

  it('should render correctly with typography "body09"', () => {
    const { container } = render(<Text typography="body09">Hello World!</Text>);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveStyle('fontSize: 8px');
  });

  it('should render correctly with typography "body10"', () => {
    const { container } = render(<Text typography="body10">Hello World!</Text>);
    const textElement = container.firstChild as HTMLElement;
    expect(textElement).toBeInTheDocument();
    expect(textElement.tagName).toBe('P');
    expect(textElement).toHaveStyle('fontSize: 6px');
  });
});

describe('Heading component', () => {
  it('should render correctly with typography "heading01"', () => {
    const { container } = render(
      <Heading typography="heading01">Hello World!</Heading>,
    );
    const headingElement = container.firstChild as HTMLElement;
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveStyle('fontSize: 48px');
  });

  it('should render correctly with typography "heading02"', () => {
    const { container } = render(
      <Heading typography="heading02">Hello World!</Heading>,
    );
    const headingElement = container.firstChild as HTMLElement;
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveStyle('fontSize: 42px');
  });

  it('should render correctly with typography "heading03"', () => {
    const { container } = render(
      <Heading typography="heading03">Hello World!</Heading>,
    );
    const headingElement = container.firstChild as HTMLElement;
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveStyle('fontSize: 36px');
  });

  it('should render correctly with typography "heading04"', () => {
    const { container } = render(
      <Heading typography="heading04">Hello World!</Heading>,
    );
    const headingElement = container.firstChild as HTMLElement;
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveStyle('fontSize: 32px');
  });

  it('should render correctly with typography "heading05"', () => {
    const { container } = render(
      <Heading typography="heading05">Hello World!</Heading>,
    );
    const headingElement = container.firstChild as HTMLElement;
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveStyle('fontSize: 28px');
  });

  it('should render correctly with typography "heading06"', () => {
    const { container } = render(
      <Heading typography="heading06">Hello World!</Heading>,
    );
    const headingElement = container.firstChild as HTMLElement;
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveStyle('fontSize: 24px');
  });

  it('should render correctly with typography "heading07"', () => {
    const { container } = render(
      <Heading typography="heading07">Hello World!</Heading>,
    );
    const headingElement = container.firstChild as HTMLElement;
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveStyle('fontSize: 20px');
  });

  it('should render correctly with typography "heading08"', () => {
    const { container } = render(
      <Heading typography="heading08">Hello World!</Heading>,
    );
    const headingElement = container.firstChild as HTMLElement;
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveStyle('fontSize: 18px');
  });

  it('should render correctly with typography "heading09"', () => {
    const { container } = render(
      <Heading typography="heading09">Hello World!</Heading>,
    );
    const headingElement = container.firstChild as HTMLElement;
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveStyle('fontSize: 16px');
  });

  it('should render correctly with typography "heading10"', () => {
    const { container } = render(
      <Heading typography="heading10">Hello World!</Heading>,
    );
    const headingElement = container.firstChild as HTMLElement;
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveStyle('fontSize: 14px');
  });
});
