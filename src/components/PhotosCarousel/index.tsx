import React, { type JSX, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import useEmblaCarousel from 'embla-carousel-react';

import BusySpinner from '../BusySpinner';
import Icon from '../Icon/Icon';
import './styles.scss';

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
  const { photos, selectedSlide, onSlideChange, showArrows = false, numbered, dots = true } = props;
  const [internalSlide, setInternalSlide] = useState(0);
  const currentSlide = Math.max(0, Math.min(selectedSlide ?? internalSlide, photos.length - 1));
  const [startIndex] = useState(currentSlide);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, startIndex });
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const [loadedPhotos, setLoadedPhotos] = useState<string[]>([]);
  const photoKey = JSON.stringify(photos.map((photo) => photo.url));

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    const updateButtons = () => {
      setPrevButtonDisabled(!emblaApi.canScrollPrev());
      setNextButtonDisabled(!emblaApi.canScrollNext());
    };
    const onInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      updateButtons();
    };
    onInit();
    emblaApi.on('reInit', onInit).on('select', updateButtons);
    return () => {
      emblaApi.off('reInit', onInit).off('select', updateButtons);
    };
  }, [emblaApi]);

  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, photoKey]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    // Synchronize external selection before subscribing so it does not echo a change callback.
    if (emblaApi.selectedScrollSnap() !== currentSlide) {
      emblaApi.scrollTo(currentSlide);
    }
    const handleSelect = () => {
      const slide = emblaApi.selectedScrollSnap();
      setInternalSlide(slide);
      if (slide !== currentSlide) {
        onSlideChange?.(slide);
      }
    };
    emblaApi.on('select', handleSelect);
    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, currentSlide, onSlideChange, photoKey]);

  return (
    <Box className='photos-carousel' role='region' aria-roledescription='carousel' aria-label='Photos'>
      <div className='embla'>
        <div
          className='embla__viewport'
          ref={emblaRef}
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              if (event.key === 'ArrowLeft') {
                emblaApi?.scrollPrev();
              } else {
                emblaApi?.scrollNext();
              }
            }
          }}
        >
          <div className='embla__container'>
            {photos.map((photo, index) => (
              <div
                key={`${photo.url}-${index}`}
                className='embla__slide'
                role='group'
                aria-roledescription='slide'
                aria-label={`${index + 1} of ${photos.length}`}
              >
                {!loadedPhotos.includes(photo.url) && <BusySpinner noBackground={true} />}
                <a
                  href={photo.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  tabIndex={index === currentSlide ? 0 : -1}
                >
                  <img
                    className='embla__slide__img'
                    src={photo.url}
                    alt={photo.alt}
                    onLoad={() => setLoadedPhotos((loaded) => [...loaded, photo.url])}
                    onError={() => setLoadedPhotos((loaded) => [...loaded, photo.url])}
                  />
                </a>
              </div>
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
