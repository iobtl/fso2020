describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');

    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('log in').click();

    cy.contains('log in to application')
      .parent()
      .should('have', '[data-cy=login-form]');
  });

  describe('Logging in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'iobt',
        name: 'Tedmund',
        password: 'hehexd',
      });

      cy.visit('http://localhost:3000');
    });

    it('succeeds with correct credentials', function () {
      cy.contains('log in').click();
      cy.get('[data-cy=login-username]').type('iobt');
      cy.get('[data-cy=login-password]').type('hehexd');
      cy.contains('login').click();

      cy.get('.notification').should(
        'contain',
        'user Tedmund has successfully logged in'
      );
    });

    it('fails with incorrect credentials', function () {
      cy.contains('log in').click();
      cy.get('[data-cy=login-username]').type('iobt');
      cy.get('[data-cy=login-password]').type('dahwio');
      cy.contains('login').click();

      cy.get('.notification').should('contain', 'invalid username or password');
    });

    it('can successfully make a login request', function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'iobt',
        password: 'hehexd',
      }).then((response) => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
      });
    });
  });
});
