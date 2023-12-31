/// <reference types="Cypress" />
describe('My First Test Suite', function()
{
    it('My Fist Test Case', function()
    {
        cy.visit('https://www.rahulshettyacademy.com/AutomationPractice/')
        //checkbox
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value','option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2','option3'])

        //static dropdowns
        cy.get('select').select('option2').should('have.value','option2')

        //dynamic dropdown
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if($el.text()==="India")
            {
                cy.wrap($el).click()
            }
        })
        //autocomplete
        cy.get('#autocomplete').should('have.value','India')

    })
})