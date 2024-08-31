import { faker } from '@faker-js/faker'

describe('Create Issue', () => {
  beforeEach(() => {
    cy.login()
    cy.deleteAllProjectsRequest()
  })
  it('Should create a project successfully', () => {
    const issue = {
      title: `issue-${faker.datatype.uuid()}`,
      description: faker.random.words(3),
      project: {
        title: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
      }
    }

    cy.createIssueRequest(issue).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.title).to.equal(issue.title)
      expect(response.body.description).to.equal(issue.description)
    })
  })
})