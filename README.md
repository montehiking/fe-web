# MonteHiking

This app helps you find interesting hiking locations.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Infrastructure

- staging: TODO
- production: [map.neruchev.com](https://map.neruchev.com)

## Pre requirements

- `node.js`: `14.*`
- `yarn`: `1.22.*`
- `tmux`: `*` (optional, for local launch)

## Development

1. install `node`, `yarn`, `tmux`

```sh
# tmux
brew install tmux
```

2. (optional) run `chmod 0755 ./tmux.sh`

3. run `yarn install` on repository root.

4. run `./tmux.sh` **OR** run parallel:

```sh
yarn run watch:po
```

```sh
yarn run watch:storybook
```

```sh
yarn run watch
```

## Production

Just merge the changes into the `main` branch.

### Manual deploy

1. run `yarn install --frozen-lockfile` on repository root.
2. run `yarn run deploy`

When the build completes, the app will be published to Github Pages.

## Available Scripts

In the project directory, you can run:

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run build:po`

Generate typescript-compatible dictionaries from .po files.

### `yarn run build:storybook`

Build storybook stories as static website.

### `yarn run deploy`

Publish the production bundle to Github Pages.

### `yarn run watch`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn run watch:po`

Generate typescript-compatible dictionaries from .po files in watch mode.

### `yarn run watch:storybook`

Runs the storybook in the development mode.\
Open [http://localhost:6006](http://localhost:6006) to view it in the browser.

The page will reload if you make edits.

### `yarn run prettier`

Run prettier.\
See the [documentation](https://prettier.io/docs/en/cli.html) for the `prettier` package for details.

### `yarn run lint`

Run eslint.

### `yarn run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
