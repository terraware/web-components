import { type KeyboardEvent, useEffect, useState } from 'react';

import useEmblaCarousel from 'embla-carousel-react';

import type { PhotosCarouselProps } from './index';

const usePhotosCarousel = ({
  photos,
  selectedSlide,
  onSlideChange,
}: Pick<PhotosCarouselProps, 'photos' | 'selectedSlide' | 'onSlideChange'>) => {
  const [internalSlide, setInternalSlide] = useState(0);
  const currentSlide = Math.max(0, Math.min(selectedSlide ?? internalSlide, photos.length - 1));
  const [startIndex] = useState(currentSlide);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, startIndex });
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const photoKey = JSON.stringify(photos.map((photo) => photo.url));

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (index: number) => emblaApi?.scrollTo(index);

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
    const updateControls = () => {
      setPrevButtonDisabled(!emblaApi.canScrollPrev());
      setNextButtonDisabled(!emblaApi.canScrollNext());
    };
    const handleInit = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
      updateControls();
    };
    const handleSelect = () => {
      updateControls();
      const slide = emblaApi.selectedScrollSnap();
      setInternalSlide(slide);
      if (slide !== currentSlide) {
        onSlideChange?.(slide);
      }
    };
    handleInit();
    emblaApi.on('select', handleSelect).on('reInit', handleInit);

    return () => {
      emblaApi.off('select', handleSelect).off('reInit', handleInit);
    };
  }, [emblaApi, currentSlide, onSlideChange, photoKey]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      if (event.key === 'ArrowLeft') {
        scrollPrev();
      } else {
        scrollNext();
      }
    }
  };

  return {
    emblaRef,
    currentSlide,
    scrollSnaps,
    prevButtonDisabled,
    nextButtonDisabled,
    scrollPrev,
    scrollNext,
    scrollTo,
    onKeyDown,
  };
};

export default usePhotosCarousel;
