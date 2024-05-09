describe('First Homepage Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    cy.contains('Work Experience')
  })

  it('Has experience-articles loaded', () => {
    cy.visit('/')

  })
})
