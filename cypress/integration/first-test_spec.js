describe('Our Url ', function() {
  it('opens', function() {
    cy.visit('http://localhost:8080/');
    cy.contains('Javascript').click();
    cy.url().should('include', '/javascript');
    cy.contains('Simple Add').click();
    cy.url().should('include', '/simple-add');
    cy.get('.form-check').should('have.length', 4);
    cy.get('.form-check input[value="5"]').click();
    cy.contains('Check Yourself').click();
    cy.contains('Plus Operator Coercion').click();
    cy.url().should('include', '/plus-operator-coercion');
    cy.contains('Plus Operator Coercion');
  });
});
