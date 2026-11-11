# Coding Agent Instructions

## Build/Test Commands

- Build Storybook: `yarn build`
- Run Storybook: `yarn start`
- Format code: `yarn format`
- Run all unit tests: `yarn test`
- Typescript check: `yarn ts`
- Run linter: `yarn lint`

## Code Style Guidelines

- Use the conventions in .prettierrc or run the format command after changes.
- Avoid adding comments that say obvious things about what the code does.
- Prefer const-assigned arrow functions over function declarations.
- Prefer imperative present tense in commit titles and in the parts of commit bodies that say what is changing.

## Workflow

Check whether the current repo is using Jujutsu (jj) rather than plain git; if so, prefer jj commands for examining
history and checkpointing your work.

Install new dependencies with `yarn` instead of `npm`.

Format the code, run the typescript checker, and run the linter when you're done working. There's no need to rerun tests
after code formatting.

## Internationalization

- Add new strings to `src/strings/csv/en.csv` and run `yarn translate` afterward
- Before adding a string, check whether an existing one already has the same text
- Name strings after their text, not the feature using them, so they can be reused (e.g. `{0} days` should be `X_DAYS`,
  not `<feature-name>_DAYS`). Use feature-specific names only for text that is specific to that feature, such as
  `SPECIES_DENSITY_WARNING_MESSAGE`.

## Pull Requests

PR descriptions should focus on why the change was needed and what changed at a high level. Don't talk about choices
that were considered and ruled out, and don't go into detail about the actual implementation; people can read the code
diff to see low-level details.

We use stacked pull requests for changes of significant size. Stacks should be organized such that merging the first
part of the stack still leaves the code base in a working, deployable state. That is, no PR in a stack can leave the
system nonfunctional.

A stack of PRs should represent a clear, logical sequence of internally-consistent incremental steps that add up to the
desired goal. It is expected for later PRs in a stack to depend on earlier ones. It's also fine for a PR to include
small amounts of temporary code that gets rewritten or removed by later PRs, if that helps the earlier PRs stay
coherent.

When possible, keep each PR in a stack under 350 lines of changes, but only if you can meet the "each PR is a complete
change that leaves the code base in a working state" goal. 350 lines is a maximum, not a minimum; it's fine to split a
change into smaller chunks than that.

If the repo is using jj, you can use jj commands to manage the stack of revisions, including splitting, combining, and
reordering revisions.

Unless specifically requested by a human, once a PR has been created and a human has started reviewing it, don't amend,
squash, or otherwise rewrite its existing commits. Add new commits on top instead, so reviewers can see exactly what
changed in response to their comments.

Only push or submit PRs if the user specifically requests it or if you are running as an automated job specifically
intended to create pull requests; otherwise the user will create the PRs manually.
