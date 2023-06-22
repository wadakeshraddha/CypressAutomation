import { GITHUB_ACTIONS } from "ci-info";
//import { Given,When,Then } from "cypress-cucumber-preprocessor/steps";
import { Given,When,Then } from "@badeball/cypress-cucumber-preprocessor";
const data = require('../../../../fixtures/example.json');

import HomePage from "../../../pageObjects/HomePAge";
import ProductsPage from "../../../pageObjects/ProductsPage";
import CheckOutPage from "../../../pageObjects/CheckOutPage";
let name;

const homePage = new HomePage()
const prodPage = new ProductsPage()
const checkOutPage = new CheckOutPage()

Given('I open Ecommerce page',()=>
{
    cy.visit(Cypress.env('url') + "/angularpractice/")
})
//When I add items to cart
//And Validate the total prices
//Then select the country submit and verify Thankyou
When('I add items to cart',()=>
{
    const self = this;
    homePage.getShopTab().click()    
    data.productName.forEach(function(element) {
    //console.log("Product is" + element);
    cy.log("Product is" + element)
    cy.selectProduct.call(self,element)
    cy.log("selected is " + element)
    });
})
Then('Validate the total prices',()=>
{
    prodPage.checkOutButton().click()
        var sum=0
        checkOutPage.costOfProducts().each(($el, index, $list) => {
            const costElement = $el.text()
            var result = costElement.split(" ")
            result = result[1].trim()
            sum=Number(sum)+Number(result)
            
        }).then(function(){
            cy.log("sum is"+sum)
        })
    /*checkOutPage.validateTotalCost().then(function(element)
    {
        const costElement1 = element.text()
        var result1 = costElement1.split(" ")
        var total = result1[1].trim()
        expect(Number(total)).to.equals(sum)
    })*/
    cy.get('h3 strong').then(function(element)
    {
        const costElement1 = element.text()
        var result1 = costElement1.split(" ")
        var total = result1[1].trim()
        expect(Number(total)).to.equal(sum)
    })
})
Then('select the country submit and verify Thankyou',()=>
{
        checkOutPage.checkOutButtonOnCheckoutPage().click()
        checkOutPage.countryTextBoxValue().type('India')
        cy.wait(8000)
        //Cypress.config('defaultCommandTimeout',8000)
        checkOutPage.coutrySuggestionListValue().click()
        checkOutPage.checkBoxOfTerms().click({force : true})
        checkOutPage.purchaseButton().click()
        //cy.get('.alert').should('have.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
        cy.get('.alert').then(function(element)
        {
            const actualText = element.text()
            expect(actualText.includes("Success")).to.be.true
   }) 
})


/*Given I open Ecommerce page
    When I fill the form details
    Then Validate the forms behavior
    And Select the shop page*/
/*    //This below when is using data from fixtures/example.json
When('I fill the form details',function()
{
    homePage.getEditBox().type(this.data.name)
    homePage.getGender().select(this.data.gender)
})*/ 
// This below when is using data from feature file and that table is called dataTable
When('I fill the form details',function(dataTable)
{
    name = dataTable.rawTable[1][0]
    homePage.getEditBox().type(dataTable.rawTable[1][0])
    homePage.getGender().select(dataTable.rawTable[1][1])
})
Then('Validate the forms behavior',function()
{
    homePage.getTwoWayDataBinding().should('have.value',name)//use this when dataTable is used for above case with dataTable
    //homePage.getTwoWayDataBinding().should('have.value',this.data.name) //use this when fixture/example.json is used
    homePage.getEditBox().should('have.attr','minlength',2)
    homePage.getEntrepreneur().should('be.disabled')
    Cypress.config('defaultCommandTimeout',8000)
})
Then('Select the shop page',()=>
{
    homePage.getShopTab().click()
})