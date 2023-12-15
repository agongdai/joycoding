describe('Navigation', () => {
  it('should navigate to the bookmarks page', () => {
    // Start from the index page
    cy.visit('/');

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="bookmarks"]').click();

    // The new url should include "/about"
    cy.url().should('include', '/bookmarks');

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('Bookmarks');
  });
});
