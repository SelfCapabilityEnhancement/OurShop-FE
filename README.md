# Ourshop structure

- vite
- react
- tailwindcss
- jest
- axios

## vite + react + jest

[learn more](https://egghead.io/lessons/jest-adding-jest-with-typescript-support-to-a-vite-application)

- add config of jest and use babel to transform ts,react

- `jest` runs our tests
- `@testing-library/react` adds the ability to render react components inside of our test environment
- `@testing-library/jest-dom` allows us to assert that components are in the DOM and contains certain text and classes
- `@testing-library/user-event` allows us to interact with rendered components programmatically
- `@babel/preset-react @babel/preset-typescript @babel/preset-env` allow us to use ES6 Modules, typescript, JSX in our tests
- `identity-obj-proxy` is helpful when rendering CSS modules so that we can see the original class names instead of obfuscated ones

## issue for can't load images after deployment(two solutions)

- put images to public directory
- import image url

## issue for not found page after deployment

- React Router it handles all the routes but when you directly goto an endpoint, netlify must know where to redirect you. That is what we are specifying in the netlify.toml file.

## issue that 3rd party modules can't be recognized by jest

- they are published as untranspiled code, so need transform them via `babel-jest`

## issue for CORS

- proxy server request data with real server and browser just interact with the proxy server
