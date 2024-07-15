import { CSSProperties } from "react";
import { FilterType } from "./constants";

export type OrgChartProps = {
  dimensions?: NodeDimensions;
  maxHeight?: number;
  options: OrgChartOptions;
  searchEnabled?: boolean;
};

export type OrgChartOptions = {
  id: string;
  isGroup?: boolean;
  children?: OrgChartOptions[];

  title: string;
  subTitle?: string;
  style?: CSSProperties;
  collapsed?: boolean;
};

export type ChartData = {
  id: string;
  isGroup?: boolean;
  children?: ChartData[];
  collapsedChildren?: ChartData[];

  title: string;
  subTitle?: string;
  style?: CSSProperties;
  collapsed?: boolean;

  isChild?: boolean;
  left?: number;
  level?: number;
  parent?: string[];
  parentColor?: string;
  parentLeft?: number;
  prevLeft?: number;
  nextLeft?: number;
};

export type NodeDimensions = {
  borderRadius?: number;
  borderWidth?: number;
  childPadding?: number;
  connectorWidth?: number;
  leftMargin?: number;
  nodeHeight?: number;
  nodeWidth?: number;
  opacityHiddenNode?: number;
  siblingMargin?: number;
  verticalMargin?: number;
};

export type NodeStyleProps = {
  amISelected: boolean;
  backgroundColor: string;
  borderColor: string;
  color: string;
  dimensions: NodeDimensions;
  hasGroups: boolean;
  isChild: boolean;
  left: number;
  nextLeft: number;
  numChildLevels: number;
  parentColor: string;
  parentLeft: number;
};

export type FilterInfo = {
  text: string;
  type: FilterType;
}