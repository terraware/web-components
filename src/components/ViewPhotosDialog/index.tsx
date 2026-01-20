import React, { type JSX, useCallback, useEffect, useRef, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { Box, Typography } from '@mui/material';

import BusySpinner from '../BusySpinner';
import Button from '../Button/Button';
import DialogBox from '../DialogBox/DialogBox';
import './styles.scss';

export type PhotoItem = {
  url: string;
  alt?: string;
  decoration?: React.ReactNode;
};

export interface ViewPhotosDialogProps {
  open: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  initialSelectedSlide: number;
  nextButtonLabel: string;
  prevButtonLabel: string;
  title: string;
  numbered?: boolean;
  dots?: boolean;
}

export default function ViewPhotosDialog(props: ViewPhotosDialogProps): JSX.Element {
  const { onClose, open, photos, initialSelectedSlide, nextButtonLabel, prevButtonLabel, title, numbered, dots } =
    props;
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(false);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean[]>([]);
  const [selectedSlide, setSelectedSlide] = useState(initialSelectedSlide);
  const myCarousel = useRef<Carousel>(null);

  const responsive = {
    mobile: {
      breakpoint: { max: 4000, min: 0 },
      items: 1,
    },
  };

  const handleChange = useCallback(
    (args?: any) => {
      if (myCarousel.current) {
        if (myCarousel.current.state.currentSlide + 1 >= photos.length) {
          setIsNextDisabled(true);
        } else {
          setIsNextDisabled(false);
        }
        if (myCarousel.current.state.currentSlide - 1 < 0) {
          setIsPreviousDisabled(true);
        } else {
          setIsPreviousDisabled(false);
        }
        if (args !== undefined) {
          // if we came from the carousel component's call of handleChange, do the right thing
          // don't set this slide if we came from useEffect on open
          setSelectedSlide(myCarousel.current.state.currentSlide);
        } else {
          // we need to reinitialize to last state
          if (selectedSlide === initialSelectedSlide) {
            // explicitly go to slide, the useEffect won't be triggered
            myCarousel.current.goToSlide(selectedSlide);
          }
        }
      }
    },
    [photos.length, selectedSlide, initialSelectedSlide, selectedSlide]
  );

  useEffect(() => {
    setIsLoading(new Array(photos.length).fill(true));
  }, [photos.length]);

  useEffect(() => {
    setSelectedSlide(initialSelectedSlide);
  }, [initialSelectedSlide]);

  useEffect(() => {
    handleChange();
  }, [open, handleChange]);

  useEffect(() => {
    if (myCarousel.current) {
      myCarousel.current.goToSlide(selectedSlide);
    }
  }, [selectedSlide]);

  const finishLoading = (index: number) => {
    const newIsLoading = [...isLoading];
    newIsLoading[index] = false;
    setIsLoading(newIsLoading);
  };

  return (
    <DialogBox
      onClose={onClose}
      open={open}
      title={title}
      size='large'
      scrolled={true}
      middleButtons={[
        <Button
          label={prevButtonLabel}
          priority='secondary'
          onClick={() => setSelectedSlide((slide) => Math.max(0, slide - 1))}
          key='button-1'
          disabled={isPreviousDisabled}
          icon='caretLeft'
        />,
        <Button
          label={nextButtonLabel}
          onClick={() => setSelectedSlide((slide) => Math.min(photos.length - 1, slide + 1))}
          key='button-2'
          disabled={isNextDisabled}
          rightIcon='caretRight'
        />,
      ]}
    >
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
          arrows={false}
          ssr={true}
          afterChange={handleChange}
        >
          {photos.map((p, i) => (
            <div key={`photo-${i}-container`} className='view-photos-dialog-container'>
              {isLoading[i] ? <BusySpinner noBackground={true} /> : undefined}
              <a href={p.url} target='blank'>
                <img className='view-photos-dialog-image' src={p.url} alt={p.alt} onLoad={() => finishLoading(i)} />
              </a>
            </div>
          ))}
        </Carousel>
        {numbered ? (
          <Typography className='photo-numbering'>{`${selectedSlide + 1}/${photos.length}`}</Typography>
        ) : undefined}
        {photos[selectedSlide] && photos[selectedSlide].decoration}
      </Box>
    </DialogBox>
  );
}
