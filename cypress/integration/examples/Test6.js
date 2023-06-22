
/// <reference types="Cypress" />
describe('My First Test Suite', function()
{
    it('My Fist Test Case', function()
    {
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
        cy.get('div.mouse-hover-content').invoke('show')//show is jquery method ---cypress does not support mousehover so we are using jquery method
        cy.contains('Top').click()

        //cy.get('div.mouse-hover-content').invoke('show')//show is jquery method ---cypress does not support mousehover so we are using jquery method
        //cy.contains('Top').click({force: true})
        cy.url().should('include','top')
   }) 
})