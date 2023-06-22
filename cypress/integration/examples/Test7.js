
/// <reference types="Cypress" />
describe('My First Test Suite', function()
{
    it('My Fist Test Case', function()
    {
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
        cy.get('#opentab').then(function(el)
        {
            const url=el.prop('href')
            cy.visit(url)
            //visit accepts only same superdomain but it will not visit another domain url
        })
   }) 
})