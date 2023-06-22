
/// <reference types="Cypress" />
describe('My First Test Suite', function()
{
    it('My Fist Test Case', function()
    {
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
        //cy.wait(500)
        //Hide or show text box

        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('#displayed-text').should('be.visible')

        //radio buttons
        cy.get('[value=radio2]').check()//.should('be.checked')


    })
})