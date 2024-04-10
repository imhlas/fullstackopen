describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'SALAISUUS'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('SALAISUUS')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged-in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'SALAISUUS' })
    })

    it('a new blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('https://www.cypress.io/')
      cy.get('#create-button').click()

      cy.contains('a blog created by cypress Test Author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog cypress',
          author: 'Test Author',
          url: 'https://www.cypress.io/'
         })
      })

      it('it can be liked', function () {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('it can be deleted by the user who created it' , function () {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.contains('another blog cypress').should('not.exist')
      })

      it('it cannot be deleted by another user', function () {
        const user = {
          name: 'Another User',
          username: 'another',
          password: 'SALAISUUS'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)

        cy.contains('logout').click()
        cy.login({ username: 'another', password: 'SALAISUUS' })

        cy.contains('view').click()
        cy.contains('remove').should('not.exist')
      })
   })

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog cypress',
          author: 'Test Author',
          url: 'https://www.cypress.io/'
        })
        cy.createBlog({
          title: 'second blog cypress',
          author: 'Test Author',
          url: 'https://www.cypress.io/'
        })
        cy.createBlog({
          title: 'third blog cypress',
          author: 'Test Author',
          url: 'https://www.cypress.io/'
        })
      })

      it('they are ordered by likes', function () {
        cy.contains('second blog cypress').contains('view').click()
        cy.contains('second blog cypress').parent().find('#like-button').as('theLikeButton')
        cy.get('@theLikeButton').click()
        cy.get('@theLikeButton').click()
        cy.get('@theLikeButton').click()
        cy.get('@theLikeButton').click()

        cy.contains('third blog cypress').contains('view').click()
        cy.contains('third blog cypress').parent().find('#like-button').as('theLikeButton')
        cy.get('@theLikeButton').click()
        cy.get('@theLikeButton').click()

        cy.get('.blog').then(blogs => {
          cy.wrap(blogs[0]).contains('second blog cypress')
          cy.wrap(blogs[1]).contains('third blog cypress')
          cy.wrap(blogs[2]).contains('first blog cypress')
        })
      })
    })
  })
})
