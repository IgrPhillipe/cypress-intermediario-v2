import { faker } from '@faker-js/faker'

describe('Git clone', () => {
  const project = {
    title: `project-${faker.datatype.uuid()}`,
    description: faker.random.words(5)
  }

  beforeEach(() => {
    cy.login()
    cy.deleteAllProjectsRequest()
    cy.createProjectRequest(project)
  })

  it('Successfully git clone a project', () => {
    cy.cloneUsingSSH(project)

    cy.readFile(`cypress/downloads/${project.title}/README.md`)
      .should('contain', `# ${project.title}`)
      .and('contain', project.description)
  })
})