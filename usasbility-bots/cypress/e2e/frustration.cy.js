describe("T01 - Form filling", () => {
  beforeEach(() => {
    cy.visit("https://landing-example-seven.vercel.app", { timeout: 10000 });
  });

  it("It should access home page, make a mistake and give up", () => {
    cy.get("[name=Name]").type("William");
    cy.get("[name=Subject]").type("Usability bot");
    cy.get("[name=Phone]").type("19999967251");
    cy.get("[name=Message]").type(
      "I'm sending this message from an automated bot"
    );
    cy.contains("Enviar").click();
  });
  it("It should access home page, make several mistakes and give up", () => {
    cy.get("[name=Name]").type("William");
    cy.get("[name=Subject]").type("Usability bot");
    cy.get("[name=Phone]").type("19999967251");
    cy.get("[name=Message]").type(
      "I'm sending this message from an automated bot"
    );
    cy.contains("Enviar").click();
    cy.wait(500);
    cy.get("[name=Email]").type("willpelicer.com");
    cy.contains("Enviar").click();
  });
});
