import React, { useState } from 'react';

import TimelineSliderV2, { TimelineSliderV2Mark } from '../components/TimelineSliderV2';

export default {
  title: 'TimelineSliderV2',
  component: TimelineSliderV2,
};

const GREEN = '#4caf50';
const ORANGE = '#ff9800';
const BLUE = '#1976d2';

const Harness = ({ marks }: { marks: TimelineSliderV2Mark[] }) => {
  const [selectedMarkId, setSelectedMarkId] = useState<string>();

  return (
    <TimelineSliderV2
      labelEnd='Aug 2025'
      labelStart='Jul 2022'
      marks={marks}
      onSelect={setSelectedMarkId}
      selectedMarkId={selectedMarkId}
    />
  );
};

const spread: TimelineSliderV2Mark[] = [
  { color: GREEN, id: 'a', label: 'Jul 2022', value: 0 },
  { color: ORANGE, id: 'b', label: 'Jan 2023', value: 25 },
  { color: BLUE, id: 'c', label: 'Aug 2023', value: 50 },
  { color: GREEN, id: 'd', label: 'Mar 2024', value: 75 },
  { color: ORANGE, id: 'e', label: 'Aug 2025', value: 100 },
];

const dense: TimelineSliderV2Mark[] = [
  { color: GREEN, id: 'a', label: 'Jul 2022', value: 0 },
  { color: GREEN, id: 'b', label: 'Aug 2022', value: 48 },
  { color: ORANGE, id: 'c', label: 'Sep 2022', value: 49 },
  { color: GREEN, id: 'd', label: 'Oct 2022', value: 50 },
  { color: BLUE, id: 'e', label: 'Nov 2022', value: 51 },
  { color: ORANGE, id: 'f', label: 'Aug 2025', value: 100 },
];

const crowded: TimelineSliderV2Mark[] = Array.from({ length: 15 }, (_, index) => ({
  color: index % 3 === 0 ? ORANGE : GREEN,
  id: `m${index}`,
  label: `Observation ${index + 1}`,
  value: 50 + index * 0.1,
})).concat([{ color: BLUE, id: 'edge', label: 'Aug 2025', value: 100 }]);

export const Default = () => <Harness marks={spread} />;

export const Clustered = () => <Harness marks={dense} />;

export const LargeCluster = () => <Harness marks={crowded} />;

export const SingleValueMarks = () => (
  <Harness
    marks={[
      { color: BLUE, id: 'a', label: 'Same day 1', value: 50 },
      { color: GREEN, id: 'b', label: 'Same day 2', value: 50 },
      { color: ORANGE, id: 'c', label: 'Same day 3', value: 50 },
    ]}
  />
);

export const SingleMark = () => <Harness marks={[{ color: GREEN, id: 'only', label: 'Jul 2022', value: 0 }]} />;
