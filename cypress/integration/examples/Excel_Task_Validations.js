const { func } = require("assert-plus")
const neatCSV = require('neat-csv')
let productName

describe('JWT Session', function()
{
    it('is logged in through local storage', function()
    {
        cy.LoginAPI().then(function()
        {
            cy.visit("https://rahulshettyacademy.com/client",{
                onBeforeLoad :function(window)
                {
                    window.localStorage.setItem('token',Cypress.env('token'))
                }
            })
        })
        cy.get(".card-body b").eq(1).then(function(ele)
        {
            productName=ele.text();
        })
        cy.get(".card-body button:last-of-type").eq(1).click();
        cy.get("[routerlink*='cart']").click();
        cy.contains("Checkout").click();
        cy.get("[placeholder*='Country']").type("ind")
        cy.get(".ta-results button").each(($el,index,$list)=>
        {
            if($el.text()===" India")
            {
                cy.wrap($el).click()
            }
        })
        cy.get(".action__submit").should("be.visible").click();
        cy.wait(2000)
        cy.get(".order-summary button").contains("Excel").click();
             
        const filePath = Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_shraddha.wadake1812.xlsx"
        cy.task('excelToJsonConverter',filePath).then(function(result)
        {
            cy.log(result);
            cy.log(result.data[1].A)
            expect(productName).to.equal(result.data[1].B)
        })
        cy.readFile(filePath).then(function(text)
        {
            expect(text).to.include(productName);
        })
    })
})