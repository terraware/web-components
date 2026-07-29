import React from 'react';

import { fireEvent, render, screen } from '@testing-library/react';

import { AnnotationProps } from './Annotation';
import AnnotationEditPane, { AnnotationEditPaneStrings } from './AnnotationEditPane';

// Textfield transitively imports Markdown -> marked (pure ESM), which is
// unrelated to this pane and is not transformed by react-scripts' jest config.
jest.mock('marked', () => ({ marked: { parse: (value: string) => value } }));

jest.mock('../PhotoChooser', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid='photo-chooser' data-max={props.maxPhotos} data-multiple={String(!!props.multipleSelection)}>
      <button
        data-testid='mock-add-photos'
        onClick={() => props.onPhotosChanged([new File(['x'], 'a.png', { type: 'image/png' })])}
      >
        add
      </button>
    </div>
  ),
}));

const strings: AnnotationEditPaneStrings = {
  editAnnotation: 'Edit annotation',
  title: 'Title',
  titleTooltip: 'title tip',
  description: 'Description',
  descriptionTooltip: 'desc tip',
  label: 'Label',
  labelTooltip: 'label tip',
};

const annotation: AnnotationProps = {
  position: [0, 0, 0],
  title: 'Test',
};

test('does not render the upload section when onImagesChange is not provided', () => {
  render(
    <AnnotationEditPane visible annotation={annotation} strings={strings} onUpdate={() => undefined} maxImages={3} />
  );
  expect(screen.queryByTestId('photo-chooser')).toBeNull();
});

test('does not render the upload section when maxImages is 0', () => {
  render(
    <AnnotationEditPane
      visible
      annotation={annotation}
      strings={strings}
      onUpdate={() => undefined}
      maxImages={0}
      onImagesChange={() => undefined}
    />
  );
  expect(screen.queryByTestId('photo-chooser')).toBeNull();
});

test('renders the upload section when onImagesChange and maxImages > 0 are provided', () => {
  render(
    <AnnotationEditPane
      visible
      annotation={annotation}
      strings={strings}
      onUpdate={() => undefined}
      maxImages={3}
      onImagesChange={() => undefined}
    />
  );
  const chooser = screen.getByTestId('photo-chooser');
  expect(chooser).toBeInTheDocument();
  expect(chooser).toHaveAttribute('data-max', '3');
  expect(chooser).toHaveAttribute('data-multiple', 'true');
});

test('uses single selection when maxImages is 1', () => {
  render(
    <AnnotationEditPane
      visible
      annotation={annotation}
      strings={strings}
      onUpdate={() => undefined}
      maxImages={1}
      onImagesChange={() => undefined}
    />
  );
  expect(screen.getByTestId('photo-chooser')).toHaveAttribute('data-multiple', 'false');
});

test('calls onImagesChange with the selected files', () => {
  const onImagesChange = jest.fn();
  render(
    <AnnotationEditPane
      visible
      annotation={annotation}
      strings={strings}
      onUpdate={() => undefined}
      maxImages={3}
      onImagesChange={onImagesChange}
    />
  );
  fireEvent.click(screen.getByTestId('mock-add-photos'));
  expect(onImagesChange).toHaveBeenCalledTimes(1);
  expect(onImagesChange.mock.calls[0][0]).toHaveLength(1);
  expect(onImagesChange.mock.calls[0][0][0].name).toBe('a.png');
});
