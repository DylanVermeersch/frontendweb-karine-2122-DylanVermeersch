describe('test if application is running', () => {
    it('should run the application', () => {
        cy.visit('http://localhost:3000/');

        cy.get('[data-cy=loading_screen]').should('be.visible');
        cy.get('[data-cy=location]', { timeout: 10000 }).should('be.visible');
        cy.get('[data-cy=loading_screen]').should('not.exist');
    });
});

describe('test if we can search for a location', () => {
    it('should show Brussels', () => {
        cy.visit('http://localhost:3000/');

        cy.get('[data-cy=search_input]').type('brussels');
        cy.get('[data-cy=search_btn]').click();
        cy.get('[data-cy=location]', { timeout: 10000 }).contains('Brussels, BE');
    });

    it('should search location via top button', () => {
        cy.visit('http://localhost:3000/');

        cy.get('[data-cy=top_btn]').eq(0).click();
        cy.get('[data-cy=location]', { timeout: 10000 }).contains('New York, US');
    });

    it('should return to ghent after faulty input', () => {
        cy.visit('http://localhost:3000/');

        cy.get('[data-cy=top_btn]').eq(0).click();
        cy.get('[data-cy=search_input]').type('faulty name');
        cy.get('[data-cy=search_btn]').click();
        cy.get('[data-cy=location]', { timeout: 10000 }).contains('Ghent, BE');
    });

    it('should return current location (Destelbergen)', () => {
        cy.visit('http://localhost:3000/');
        
        cy.get('[data-cy=search_current_location]').click();
        cy.get('[data-cy=location]', { timeout: 10000 }).contains('Destelbergen, BE');
    });
});