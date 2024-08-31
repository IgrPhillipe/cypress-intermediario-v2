Cypress.Commands.add('cloneUsingSSH', (project) => {
  const domain = Cypress.config('baseUrl').replace('http://', '')
  
  cy.exec('cd cypress/downloads/')
  cy.exec(`git clone git@${domain}:${Cypress.env('user_name')}/${project.title}.git`)
})