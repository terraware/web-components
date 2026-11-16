import React from 'react';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import EditableTableV2 from '.';

test.each([false, true])('steps a wide header to its narrow neighbour and back (RTL: %s)', async (rtl) => {
  const user = userEvent.setup();
  render(
    <EditableTableV2
      clearAllFiltersLabel='Clear'
      enableColumnDragging
      columns={[
        { id: 'name', header: 'Name', accessorKey: 'name', size: 400 },
        { id: 'count', header: 'Count', accessorKey: 'count', size: 100 },
      ]}
      data={[{ name: 'Alpha', count: 1 }]}
    />
  );
  screen.getAllByRole('columnheader').forEach((header) => {
    const wide = header.textContent?.includes('Name');
    header.getBoundingClientRect = () => {
      const first = screen.getAllByRole('columnheader')[0] === header;
      const width = wide ? 400 : 100;
      const x = rtl ? (first ? (wide ? 100 : 400) : 0) : first ? 0 : wide ? 100 : 400;
      return { x, y: 0, left: x, right: x + width, top: 0, bottom: 50, width, height: 50, toJSON: () => ({}) };
    };
  });
  screen.getByLabelText('Drag column: Name').focus();
  await user.keyboard(rtl ? '[Space][ArrowLeft]' : '[Space][ArrowRight]');
  const boundary = new KeyboardEvent('keydown', {
    key: rtl ? 'ArrowLeft' : 'ArrowRight',
    code: rtl ? 'ArrowLeft' : 'ArrowRight',
    bubbles: true,
    cancelable: true,
  });
  fireEvent(document, boundary);
  expect(boundary.defaultPrevented).toBe(true);
  await user.keyboard('[Space]');
  await waitFor(() => expect(screen.getAllByRole('columnheader')[0]).toHaveTextContent('Count'));
  screen.getByLabelText('Drag column: Name').focus();
  await user.keyboard(rtl ? '[Space][ArrowRight][Space]' : '[Space][ArrowLeft][Space]');
  await waitFor(() => expect(screen.getAllByRole('columnheader')[0]).toHaveTextContent('Name'));
  expect(screen.queryByTestId('column-drag-overlay')).not.toBeInTheDocument();
});
