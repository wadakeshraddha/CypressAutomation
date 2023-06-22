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
        cy.contains("CSV").click();
        
        //parsing CSV file
        //This is hardcoded path 
        //cy.readFile("C:\Users\shraddhaw\CypressAutomation\cypress\downloads\order-invoice_shraddha.wadake1812.csv") //convert csv file to text
        //Cypress.config("fileServerFolder")//this give path of project
        
        //dynamic path
        cy.readFile(Cypress.config("fileServerFolder")+"/cypress/downloads/order-invoice_shraddha.wadake1812.csv").then(async (text)=>
        {
            const csv = await neatCSV(text) //neatCSV methos will convert csv file to js object
            console.log(csv)
            const actualProductCsv = csv[0]["Product Name"]
            expect(productName).to.equal(actualProductCsv)
        }) //convert csv file to text

    })
})