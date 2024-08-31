describe('Logout', () => {
  it('Should logout successfully', () => {
    cy.login()
    cy.logout()
    cy.get('.qa-user-avatar').should('not.exist')
  })
})