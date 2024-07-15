import { colors, createStyleSheet, useStyleSheet } from '@Core/styles';
import { CSSProperties } from '@Core/styles/stylesheet/types';
// import { Text } from '@Core/text';
import React, { useEffect, useState } from 'react';
import { FilterType } from './constants';
import { ChartData, FilterInfo, NodeDimensions, NodeStyleProps, OrgChartOptions, OrgChartProps } from './types';
import { decorateOptions, getDimensions, matchesFilterText, toggleNodeVisibility } from './utils';

const noBorder: CSSProperties = { border: '0 none' };

const nodeStyleSheet = createStyleSheet('nodeStyles', ({
  amISelected,
  backgroundColor,
  borderColor,
  color,
  dimensions: {
    borderRadius, borderWidth, childPadding, connectorWidth, opacityHiddenNode, nodeHeight, nodeWidth, verticalMargin,
  },
  hasGroups,
  isChild,
  left,
  nextLeft,
  numChildLevels,
  parentColor,
  parentLeft,
}: NodeStyleProps) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',

    backgroundColor,
    color,
    borderRadius: `${borderRadius}px`,
    left: `${left}px`,
    width: `${nodeWidth + 2 * borderWidth}px`,
    height: `${nodeHeight + 2 * borderWidth}px`,
    border: `${borderWidth}px solid ${borderColor}`,
    opacity: amISelected ? '100%' : `${opacityHiddenNode}%`,

    ...(!isChild && {
      // top right horizontal border for groups
      '&::after': {
        content: '""',
        position: 'absolute',
        height: `${verticalMargin + borderWidth}px`,
        borderTop: `${connectorWidth}px solid ${parentColor}4D`,
        boxSizing: 'border-box',
        bottom: `calc(100% + ${borderWidth}px)`,
        width: `${nextLeft - left}px`,
        left: `calc(50% + ${connectorWidth / 2}px)`
      },
      // '&:first-of-type': { '&::before': noBorder },
      // '&:last-of-type': { '&::after': noBorder },
    }),
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    height: '100%',
    width: '100%',

    '&::before': {
      content: '""',
      position: 'absolute',
      boxSizing: 'border-box',

      ...(isChild && {
        // left horizontal border to join with parent
        borderTop: `${connectorWidth}px solid ${parentColor}4D`,
        width: `${left - parentLeft - childPadding / 2}px`,
        right: `${nodeWidth + borderWidth}px`,
        top: `${nodeHeight / 2}px`,
      }),

      ...(!isChild && {
        // top vertical border to join with parent group
        height: `${verticalMargin + borderWidth - connectorWidth / 2}px`,
        borderLeft: `${connectorWidth}px solid ${parentColor}4D`,
        left: '50%',
        bottom: `calc(100% + ${borderWidth}px)`,
        ...(parentLeft === 0 && noBorder),
      })
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      boxSizing: 'border-box',
      borderLeft: `${connectorWidth}px solid ${borderColor}4D`,
      top: `calc(100% + ${borderWidth}px)`,

      ...hasGroups && {
        // bottom vertical border for parent of a group
        height: `${verticalMargin}px`,
        left: `calc(50%)`,
      },

      ...(numChildLevels && {
        // bottom vertical border to connect with children
        height: `${
          numChildLevels * (2 * (borderWidth + verticalMargin) + nodeHeight + connectorWidth) -
          borderWidth -
          (nodeHeight - connectorWidth) / 2
        }px`,
        left: `${(childPadding - connectorWidth) / 2 - borderWidth}px`,
      }),
    }
  },
  collapse: {
    cursor: 'pointer',
    display: 'flex',
  },
  collapsedIcon: {
    fontSize: '13px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    cursor: 'pointer',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }
}));
const Node = ({
  data,
  dimensions,
  filterInfo,
  nextLeft,
  onNodeCollapse,
  onNodeSelect,
  showRelevantOnly,
}: {
  data: ChartData;
  dimensions: NodeDimensions;
  filterInfo: FilterInfo;
  nextLeft: number;
  onNodeCollapse: (id: string, parent: string[]) => void;
  onNodeSelect: (text: string) => void;
  showRelevantOnly: boolean;
}) => {
  const isCollapsed: boolean = data.collapsedChildren.length > 0;
  const numChildren: number = (data.children || []).length + data.collapsedChildren.length;

  const styleProps: NodeStyleProps = {
    amISelected: matchesFilterText(data.title, filterInfo),
    backgroundColor: data.style?.backgroundColor ? data.style.backgroundColor : colors.white,
    borderColor: data.style?.backgroundColor ? data.style.backgroundColor : colors.black,
    color: data.style?.color ? data.style.color : colors.black,
    dimensions,
    hasGroups: data.isGroup && data.children.length > 0,
    isChild: data.isChild,
    left: data.left,
    nextLeft,
    numChildLevels: !data.isGroup && data.children?.length ? data.children[data.children.length - 1].level - data.level : 0,
    parentColor: data.parentColor,
    parentLeft: data.parentLeft,
  };

  const classes = useStyleSheet(nodeStyleSheet, {...styleProps});
  return (
    <div className={classes.container} style={{ left: `${data.left}px`}} key={`${data.level}.${data.left}`}>
      <div className={classes.content}>
        <div className={classes.textContainer}>
          <div
            className={classes.text}
            data-testid="org-chart-node-text"
            onClick={() => onNodeSelect(filterInfo.text !== data.title ? data.title : null)}
          >
            {`${data.title} ${numChildren > 0 ? `(${numChildren})` : ''}`}
          </div>
          {numChildren > 0 && !showRelevantOnly && (
            <div
              onClick={() => onNodeCollapse(data.id, data.parent)}
              className={classes.collapse}
              data-testid="expand-collapsed"
            >
              {!isCollapsed ? 'E' : 'C'}
              {/* <Icon
                name={!isCollapsed ? 'remove-circle' : 'add-circle'}
                type="outlined"
                className={classes.collapsedIcon}
              /> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const chartStyleSheet = createStyleSheet('chartStyles', ({ dimensions, maxHeight }: { dimensions: NodeDimensions; maxHeight: number }) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    ...(maxHeight && { maxHeight: `${maxHeight}px`}),
    padding: '10px',
    overflow: 'auto',
  },
  levels: {
    display: 'flex',
    flexDirection: 'row',
    position: 'relative',
  },
  level: {
    display: 'flex',
    flexDirection: 'row',
    height: `${dimensions.nodeHeight + dimensions.connectorWidth + 2 * (dimensions.borderWidth + dimensions.verticalMargin)}px`,
  }
}));
const Chart = ({
  dimensions,
  filterInfo,
  maxHeight,
  onNodeSelect,
  options,
  showRelevantOnly,
}: {
  dimensions: NodeDimensions;
  filterInfo: FilterInfo;
  maxHeight: number;
  onNodeSelect: (text: string) => void;
  options: OrgChartOptions;
  showRelevantOnly: boolean;
}) => {
  const [nodes, setNodes] = useState<ChartData>(null);
  const [data, setData] = useState<ChartData[][][]>([]);

  useEffect(() => {
    setNodes(options);
  }, [options]);

  useEffect(() => {
    if(nodes && dimensions) setData(decorateOptions(nodes, dimensions, showRelevantOnly ? filterInfo : null));
  }, [dimensions, nodes]);

  const handleNodeCollapse = (id: string, parent: string[]): void =>
    setNodes(toggleNodeVisibility({ ...nodes }, id, parent.slice(1)));

  const classes = useStyleSheet(chartStyleSheet, { dimensions, maxHeight });
  return data?.length ? (
    <div className={classes.container}>
      {data.map((level, lKey) => {
        return (
          <div className={classes.levels} key={lKey}>
            <div className={classes.level} key={lKey}>
              {level.map((siblings, sKey) => siblings.map((node, nKey) => (
                <Node
                  data={node}
                  dimensions={dimensions}
                  filterInfo={filterInfo}
                  key={`${lKey}-${sKey}-${nKey}`}
                  nextLeft={nKey < siblings.length - 1 ? siblings[nKey + 1].left : -1}
                  onNodeCollapse={handleNodeCollapse}
                  onNodeSelect={onNodeSelect}
                  showRelevantOnly={showRelevantOnly}
                />
              )))}
            </div>
          </div>
        );
      })}
    </div>
  ) : null;
};

const orgChartStyleSheet = createStyleSheet('orgChartStyle', {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    background: colors.gray010,
    width: '100%',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20px',
    height: '24px',
  },
  search: {
    width: '300px',
  },
})
export const OrgChart = ({
  dimensions = {},
  maxHeight,
  options,
  searchEnabled = true,
}: OrgChartProps) => {
  const [filterInfo, setFilterInfo] = useState<FilterInfo>({ text: '', type: FilterType.EXACT_MATCH });
  const [showRelevantOnly, setShowRelevantOnly] = useState<boolean>(false);

  const handleFilterUpdate = (text: string, type: FilterType = FilterType.EXACT_MATCH): void =>
    !showRelevantOnly && setFilterInfo({ text, type });

  // const toggleRelevantOnly = () => setShowRelevantOnly(!showRelevantOnly);

  const classes = useStyleSheet(orgChartStyleSheet, null);
  return (
    <div className={classes.container}>
      {searchEnabled && (
        <div className={classes.header} onClick={() => setShowRelevantOnly(false)}>
          {/* <Input
            className={classes.search}
            clearable
            disabled={showRelevantOnly}
            onChange={(event) => handleFilterUpdate(event.target.value, FilterType.CONTAINS)}
            onClearClick={() => handleFilterUpdate('', FilterType.CONTAINS)}
            placeholder="Search"
            size="sm"
            type="search"
            value={filterInfo.text}
          /> */}
          {/* {filterInfo.text ? (
            <Switch labelPlacement="right" onChange={toggleRelevantOnly} size="sm">
              <Text typography='body03'>Show relevant brancehs only</Text>
            </Switch>
          ) : null} */}
        </div>
      )}
      <Chart
        dimensions={getDimensions(dimensions)}
        filterInfo={filterInfo}
        maxHeight={maxHeight}
        onNodeSelect={handleFilterUpdate}
        options={options}
        showRelevantOnly={showRelevantOnly}
      />
    </div>
  );
};