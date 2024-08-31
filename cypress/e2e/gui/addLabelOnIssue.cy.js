import { faker } from "@faker-js/faker";

describe("Add Label On Issue", () => {
  const issue = {
    title: `issue-${faker.datatype.uuid()}`,
    description: faker.random.words(3),
    project: {
      title: `project-${faker.datatype.uuid()}`,
      description: faker.random.words(5),
    }
  };

  const label = {
    name: `label-${faker.datatype.uuid()}`,
    color: faker.internet.color(),
  };

  beforeEach(() => {
    cy.deleteAllProjectsRequest()
    cy.login()
    cy.createIssueRequest(issue)
      .then(response => {
        const url = `${Cypress.env('user_name')}/${issue.project.title}/issues/${response.body.iid}`

        cy.createLabelRequest(response.body.project_id, label)
        cy.visit(url)
      })
  })

  it("Should add a label on issue successfully", () => {
    cy.selectLabel(label)
    cy.get('.qa-labels-block').should('contain', label.name)
    cy.get('.qa-labels-block span')
      .should('have.attr', 'style', `background-color: ${label.color}; color: #FFFFFF;`)
  });
});