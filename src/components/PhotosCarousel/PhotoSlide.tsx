import React, { useState } from 'react';

import BusySpinner from '../BusySpinner';
import type { PhotoItem } from './index';

interface PhotoSlideProps {
  photo: PhotoItem;
  index: number;
  total: number;
  selected: boolean;
}

const PhotoSlide = ({ photo, index, total, selected }: PhotoSlideProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const finishLoading = () => setIsLoading(false);

  return (
    <div className='embla__slide' role='group' aria-roledescription='slide' aria-label={`${index + 1} of ${total}`}>
      {isLoading && <BusySpinner noBackground={true} />}
      <a href={photo.url} target='_blank' rel='noopener noreferrer' tabIndex={selected ? 0 : -1}>
        <img
          className='embla__slide__img'
          src={photo.url}
          alt={photo.alt}
          onLoad={finishLoading}
          onError={finishLoading}
        />
      </a>
    </div>
  );
};

export default PhotoSlide;
