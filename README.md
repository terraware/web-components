# Web components

This is the web app components package library for the [Terraware](https://terraware.io/) application from [Terraformation](https://terraformation.com/).

This package primarily provides UI components for reuse in the [web app repo](https://github.com/terraware/terraware-web).

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## About this open-source project

If you're not a Terraformation employee, thanks for checking this repo out!

We're offering this project as Apache-licensed open source in the interest of sharing our technology with the world and being transparent about our work. Our mission is to accelerate global native forest restoration, and we believe we'll get there faster by sharing what we do.

For the moment, we're not asking for code contributions from the community. (Check our [careers page](https://www.terraformation.com/about/careers) if you're itching to work on this code!)

You may see references to some private repositories in the documentation. We're working toward opening more of our code, but not everything is ready yet.

## Requirements
**Make sure you're using Node 16**

With `nvm`
```
nvm use
```

## Running the app in development mode

### Step 1: Install dependencies

```
yarn
```

### Step 2: Running the Storybook

Execute the following commands:

```shell
yarn start
```

## Available Scripts

In the project directory, you can run:

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Run Linter

Execute the following commands:

```shell
yarn lint
```

## Generate Style Tokens

Update the `style-dictionary/generate.sh` script to download the tokens json and then run

```
yarn build-dictionary
```

## Generating assets from svgs

Copy svgs to `./assets`.
Run `yarn generate-assets`, see new files under `./src/components/svg` as asset React components.
Integrate new asset React component into `./src/components/Icon/icons/index.tsx` if needed as an icon;


## Common issues
**Wrong Node version**

You might see an error like this when running Storybook
```
Error: error:0308010C:digital envelope routines::unsupported
storybook/preview.js undefined
```

This means you are on a version of Node > 16. 
Set your Node version to 16, re-install dependencies, and try `yarn start` again.
See https://stackoverflow.com/a/69699772 for more info.
