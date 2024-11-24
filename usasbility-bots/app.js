const schedule = require("node-schedule");
const cypress = require("cypress");

schedule.scheduleJob("*/1 * * * *", function () {
  cypress.run();
});

cypress.run({
  baseUrl: "https://landing-example-seven.vercel.app",
  reporter: "junit",
  browser: "edge",
  headed: true,
  supportFile: false,
  video: false,
});
