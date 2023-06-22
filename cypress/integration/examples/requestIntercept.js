/// <reference types="Cypress" />
describe('My First Test Suite', function()
{
    it('My Fist Test Case', function()
    {
          cy.visit('https://rahulshettyacademy.com/angularAppdemo/')
          cy.intercept('GET','https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',(req)=>
          {     
            req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"
            req.continue((res)=>
            {
              //expect(res.statusCode).to.eql(403)
            })
          }).as("dummyUrl")
          cy.get('.btn-primary').click()
          cy.wait('@dummyUrl')
    })
})