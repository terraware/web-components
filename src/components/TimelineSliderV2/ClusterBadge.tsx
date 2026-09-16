import React, { type JSX } from 'react';

import Icon from '../Icon/Icon';
import './styles.scss';

type ClusterBadgeProps = {
  count: number;
  leftPx: number;
  onClose: () => void;
};

const ClusterBadge = ({ count, leftPx, onClose }: ClusterBadgeProps): JSX.Element => {
  return (
    <div className='timeline-v2-cluster-badge' style={{ left: `${leftPx}px` }}>
      {count}
      <button aria-label='Close cluster' className='timeline-v2-cluster-badge__close' onClick={onClose} type='button'>
        <Icon name='close' size='small' />
      </button>
    </div>
  );
};

export default ClusterBadge;
