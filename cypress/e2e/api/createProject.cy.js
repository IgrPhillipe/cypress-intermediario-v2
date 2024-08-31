import { faker } from '@faker-js/faker'

describe('Create Project', () => {
  beforeEach(() => {
    cy.login()
    cy.deleteAllProjectsRequest()
  })
  it('Should create a project successfully', () => {
    const project = {
      title: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    }

    cy.createProjectRequest(project).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.name).to.equal(project.title)
      expect(response.body.description).to.equal(project.description)
    })
  })
})