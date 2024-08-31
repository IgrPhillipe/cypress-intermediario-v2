import { faker } from "@faker-js/faker";

const options = { env: { snapshotOnly: true } }

describe("Add Milestone On Issue", () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      title: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5)
    },
  }
  
  const milestone = {
    title: `milestone-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
  }

  beforeEach(() => {
    cy.deleteAllProjectsRequest()
    cy.login()
    cy.createIssueRequest(issue)
      .then(response => {
        cy.createMilestoneRequest(response.body.project, milestone)
        const url = `${Cypress.env('user_name')}/${issue.project.title}/issues/${response.body.iid}`
        cy.visit(url)
      })
  })

  it("Should add a milestone on issue successfully", () => {
    cy.addMilestoneOnIssue(milestone)
    cy.get('.block.milestone').should('contain', milestone.title)
  });
});