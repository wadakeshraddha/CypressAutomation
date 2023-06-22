class CheckOutPage
{
    checkOutButtonOnCheckoutPage()
    {
        //return cy.get(':nth-child(4) > :nth-child(5) > .btn')
        return cy.contains('Checkout')
    }
    countryTextBoxValue()
    {
        return cy.get('#country')
    }
    coutrySuggestionListValue()
    {
        return cy.get('.suggestions > ul > li > a')
    }
    checkBoxOfTerms()
    {
        return cy.get('#checkbox2')
    }
    purchaseButton()
    {
        return cy.get('input[type="submit"]')
    }
    costOfProducts()
    {
        //cy.get('tr td:nth-child(4) strong').should('be.visible')
        return cy.get('tr td:nth-child(4) strong')
    }
    validateTotalCost()
    {
        return cy.get('h3 strong')

    }
}
export default CheckOutPage;