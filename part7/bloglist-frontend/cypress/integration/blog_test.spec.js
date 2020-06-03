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

      cy.request('POST', 'http://localhost:3003/api/users', {
        username: 'tboi',
        name: 'boi',
        password: 'lollolxd',
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

    describe('When logged in', function () {
      beforeEach(function () {
        cy.loginUser({ username: 'iobt', password: 'hehexd' });
      });

      it('a new blog can be created', function () {
        cy.contains('create new blog').click();

        cy.get('input#title').type('How to git gud');
        cy.get('input#author').type('Git Gud');
        cy.get('input#url').type('http://gettinggood.com');
        cy.get('[data-cy=createblog-submit]').click();

        cy.get('.blogDiv').should('contain', 'How to git gud');
      });

      describe('and there is an existing blog', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'How to git gud',
            author: 'Git Gud',
            url: 'http://gettinggood.com',
          });
        });

        it('a user can like the blog', function () {
          cy.get('[data-cy=blog-view]').click();
          cy.contains('likes').should('contain', '0');
          cy.get('[data-cy=blog-likes-button]').click();
          cy.contains('likes').should('contain', '1');
        });

        it('the user who created the blog can delete it', function () {
          cy.get('[data-cy=blog-view]').click();
          cy.get('[data-cy=blog-remove]').click();

          cy.get('.blogDiv')
            .should('not.contain', 'How to git gud')
            .and('not.exist');
        });

        it('a user who did not create the blog cannot delete it', function () {
          cy.get('[data-cy=user-logout]').click();
          cy.loginUser({ username: 'tboi', password: 'lollolxd' });

          cy.get('[data-cy=blog-view]').click();
          cy.get('[data-cy=blog-remove]').click();

          cy.get('.blogDiv').should('contain', 'How to git gud').and('exist');
        });
      });

      describe('and there are multiple existing blogs', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'How to git gud',
            author: 'Git Gud',
            url: 'http://gettinggood.com',
            likes: 100,
          });

          cy.createBlog({
            title: 'Software Architecture',
            author: 'Martin Fowler',
            url: 'http://softwarearchitecture.com',
            likes: 59,
          });

          cy.createBlog({
            title: 'Software Engineering',
            author: 'Martin Fowler',
            url: 'http://softwareengineering.com',
            likes: 68,
          });

          cy.get('[data-cy=blog-view]').click({ multiple: true });
        });

        it('the blogs are sorted by likes', function () {
          cy.get('.blogDiv')
            .eq(0)
            .should('contain', 'likes 100')
            .and('contain', 'How to git gud');

          cy.get('.blogDiv')
            .eq(1)
            .should('contain', 'likes 68')
            .and('contain', 'Software Engineering');
        });
      });
    });
  });
});
