const accessToken = `Bearer ${Cypress.env('gitlab_access_token')}`

Cypress.Commands.add('createProjectRequest', (project) => {
  console.log(project)
  cy.request({
    method: 'POST',
    url: '/api/v4/projects/',
    headers: { Authorization: accessToken },
    body: {
      name: project.title,
      description: project.description,
      initialize_with_readme: true
    }
  })
})

Cypress.Commands.add('deleteProjectRequest', (projectId) => {
  cy.request({
    method: 'DELETE',
    url: `/api/v4/projects/${projectId}`,
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('getAllProjectsRequest', () => {
  cy.request({
    method: 'GET',
    url: '/api/v4/projects/',
    headers: { Authorization: accessToken }
  })
})

Cypress.Commands.add('deleteAllProjectsRequest', () => {
  cy.getAllProjectsRequest().then((response) => {
    response.body.forEach((project) => {
      cy.deleteProjectRequest(project.id)
    })
  })
})

Cypress.Commands.add('createIssueRequest', (issue) => {
  cy.createProjectRequest(issue.project).then((response) => {
    cy.request({
      method: 'POST',
      url: `/api/v4/projects/${response.body.id}/issues`,
      headers: { Authorization: accessToken },
      body: {
        title: issue.title,
        description: issue.description,
      }
    })
  })
})

Cypress.Commands.add('createLabelRequest', (projectId, label) => {
  cy.request({
    method: 'POST',
    url: `/api/v4/projects/${projectId}/labels`,
    headers: { Authorization: accessToken },
    body: {
      name: label.name,
      color: label.color
    },
  })
})

Cypress.Commands.add('createMilestoneRequest', (projectId, milestone) => {
    cy.request({
      method: 'POST',
      url: `/api/v4/projects/${projectId}/milestones`,
      headers: { Authorization: accessToken },
      body: {
        title: milestone.title,
        description: milestone.description,
      }
    })
})