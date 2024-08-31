import { faker } from '@faker-js/faker'

describe('Create Project', () => {
  beforeEach(() => {
    cy.deleteAllProjectsRequest()
    cy.login()
  })

  it('Should create a project successfully', () => {
    const project = {
      title: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    const projectUrl = `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.title}`
    cy.createProject(project)
    cy.url().should('be.equal', projectUrl)
    cy.contains(project.title).should('be.visible')
    cy.contains(project.description).should('be.visible')
  })
})