# Web components

This is the web app components package library for the [Terraware](https://terraware.io/) application
from [Terraformation](https://terraformation.com/).

This package primarily provides UI components for reuse in
the [web app repo](https://github.com/terraware/terraware-web).

## About this open-source project

If you're not a Terraformation employee, thanks for checking this repo out!

We're offering this project as Apache-licensed open source in the interest of sharing our technology with the world and
being transparent about our work. Our mission is to accelerate global native forest restoration, and we believe we'll
get there faster by sharing what we do.

For the moment, we're not asking for code contributions from the community. (Check
our [careers page](https://www.terraformation.com/about/careers) if you're itching to work on this code!)

You may see references to some private repositories in the documentation. We're working toward opening more of our code,
but not everything is ready yet.

## Requirements

**Make sure you're using Node 24**

With `nvm`:

```shell
nvm use
```

## Running the app in development mode

### Step 1: Install dependencies

```shell
yarn
```

### Step 2: Running the Storybook

Execute the following commands:

```shell
yarn start
```

## Testing changes out in repos that use `web-components`

You can add a comment to your open pull request with the text "publish rc".

This will publish an RC build to NPM for use in your repo that consumes `web-components` with a tag like `v2.3.58-rc.0`.

## Available Scripts

In the project directory, you can run:

### `yarn test`

Runs the unit tests with [Rstest](https://rstest.rs/). Pass `--watch` to rerun them as files change, or run
`yarn test-coverage` to write a coverage report to `docs/coverage`.

### `yarn build`

Builds the Storybook into the `public` folder.

### `yarn build-dist`

Builds the published package into the `dist` folder with [Rslib](https://rslib.rs/).

## Run Linter

Execute the following commands:

```shell
yarn lint
```

## Generate Style Tokens

Update the `style-dictionary/generate.sh` script to download the tokens json and then run:

```shell
yarn build-dictionary
```

## Strings

Components read their text from the string tables in `src/strings` rather than taking it as props.
Use `useStrings()` in a component, or `getStrings()` in code that can't hold a hook. Applications
pick the language by calling `setLocale('es')` — until they do, everything renders in English.

`src/strings/csv/en.csv` is the only file you edit by hand. The `src/strings/strings-*.ts` tables are
generated from it and aren't checked in, so run this after editing the CSV:

```shell
yarn generate-strings
```

`yarn install` does this for you, which is also how CI gets the tables. If you see TypeScript
complaining that `./strings-en` doesn't exist, that's the step you're missing.

### Translations

Translations are generated with OpenAI, so you need an API key — get one from your OpenAI account
administrator or the [OpenAI console](https://platform.openai.com/api-keys), and put it in `.env` as
`OPENAI_API_KEY`. Then, after editing `en.csv`:

```shell
yarn translate
```

That translates the new or changed strings and regenerates the tables. If you'd rather not do it by
hand each time, `yarn translate:start` watches `en.csv` in the background instead. Editing a
translation directly in `es.csv` or `fr.csv` is fine too; autotranslate only touches strings whose
English text has changed.

## Generating assets from svgs

- Copy svgs to `./assets`
- Run `yarn generate-assets`, see new files under `./src/components/svg` as asset React components
- Integrate new asset React component into `./src/components/Icon/icons/index.tsx` if needed as an icon
