# postcss-tw-auto-reference

A PostCSS plugin that automatically adds the `@reference` directive to CSS files that use Tailwind CSS `@apply`.

## Installation

```bash
# npm
npm install -D postcss-tw-auto-reference

# pnpm
pnpm add -D postcss-tw-auto-reference

# bun
bun add -d postcss-tw-auto-reference
```

## Usage

Add `postcss-tw-auto-reference` to your PostCSS configuration (e.g. `postcss.config.js` or `postcss.config.mjs`):

```js
export default {
  plugins: {
    "postcss-tw-auto-reference": {
      // Path to your global CSS file containing Tailwind's base styles
      // Default: 'src/app/global.css'
      globalCssPath: "src/app/global.css",
    },
  },
};
```

## Options

| Option          | Type     | Default                | Description                                                            |
| --------------- | -------- | ---------------------- | ---------------------------------------------------------------------- |
| `globalCssPath` | `string` | `'src/app/global.css'` | Relative path to the global CSS file with Tailwind imports/directives. |

## Author

- **Halil Aydın** ([@awaiden](https://github.com/awaiden))

## License

[MIT](./LICENSE)
