# Testing

This doc covers how we test web-components, and what we test with: stories, component tests, and unit tests.

## Summary

- Most components should have a story.
- Components that users interact with should also have component tests. Display-only components, such as icons, don't
  need them.
- Exported functions that contain logic should have unit tests.
- Check styling and layout changes in Storybook, not with unit tests.
- When you fix a regression, add a check to an existing test when possible, instead of writing a new one.

## Running tests

| Command              | What it does                                                          |
|----------------------|-----------------------------------------------------------------------|
| `yarn test`          | Runs all Jest tests in watch mode                                     |
| `yarn test-coverage` | Runs the tests with coverage and writes the report to `docs/coverage` |
| `yarn start`         | Starts Storybook for visual checks                                    |

Tests use Jest (through `react-scripts`), React Testing Library, `@testing-library/user-event`, and the
`@testing-library/jest-dom` matchers loaded in `src/setupTests.js`. Put test files next to the code they test, named
`*.test.ts` or `*.test.tsx`.

## Stories

Stories are where we check how a component looks. They live in `src/stories/`.

Add a story for each new component, with enough args or variants to show its main states.

## Component tests

Component tests check what a user sees and does: interactions, keyboard and focus behavior, form and modal behavior,
loading and error states, and accessible roles and names.

- Query the way a user finds things, with `getByRole`, `getByLabelText`, and `getByText`. Avoid test IDs and class
  names.
- Drive interactions with `userEvent` rather than calling handlers directly.
- Avoid tests that only check that a component renders, or that repeat its implementation.

Examples:

- `src/components/DialogBox/DialogBox.test.tsx` checks the dialog role and name, focus trapping, and focus restoring
  when the dialog closes.
- `src/components/MultiSelect/MultiSelect.test.tsx` checks that clicking options and pills calls the right handlers.

## Unit tests

- Exported functions that contain logic should have unit tests. Cover the edge cases, not just the happy path.
- Functions that mostly pass through to a third-party library usually don't need tests.
- Hooks with real logic can be tested with `renderHook`, as in `src/hooks/useXr.test.tsx`.

Examples:

- `src/utils/text.test.ts` and `src/utils/date.test.ts` cover string and date helpers.
- `src/components/table/sort.test.ts` covers table sorting.
- `src/components/TimelineSliderV2/layout.test.ts` covers layout math pulled out of a component so it can be tested on
  its own.
- `src/utils/color.ts` just calls an external library so doesn't really need tests

If a component has non-trivial logic (math, state machines, parsing), consider moving it into a plain function and
unit testing that. It's usually easier than testing it through the rendered component.
