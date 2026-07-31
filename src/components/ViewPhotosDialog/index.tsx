import React, { type JSX, useEffect, useState } from 'react';

import Button from '../Button/Button';
import DialogBox from '../DialogBox/DialogBox';
import PhotosCarousel, { PhotoItem } from '../PhotosCarousel';

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
  const [selectedSlide, setSelectedSlide] = useState(initialSelectedSlide);

  useEffect(() => {
    setSelectedSlide(initialSelectedSlide);
  }, [initialSelectedSlide, open]);

  const isPreviousDisabled = selectedSlide <= 0;
  const isNextDisabled = selectedSlide >= photos.length - 1;

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
      <PhotosCarousel
        photos={photos}
        selectedSlide={selectedSlide}
        onSlideChange={setSelectedSlide}
        numbered={numbered}
        dots={dots}
      />
    </DialogBox>
  );
}
