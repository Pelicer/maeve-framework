module.exports = {
  parser: "babel-eslint",
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".d.ts", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src"],
      },
    },
  },
};
