# Calendar converter

A simple npm package for converting calendars between different formats. The project is not meant to be used in production, but rather as an example of how to split code into modules and how to create packages on Haaga-Helia programming courses.

You can find the published package on https://www.npmjs.com/package/@ohjelmistokehitys/calendar-converter and the source code on https://github.com/ohjelmistokehitys/calendar-converter.


## Source code

The best way to understand the contents of the package is to take a look at the `converter.ts` file, which contains the "production code", as well as the `converter.test.ts` file, which contains unit tests.


## How to use this package

You can install this package in your project with:

```bash
npm install @ohjelmistokehitys/calendar-converter
```

Then, you can use the package in your code like this:

```ts
import convertToICalendar from './converter';

// ... testCalendar is an object of type Calendar (see type declarations)
const iCal: string = convertToICalendar(testCalendar);
```

## How to build this package

As this package is written in TypeScript, you need to compile it to JavaScript before you can use it. The compiled JS files will be generated in the `dist` folder, which is included in the package with the `files` field in `package.json`. Test files are excluded from compilation and therefore from the package with the `tsconfig.json` file.

```bash
# Install dependencies
npm install

# Run tests
npm test

# Compile the JavaScript files
npm run build

# Create the package (for local testing)
npm pack
```

Finally, when you have tested the package locally and verified that it only contains the files you want, you can publish it to npm with:

```bash
npm publish --access public
```

Publishing the package requires an npm account and that you are logged in with the cli tool. You also need permissions to publish the package with the given name, so you might want to change the package name in `package.json` to something unique to you.
