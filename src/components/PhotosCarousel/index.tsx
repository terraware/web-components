import React, { type JSX, useCallback, useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Box, Typography } from '@mui/material';

import BusySpinner from '../BusySpinner';
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

const responsive = {
  mobile: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
  },
};

export default function PhotosCarousel(props: PhotosCarouselProps): JSX.Element {
  const { photos, selectedSlide, onSlideChange, showArrows, numbered, dots } = props;
  const isControlled = selectedSlide !== undefined;
  const [internalSlide, setInternalSlide] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean[]>([]);
  const myCarousel = useRef<Carousel>(null);
  const currentSlide = isControlled ? selectedSlide : internalSlide;

  useEffect(() => {
    setIsLoading(new Array(photos.length).fill(true));
  }, [photos.length]);

  useEffect(() => {
    myCarousel.current?.goToSlide(currentSlide);
  }, [currentSlide]);

  const handleAfterChange = useCallback(() => {
    const slide = myCarousel.current?.state.currentSlide ?? 0;
    if (!isControlled) {
      setInternalSlide(slide);
    }
    if (slide !== currentSlide) {
      onSlideChange?.(slide);
    }
  }, [isControlled, currentSlide, onSlideChange]);

  const finishLoading = (index: number) => {
    setIsLoading((prev) => {
      const next = [...prev];
      next[index] = false;
      return next;
    });
  };

  return (
    <Box
      sx={{
        '& .react-multi-carousel-list': {
          paddingBottom: '20px',
        },
      }}
    >
      <Carousel
        responsive={responsive}
        ref={myCarousel}
        showDots={dots ?? true}
        arrows={showArrows ?? false}
        ssr={true}
        afterChange={handleAfterChange}
      >
        {photos.map((p, i) => (
          <div key={`photo-${i}-container`} className='photos-carousel-container'>
            {isLoading[i] ? <BusySpinner noBackground={true} /> : undefined}
            <a href={p.url} target='blank'>
              <img className='photos-carousel-image' src={p.url} alt={p.alt} onLoad={() => finishLoading(i)} />
            </a>
          </div>
        ))}
      </Carousel>
      {numbered ? (
        <Typography className='photo-numbering'>{`${currentSlide + 1}/${photos.length}`}</Typography>
      ) : undefined}
      {photos[currentSlide] && photos[currentSlide].decoration}
    </Box>
  );
}
