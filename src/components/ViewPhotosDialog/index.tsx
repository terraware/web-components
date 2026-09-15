import React, { type JSX, useEffect, useState } from 'react';

import DialogBox from '../DialogBox/DialogBox';
import PhotosCarousel, { PhotoItem } from '../PhotosCarousel';

export interface ViewPhotosDialogProps {
  open: boolean;
  onClose: () => void;
  photos: PhotoItem[];
  initialSelectedSlide: number;
  title: string;
  numbered?: boolean;
  dots?: boolean;
}

export default function ViewPhotosDialog(props: ViewPhotosDialogProps): JSX.Element {
  const { onClose, open, photos, initialSelectedSlide, title, numbered, dots } = props;
  const [selectedSlide, setSelectedSlide] = useState(initialSelectedSlide);

  useEffect(() => {
    setSelectedSlide(initialSelectedSlide);
  }, [initialSelectedSlide, open]);

  return (
    <DialogBox onClose={onClose} open={open} title={title} size='large' scrolled={true}>
      <PhotosCarousel
        photos={photos}
        selectedSlide={selectedSlide}
        onSlideChange={setSelectedSlide}
        numbered={numbered}
        dots={dots}
        showArrows
      />
    </DialogBox>
  );
}
