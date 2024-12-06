describe("HomePage Component", () => {
    beforeEach(() => {
      // Visit the page before each test
      cy.visit("http://localhost:3000/");
    });
  
    it("should render the page with correct background images", () => {
      // Check the main background image
      cy.get("div")
        .should("have.class", "absolute")
        .and("have.css", "background-image")
        .and("include", "background.jpg");
  
      // Check the section background image
      cy.get("div")
        .should("have.class", "relative")
        .and("have.css", "background-image")
        .and("include", "BGHome.jpg");
    });
  
    it("should display the rotating phrases", () => {
      const phrases = [
        "Island Wide Delivery",
        "Fast & Reliable Service",
        "Nationwide Coverage",
        "Connecting Every Corner",
        "Your Trusted Delivery Partner",
      ];
  
      phrases.forEach((phrase, index) => {
        cy.contains(phrase).should("be.visible");
        if (index < phrases.length - 1) {
          cy.wait(3000); // Wait for the phrase rotation duration
        }
      });
    });
  
    it("should render the 'Our Services' section with all cards", () => {
      // Check for section title
      cy.contains("Our Services").should("be.visible");
  
      // Check for service cards
      const services = ["Laptop Sale", "Laptop Repair", "Software Installation"];
      services.forEach((service) => {
        cy.contains(service).should("be.visible");
      });
    });
  
    it("should allow horizontal scrolling in the 'Our Services' section", () => {
      // Check the scroll container
      cy.get("div.flex.overflow-x-auto").scrollTo("right");
    });
  
    it("should animate the service cards on hover", () => {
      cy.get("div.min-w-[100px]").each(($card) => {
        cy.wrap($card).trigger("mouseover");
        cy.wrap($card).should("have.css", "transform").and("not.equal", "none");
      });
    });
  
    it("should display the header bar fixed at the top", () => {
      cy.get("div.fixed").should("be.visible").and("have.css", "top", "0px");
    });
  
    it("should render 'ShowLaptop' and 'AboutandContact' components", () => {
      cy.get("div").contains("ShowLaptop").should("exist"); // Adjust selector based on actual content
      cy.get("div").contains("AboutandContact").should("exist");
    });
  });
  