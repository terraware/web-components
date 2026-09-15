import React, { type JSX } from 'react';

import { Box, Typography } from '@mui/material';

import Icon from '../Icon/Icon';
import PhotoSlide from './PhotoSlide';
import './styles.scss';
import usePhotosCarousel from './usePhotosCarousel';

export type PhotoItem = {
  url: string;
  alt?: string;
  decoration?: React.ReactNode;
};

export interface PhotosCarouselProps {
  photos: PhotoItem[];
  selectedSlide?: number;
  onSlideChange?: (index: number) => void;
  showArrows?: boolean;
  numbered?: boolean;
  dots?: boolean;
}

const PhotosCarousel = (props: PhotosCarouselProps): JSX.Element => {
  const { photos, showArrows = false, numbered, dots = true } = props;
  const {
    emblaRef,
    currentSlide,
    scrollSnaps,
    prevButtonDisabled,
    nextButtonDisabled,
    scrollPrev,
    scrollNext,
    scrollTo,
    onKeyDown,
  } = usePhotosCarousel(props);

  return (
    <Box className='photos-carousel' role='region' aria-roledescription='carousel' aria-label='Photos'>
      <div className='embla'>
        <div className='embla__viewport' ref={emblaRef} onKeyDown={onKeyDown}>
          <div className='embla__container'>
            {photos.map((photo, index) => (
              <PhotoSlide
                key={`${photo.url}-${index}`}
                photo={photo}
                index={index}
                total={photos.length}
                selected={index === currentSlide}
              />
            ))}
          </div>
        </div>
        {showArrows && photos.length > 1 && (
          <>
            <button
              type='button'
              className='embla__prev'
              aria-label='Previous photo'
              disabled={prevButtonDisabled}
              onClick={scrollPrev}
            >
              <Icon name='caretLeft' fillColor='currentColor' />
            </button>
            <button
              type='button'
              className='embla__next'
              aria-label='Next photo'
              disabled={nextButtonDisabled}
              onClick={scrollNext}
            >
              <Icon name='caretRight' fillColor='currentColor' />
            </button>
          </>
        )}
        {dots && (
          <div className='embla__dots'>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type='button'
                className={`embla__dot${index === currentSlide ? ' embla__dot--selected' : ''}`}
                aria-label={`Go to photo ${index + 1}`}
                aria-current={index === currentSlide ? 'true' : undefined}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        )}
      </div>
      {numbered && (
        <Typography className='photo-numbering'>{`${photos.length ? currentSlide + 1 : 0}/${photos.length}`}</Typography>
      )}
      {photos[currentSlide]?.decoration}
    </Box>
  );
};

export default PhotosCarousel;
