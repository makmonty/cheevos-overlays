# Cheevos overlay collection

A collection of overlays to be used on your [Retroachievements](https://retroachievements.org/) streams.

![Retroachievements streaming example](docs/images/streaming-example.png)

### Disclaimer

All the requests are exclusively against the Retroachievements API. You can check them in the Network tab of the developer tools of your browser.

## How to use

* Once to open the app, you'll see a login form. Login using your Retroachievements username and Web API Key. You'll find it in [your settings page](https://retroachievements.org/settings) scrolling down a bit.
* After logging in, you'll see the catalog of overlays. Choose one.
* The overlays look like this:

| Progress overlay | Profile overlay |
| ---------------- | --------------- |
| ![Progress overlay](docs/images/overlay-progress.png) | ![Profile overlay](docs/images/overlay-profile.png) |

Don't worry about the pinky background. It'll be gone soon.
* If you use a streaming application such as [OBS](https://obsproject.com), you can add an overlay by adding a new video capture source.
* Select your browser window with the overlay. It's a good idea to detach the tab to an independent window so that you can have a few.
* After configuring the overlay and sizing the window properly, you can do a green-screen-like effect by adding a Green screen filter to the source. This way, all the pink background (or whichever color you select) goes transparent.

## Available overlays

* Game progress
* User profile

## Development

If you'd like to contribute, modify or just run locally the project, you can do so by following these steps:

### Project Setup

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
