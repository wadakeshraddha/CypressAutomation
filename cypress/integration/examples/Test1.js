/// <reference types="Cypress" />
describe('My First Test Suite', function()
{
    it('My Fist Test Case', function()
    {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.get('.search-keyword').type('ca')
        cy.wait(500)
        //cy.get('.product').should('have.length',4)
        cy.get('.product:visible').should('have.length',4)
        //parent child chaining
        cy.get('.products').as('productLocator')
        cy.get('@productLocator').find('.product').should('have.length',4)
        //click on ADD TO CART on second product
        cy.get(':nth-child(3) > .product-action > button').click()
        cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click()

        //dynamically click on product and add to cart
        cy.get('.products').find('.product').each(($el, index, $list) => {
            // $el is a wrapped jQuery element
            const textVeg = $el.find('h4.product-name').text()
            if(textVeg.includes('Cashews'))
            {
                cy.wrap($el).find('Button').click()
            }
          })

        //assert if logo text is correctly displayed
        cy.get('.brand').should('have.text','GREENKART')

        cy.get('.brand').then(function(logoelement)
        {
            cy.log(logoelement.text())
        }
        )
        //const logo=cy.get('.brand')
    })
})