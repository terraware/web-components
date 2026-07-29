import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { AnnotationProps } from './Annotation';
import AnnotationEditPane, { AnnotationEditPaneStrings } from './AnnotationEditPane';

const strings: AnnotationEditPaneStrings = {
  editAnnotation: 'Edit annotation',
  title: 'Title',
  titleTooltip: 'Title tooltip',
  description: 'Description',
  descriptionTooltip: 'Description tooltip',
  label: 'Label',
  labelTooltip: 'Label tooltip',
};

const baseAnnotation: AnnotationProps = {
  position: [0, 0, 0],
  title: 'Mangrove nursery',
};

test('renders one thumbnail per existing image url', () => {
  const annotation: AnnotationProps = {
    ...baseAnnotation,
    imageUrls: ['https://example.test/a.jpg', 'https://example.test/b.jpg'],
  };

  render(<AnnotationEditPane visible annotation={annotation} strings={strings} onUpdate={() => undefined} />);

  expect(screen.getAllByAltText('Mangrove nursery')).toHaveLength(2);
});

test('clicking a thumbnail trash button removes that url via onUpdate', () => {
  const handleUpdate = jest.fn();
  const annotation: AnnotationProps = {
    ...baseAnnotation,
    imageUrls: ['https://example.test/a.jpg', 'https://example.test/b.jpg'],
  };

  const { container } = render(
    <AnnotationEditPane visible annotation={annotation} strings={strings} onUpdate={handleUpdate} />
  );

  const removeFirst = container.querySelector('#annotation-existing-image-remove-0') as HTMLElement;
  fireEvent.click(removeFirst);

  expect(handleUpdate).toHaveBeenCalledWith({ imageUrls: ['https://example.test/b.jpg'] });
});
