Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  {cacheSession = true} = {}
) => {
  const login = () => {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = () => {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  if (cacheSession) {
    return cy.session(user, login, options)
  }
  
  login()
})

Cypress.Commands.add('logout', () => {
  const logout = () => {
    cy.visit('/')
    cy.get('.header-user-dropdown-toggle').click()
    cy.get("[data-qa-selector='sign_out_link']").click()
  }

  logout()
})

Cypress.Commands.add('createProject', (project) => {
  const createProject = () => {
    cy.visit('/projects/new')
    cy.get('#project_name').type(project.title)
    cy.get('#project_description').type(project.description)
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()
  }

  createProject()
})

Cypress.Commands.add('createIssue', (projectId, issue) => {
  const createIssue = () => {
    cy.visit(`/${Cypress.env('user_name')}/${projectId}/issues/new`)
    cy.get('#issue_title').type(issue.title)
    cy.get('#issue_description').type(issue.description)
    cy.get('#issuable-due-date').type(issue.dueDate)
    cy.contains('Submit issue').click()
  }

  createIssue()
})

Cypress.Commands.add('selectLabel', (label) => {
  const selectLabel = () => {
    cy.get('.qa-edit-link-labels').click()
    cy.contains(label.name).click()
    cy.get('body').click()
  }

  selectLabel()
})

Cypress.Commands.add('selectMilestone', (milestone) => {
  const selectMilestone = () => {
    cy.get('.block.milestone .edit-link').click()
    cy.contains(milestone.title).click()
  }

  selectMilestone()
})