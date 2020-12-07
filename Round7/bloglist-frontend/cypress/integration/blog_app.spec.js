/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Touko Lonka',
      username: 'touko',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get('#username')
    cy.get('#password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('touko')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Touko Lonka logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('touko')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Touko Lonka logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'touko', password: 'salainen' })
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('#title').type('Test Blog')
      cy.get('#author').type('Matti Luukkainen')
      cy.get('#url').type('https://www.matti.fi')
      cy.get('#create').click()
      cy.contains('Test Blog')
      cy.contains('Matti Luukkainen')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'Liked Blog', author: 'Matti Luukkainen', url: 'https://www.liked.fi', likes: 0 })
        cy.createBlog({ title: 'Liked Blog 2', author: 'Matti Luukkainen', url: 'https://www.liked.fi', likes: 0 })
        cy.createBlog({ title: 'Liked Blog 3', author: 'Matti Luukkainen', url: 'https://www.liked.fi', likes: 0 })
      })

      it('it can be liked', function () {
        cy.contains('Liked Blog Matti Luukkainen').contains('view').click()
        cy.contains('Liked Blog Matti Luukkainen').parent().find('#like-button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('Likes 1')
      })

      it('it can be removed', function () {
        cy.contains('Liked Blog Matti Luukkainen').contains('view').click()
        cy.contains('Liked Blog Matti Luukkainen').parent().find('#remove-button').as('theButton')
        cy.get('@theButton').click()
        cy.get('html').should('not.contain', 'Liked Blog Matti Luukkainen')
      })
    })

    describe('and likes exist', function () {

      it('Like order correct', function() {

        cy.fixture('testBlogs').then((blogs) => {
          blogs.forEach( blog => cy.createBlog(blog) )
          blogs.forEach( blog => cy.contains(`${blog.title} ${blog.author}`) )
        })

        cy.get('.view-button').each( view => cy.wrap(view).click() )

        cy.get('.like-span').then((blogs) => {
          const ordered = [ ...blogs ].map((blog) =>
            Number(blog.textContent.split(' ')[1])
          )
          for (let i = 0; i < ordered.length; i++) {
            if (i > 0) {
              expect(ordered[i - 1]).to.be.above(ordered[i])
            }
          }
        })
      })
    })
  })
})