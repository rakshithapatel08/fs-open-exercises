import globals from "globals";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  {
    languageOptions: {
      globals: {        
        node: true,      
        browser: true,
        commonjs: true,
        es2021: true,
      },
    },
    ignores: ["dist"],  
    rules: {
      indent: ["error", 2],
      "linebreak-style": 0,
      quotes: ["error", "double"],
      semi: ["error", "always"],
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": 0,
    },
  },
 
];
