
/// <reference types="Cypress" />
describe('My First Test Suite', function()
{
    it('My Fist Test Case', function()
    {
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
        cy.get('#alertbtn').click()
        cy.get('[value="Confirm"]').click()
        cy.on('window:alert',(str)=>
        {
            expect(str).to.equal('Hello , share this practice page and share your knowledge')
        })
        cy.on('window:confirm',(str)=>
        {
            expect(str).to.equal('Hello , Are you sure you want to confirm?')
        })

        //to remove target attribute and open link in same window
        cy.get('#opentab').invoke('removeAttr','target').click()
        cy.url().should('include','rahulshettyacademy')
        //cy.go('back')
   }) 
})