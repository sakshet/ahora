import { colors } from "@Core/styles";
import { FilterType, defaultDimensions } from './constants';
import { ChartData, FilterInfo, NodeDimensions, OrgChartOptions } from "./types";

export const decorateOptions = (
  options: OrgChartOptions,
  dimensions: NodeDimensions,
  filterInfo: FilterInfo,
): ChartData[][][] =>
  splitNodesIntoLevels(addAttributes(options, dimensions, filterInfo, dimensions.leftMargin, 0));

export const getDimensions = (dimensions: NodeDimensions): NodeDimensions => ({
  borderRadius: dimensions.borderRadius || defaultDimensions.borderRadius,
  borderWidth: dimensions.borderWidth || defaultDimensions.borderWidth,
  childPadding: dimensions.childPadding || defaultDimensions.childPadding,
  connectorWidth: dimensions.connectorWidth || defaultDimensions.connectorWidth,
  leftMargin: dimensions.leftMargin || defaultDimensions.leftMargin,
  nodeHeight: dimensions.nodeHeight || defaultDimensions.nodeHeight,
  nodeWidth: dimensions.nodeWidth || defaultDimensions.nodeWidth,
  opacityHiddenNode: dimensions.opacityHiddenNode || defaultDimensions.opacityHiddenNode,
  siblingMargin: dimensions.siblingMargin || defaultDimensions.siblingMargin,
  verticalMargin: dimensions.verticalMargin || defaultDimensions.verticalMargin,
});

export const matchesFilterText = (title: string, filterInfo: FilterInfo): boolean => {
  return (
    !filterInfo.text ||
    (filterInfo.type === FilterType.CONTAINS &&
      title.replace(/\s/g, '').includes(filterInfo.text.replace(/\s/g, '').toLowerCase())) ||
    (filterInfo.type === FilterType.EXACT_MATCH && title === filterInfo.text)
  );
}

export const toggleNodeVisibility = (
  options: ChartData,
  id: string,
  parent: string[],
): ChartData => {
  if(!parent.length) {
    return id === options.id
      ? toggleNode(options)
      : {
          ...options,
          children: options.children.map((child) => (child.id === id ? toggleNode(child) : child)),
        };
  }
  return {
    ...options,
    children: options.children.map((child) =>
      child.id === parent[0] ? toggleNodeVisibility(child, id, parent.slice(1)) : child),
  }
};

const addAttributes = (
  options: ChartData,
  dimensions: NodeDimensions,
  filterInfo: FilterInfo,
  left: number,
  level: number,
  isChild: boolean = false,
  parent: string[] = [],
  parentColor: string = colors.black
): ChartData => {
  if(filterInfo?.text) options = expandAndFilterNode(options, filterInfo);

  Object.assign(options, { isChild, left, level, parent, parentColor });

  if(options.collapsed) {
    options.collapsedChildren = options.children;
    options.children = [];
    options.collapsed = false;
  }

  options.collapsedChildren ||= [];

  if(!options.children?.length) return options;

  const { borderWidth, childPadding, nodeWidth, siblingMargin } = dimensions;

  options.children = options.children.map((child) => {
    child = addAttributes(
      child,
      dimensions,
      filterInfo,
      options.isGroup ? left : left + childPadding,
      level + 1,
      !options.isGroup,
      [...parent, options.id],
      options.style?.backgroundColor
    );

    if(!options.isGroup) level += getNumChildLevels(child) + 1;
    return child;
  });

  if(options.isGroup) {
    const numGroups: number = options.children.length;
    for(let i = 0; i < numGroups - 1; i++) {
      const currMaxLeft: number = getMaxLeft(options.children[i]);
      const nextMinLeft: number = getMinLeft(options.children[i + 1]);
      const overlap: number = currMaxLeft - nextMinLeft + nodeWidth + 2 * borderWidth + siblingMargin;
      options.children[i + 1] = overlap > 0 ? addLeftToAll(options.children[i + 1], overlap) : options.children[i + 1];
    }

    options.left = options.children.length === 1
      ? options.children[0].left
      : (options.children[0].left + options.children[numGroups - 1].left) / numGroups;
  }

  return options;
};

const addLeftToAll = (options: ChartData, width: number): ChartData => ({
  ...options,
  children: options.children?.map((child) => addLeftToAll(child, width)),
  left: options.left + width,
});

const containsFilterNode = (options: ChartData, filterInfo: FilterInfo): boolean =>
  matchesFilterText(options.title, filterInfo) ||
  options.children?.some((child) => containsFilterNode(child, filterInfo));

const expandAndFilterNode = (options: ChartData, filterInfo: FilterInfo): ChartData => {
  if(options.children?.length || options.collapsedChildren?.length) {
    const allChildren = [...(options.children || []), ...(options.collapsedChildren || [])];
    const { children, collapsedChildren } = allChildren.reduce(
      (acc, child) => {
        const processedChild: ChartData = expandAndFilterNode(child, filterInfo);
        if(containsFilterNode(processedChild, filterInfo)) {
          acc.children.push(processedChild);
        } else {
          acc.collapsedChildren.push(processedChild);
        }
        return acc;
      },
      { children: [], collapsedChildren: [] },
    );

    return { ...options, children, collapsedChildren };
  }
  return options;
};

const getMaxLeft = (options: ChartData): number =>
  Math.max(
    options.left,
    ...(options.children ? options.children.map(getMaxLeft) : [Number.MIN_VALUE]),
  );

const getMinLeft = (options: ChartData): number =>
  Math.min(
    options.left,
    ...(options.children ? options.children.map(getMinLeft) : [Number.MIN_VALUE]),
  );

const getNumChildLevels = (options: ChartData): number => {
  if(!options || !options.children?.length) return 0;

  const childrenLevels: number[] = options.children.map(getNumChildLevels);
  return options.isGroup
   ? 1 + Math.max(...childrenLevels)
   : childrenLevels.reduce((a, b) => 1 + a + b, 0);
};

const splitNodesIntoLevels = (
  options: ChartData,
  result: ChartData[][][] = [],
  parentLeft: number = 0,
): ChartData[][][] => {
  const updatedOptions: ChartData = { ...options, parentLeft };
  
  const level: ChartData[][] = result[options.level] || [];
  const lastGroup: ChartData[] = level[level.length - 1];
  if(!lastGroup || lastGroup[0].parent.join('.') !== options.parent?.join('.')) {
    level.push([updatedOptions]);
  } else {
    lastGroup.push(updatedOptions);
  }
  result[options.level] = level;
  
  options.children?.forEach((child) => splitNodesIntoLevels(child, result, options.left));
  return result;
};

const toggleNode = (node: ChartData): ChartData => {
  const isCollapsed: boolean = node.collapsedChildren.length > 0;
  const children: ChartData[] = [...node.children, ...node.collapsedChildren];
  return {
    ...node,
    children: isCollapsed ? children : [],
    collapsedChildren: isCollapsed ? [] : children,
  };
};