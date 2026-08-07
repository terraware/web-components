import React, { type JSX, useCallback, useEffect, useRef, useState } from 'react';
import CarouselImport from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Box, Typography } from '@mui/material';

import BusySpinner from '../BusySpinner';
import './styles.scss';

// react-multi-carousel is CommonJS compiled by TypeScript, so it exports the component as
// `exports.default` alongside an `__esModule` flag. We publish native ES modules, where the
// default import of a CommonJS module is the whole `module.exports` object and no bundler
// unwraps `.default` for us. Unwrap it here; the `??` keeps this correct under bundlers that
// do apply the legacy interop.
type CarouselInstance = InstanceType<typeof CarouselImport>;
const Carousel = (CarouselImport as unknown as { default?: typeof CarouselImport }).default ?? CarouselImport;

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
  const myCarousel = useRef<CarouselInstance>(null);
  const currentSlide = isControlled ? selectedSlide : internalSlide;

  // Keyed on the URLs (not just photos.length) so swapping in a same-length array of
  // different photos still resets the loading state instead of leaving stale flags.
  const photoKey = photos.map((p) => p.url).join('|');
  useEffect(() => {
    setIsLoading(new Array(photos.length).fill(true));
  }, [photoKey]);

  useEffect(() => {
    if (myCarousel.current && myCarousel.current.state.currentSlide !== currentSlide) {
      myCarousel.current.goToSlide(currentSlide);
    }
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
            <a href={p.url} target='_blank' rel='noopener noreferrer'>
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
