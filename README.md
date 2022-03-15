# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Production deploy

```
yarn install --frozen-lockfile
yarn run build:po
yarn run build
```

When the build is complete, serve the files from the `/build` directory using nginx as regular static files.

## Available Scripts

In the project directory, you can run:

### `yarn run watch`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn run watch:po`

Generate typescript-compatible dictionaries from .po files in watch mode

### `yarn run watch:storybook`

Runs the storybook in the development mode.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

The page will reload if you make edits.

### `yarn run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run lint`

Run linter.

### `yarn run prettier`

Run prettier. To automatically fix problems in the code, run with the "-w" flag:

```sh
yarn run prettier -w
```

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run build:po`

Generate typescript-compatible dictionaries from .po files

### `yarn run build:storybook`

Build storybook stories as static website.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
