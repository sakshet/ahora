import { NodeDimensions } from "./types";

export const defaultDimensions: NodeDimensions = {
  borderRadius: 2,
  borderWidth: 2,
  childPadding: 50,
  connectorWidth: 2,
  leftMargin: 10,
  nodeHeight: 35,
  nodeWidth: 250,
  opacityHiddenNode: 30,
  siblingMargin: 10,
  verticalMargin: 10,
};

export enum FilterType {
  CONTAINS = 'Contains',
  EXACT_MATCH = 'Exact Match',
}