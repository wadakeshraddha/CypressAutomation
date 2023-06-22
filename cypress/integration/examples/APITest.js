/// <reference types="Cypress" />
describe('My First Test Suite', function()
{
    it('My Fist Test Case', function()
    {
        cy.request('POST','http://216.10.245.166/Library/Addbook.php',{

        "name":"Learn Appium Automation with Java",
        "isbn":"bcdshr1",
        "aisle":"227",
        "author":"John foe"
        }).then(function(response)
    {
        expect(response.body).to.have.property("Msg","successfully added")
        expect(response.status).to.eq(200)
    })
})
})