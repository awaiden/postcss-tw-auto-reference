import type { PluginCreator } from "postcss";
import path from "node:path";

export interface Options {
  /**
   * The path to the global CSS file that contains Tailwind's base styles.
   * This file will be automatically referenced in other CSS files that use Tailwind's `@apply` directive.
   * @default 'src/app/global.css'
   */
  globalCssPath?: string;
}

const postcssTailwindAutoReference: PluginCreator<Options> = (opts = {}) => {
  const targetGlobalCss = opts.globalCssPath || "src/app/global.css";

  return {
    postcssPlugin: "postcss-tailwind-auto-reference",
    Once(root, { AtRule }) {
      const file = root.source?.input?.file;

      if (!file || file.endsWith("global.css") || file.endsWith("globals.css")) {
        return;
      }

      let hasApply = false;
      let hasReference = false;

      root.walkAtRules((atRule) => {
        if (atRule.name === "apply") {
          hasApply = true;
        }
        if (
          atRule.name === "reference" ||
          (atRule.name === "import" && atRule.params.includes("tailwindcss"))
        ) {
          hasReference = true;
        }
      });

      if (hasApply && !hasReference) {
        const globalCssPath = path.resolve(process.cwd(), targetGlobalCss);

        let relPath = path.relative(path.dirname(file), globalCssPath).replace(/\\/g, "/");

        if (!relPath.startsWith(".")) {
          relPath = `./${relPath}`;
        }

        root.prepend(
          new AtRule({
            name: "reference",
            params: `"${relPath}"`,
          }),
        );
      }
    },
  };
};

postcssTailwindAutoReference.postcss = true;

export default postcssTailwindAutoReference;
