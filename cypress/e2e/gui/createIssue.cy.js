import { faker } from '@faker-js/faker'

const project = {
  title: `project-${faker.datatype.uuid()}`,
  description: faker.random.words(5)
}

const issue = {
  title: faker.random.words(3),
  description: faker.random.words(10),
  dueDate: faker.date.future(1).toLocaleDateString('en-US', 
  {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    
  }).replaceAll('/', '-')
}

describe('Create Issue', () => {
  beforeEach(() => {
    cy.deleteAllProjectsRequest()
    cy.login()
    cy.createProjectRequest(project).then((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.name).to.equal(project.title)
      expect(response.body.description).to.equal(project.description)
    })
  })

  it('Should create a issue successfully', () => {
    cy.createIssue(project.title, issue)

    const issueUrl = `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.title}/issues/1`
    
    cy.url().should('be.equal', issueUrl)
    cy.contains(issue.title).should('be.visible')
    cy.contains(issue.description).should('be.visible')
  })
})