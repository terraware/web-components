import React, { type JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useTheme } from '@mui/material';

import ClusterBadge from './ClusterBadge';
import TimelineDot from './TimelineDot';
import TimelineRail from './TimelineRail';
import { DEFAULT_CLUSTER_THRESHOLD_PX, type TimelineNode, buildLayout } from './layout';
import './styles.scss';

export type TimelineSliderV2Mark = {
  ariaLabel?: string;
  color: string;
  id: string;
  label?: string;
  value: number;
};

export type TimelineSliderV2Props = {
  clusterThresholdPx?: number;
  labelEnd?: string;
  labelStart?: string;
  marks: TimelineSliderV2Mark[];
  onSelect?: (markId: string) => void;
  selectedMarkId?: string;
};

const TimelineSliderV2 = ({
  clusterThresholdPx = DEFAULT_CLUSTER_THRESHOLD_PX,
  labelEnd,
  labelStart,
  marks,
  onSelect,
  selectedMarkId,
}: TimelineSliderV2Props): JSX.Element => {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [expandedClusterId, setExpandedClusterId] = useState<string>();

  useEffect(() => {
    const node = containerRef.current;

    if (node === null) {
      return;
    }

    const measure = () => setContainerWidth(node.clientWidth);

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const layout = useMemo(
    () => buildLayout({ containerWidth, expandedClusterId, marks, thresholdPx: clusterThresholdPx }),
    [clusterThresholdPx, containerWidth, expandedClusterId, marks]
  );

  useEffect(() => {
    if (containerWidth > 0 && expandedClusterId !== undefined && layout.band === undefined) {
      setExpandedClusterId(undefined);
    }
  }, [containerWidth, expandedClusterId, layout.band]);

  const selectedLabel = useMemo(() => marks.find((mark) => mark.id === selectedMarkId)?.label, [marks, selectedMarkId]);

  const markNames = useMemo(() => new Map(marks.map((mark) => [mark.id, mark.ariaLabel ?? mark.label])), [marks]);

  const nodeAriaLabel = useCallback(
    (node: TimelineNode): string | undefined => {
      const names = node.markIds
        .map((markId) => markNames.get(markId))
        .filter((name): name is string => name !== undefined);

      return names.length > 0 ? names.join(', ') : undefined;
    },
    [markNames]
  );

  const handleNodeClick = useCallback(
    (node: TimelineNode) => {
      if (node.markIds.length > 1) {
        setExpandedClusterId(node.id);
      } else {
        onSelect?.(node.markIds[0]);
      }
    },
    [onSelect]
  );

  const handleCollapse = useCallback(() => setExpandedClusterId(undefined), []);

  return (
    <div className='timeline-v2'>
      <div className='timeline-v2-label' style={{ marginRight: theme.spacing(2) }}>
        {labelStart}
      </div>
      <div className='timeline-v2-container' ref={containerRef}>
        <TimelineRail />

        {layout.band && (
          <>
            <div
              className='timeline-v2-band'
              style={{ left: `${layout.band.leftPx}px`, width: `${layout.band.widthPx}px` }}
            />
            <ClusterBadge
              count={layout.band.memberCount}
              leftPx={layout.band.leftPx + layout.band.widthPx / 2}
              onClose={handleCollapse}
            />
          </>
        )}

        {layout.nodes.map((node) => (
          <TimelineDot
            key={node.id}
            ariaLabel={nodeAriaLabel(node)}
            colorWeights={node.colorWeights}
            dimmed={node.dimmed}
            leftPx={node.leftPx}
            markCount={node.markIds.length}
            onClick={() => handleNodeClick(node)}
            selected={selectedMarkId !== undefined && node.markIds.includes(selectedMarkId)}
            sizePx={node.sizePx}
          />
        ))}
      </div>
      <div className='timeline-v2-label' style={{ marginLeft: theme.spacing(2) }}>
        {labelEnd}
      </div>
      {selectedLabel && <div className='timeline-v2-selected-label'>{selectedLabel}</div>}
    </div>
  );
};

export default TimelineSliderV2;
