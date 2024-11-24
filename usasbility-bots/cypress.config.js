const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://landing-example-seven.vercel.app",
    reporter: "junit",
    browser: "edge",
    headed: true,
    supportFile: false,
    video: false,
  },
});
