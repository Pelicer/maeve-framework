describe("Accessing plus scrolling", () => {
  const scrollAndWait = (scrollTo, wait = 1000) => {
    cy.scrollTo(0, scrollTo, { ensureScrollable: false });
    cy.wait(wait);
  };

  beforeEach(() => {
    cy.visit("https://landing-example-seven.vercel.app", { timeout: 10000 });
  });

  it("It should access one page, scroll around and leave", () => {
    scrollAndWait(500);
    scrollAndWait(0);
    scrollAndWait(1000);
  });
  it("It should access two pages, scroll around and leave", () => {
    scrollAndWait(500);
    scrollAndWait(0);
    scrollAndWait(1000);
    cy.visit("route-examples");
    scrollAndWait(400);
    scrollAndWait(0);
    scrollAndWait(700);
  });
  it("It should access three pages, scroll around and leave", () => {
    scrollAndWait(500);
    scrollAndWait(0);
    scrollAndWait(1000);
    cy.visit("route-examples", { timeout: 10000 });
    scrollAndWait(400);
    scrollAndWait(0);
    scrollAndWait(700);
    cy.visit("route-examples/1", { timeout: 10000 });
    scrollAndWait(300);
    scrollAndWait(0);
    scrollAndWait(100);
  });
  it("It should access four pages, scroll around and leave", () => {
    scrollAndWait(500);
    scrollAndWait(0);
    scrollAndWait(1000);
    cy.visit("route-examples", { timeout: 10000 });
    scrollAndWait(400);
    scrollAndWait(0);
    scrollAndWait(700);
    cy.visit("route-examples/1", { timeout: 10000 });
    scrollAndWait(300);
    scrollAndWait(0);
    scrollAndWait(100);
    cy.visit("route-examples/valor1/valor2/valor3", { timeout: 10000 });
    scrollAndWait(200);
    scrollAndWait(0);
    scrollAndWait(600);
  });
});

describe("Accessing and clicking around", () => {
  beforeEach(() => {
    cy.visit("https://landing-example-seven.vercel.app", { timeout: 10000 });
  });

  it("It should access one page, click on something and leave", () => {
    cy.contains("Watch 2-Min Demo Video").click();
  });
  it("It should access two pages, click on something and leave", () => {
    cy.contains("Watch 2-Min Demo Video").click();
    cy.visit("route-examples");
    cy.contains("Im a route example without query strings!").click();
  });
  it("It should access three pages, click on something and leave", () => {
    cy.contains("Watch 2-Min Demo Video").click();
    cy.visit("route-examples");
    cy.contains("Im a route example without query strings!").click();
    cy.visit("route-examples/1", { timeout: 10000 });
    cy.contains(
      "Im another example. You searched for a single value: "
    ).click();
  });
  it("It should access four pages, click on something and leave", () => {
    cy.contains("Watch 2-Min Demo Video").click();
    cy.visit("route-examples");
    cy.contains("Im a route example without query strings!").click();
    cy.visit("route-examples/1", { timeout: 10000 });
    cy.contains(
      "Im another example. You searched for a single value: "
    ).click();
    cy.visit("route-examples/valor1/valor2/valor3", { timeout: 10000 });
    cy.contains("valor1").click();
  });
});

describe("Accessing home page and clicking social media", () => {
  beforeEach(() => {
    cy.visit("https://landing-example-seven.vercel.app", { timeout: 10000 });
  });

  it("It should access home page, click facebook and leave", () => {});
  it("It should access home page, click twitter and leave", () => {});
  it("It should access home page, click instagram and leave", () => {});
  it("It should access home page, click linkedin and leave", () => {});
});
