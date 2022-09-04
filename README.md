# vite-react-tailwindcss-app

## to do

- scan [typescript refactoring doc](https://code.visualstudio.com/docs/typescript/typescript-refactoring)

## vite + react + jest

[learn more](https://egghead.io/lessons/jest-adding-jest-with-typescript-support-to-a-vite-application)

- add config of jest and use babel to transform ts,react

- `jest` runs our tests
- `@testing-library/react` adds the ability to render react components inside of our test environment
- `@testing-library/jest-dom` allows us to assert that components are in the DOM and contains certain text and classes
- `@testing-library/user-event` allows us to interact with rendered components programmatically
- `@babel/preset-react @babel/preset-typescript @babel/preset-env` allow us to use ES6 Modules, typescript, JSX in our tests
- `identity-obj-proxy` is helpful when rendering CSS modules so that we can see the original class names instead of obfuscated ones

