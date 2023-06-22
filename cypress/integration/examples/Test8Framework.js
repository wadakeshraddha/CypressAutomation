
/// <reference types="Cypress" />
import { home } from "ospath"
import HomePage from "../pageObjects/HomePAge"
import ProductsPage from "../pageObjects/ProductsPage"
import CheckOutPage from "../pageObjects/CheckOutPage"
//import cypressConfig from "../../../cypress.config"


describe('My First Test Suite', function()
{
    before(function(){
        cy.fixture('example').then(function(data)
            {
                this.data=data
                //global variable = local variable... with this we make data as global variable
            })
    })

    it('My Fist Test Case', function()
    {
        const homePage = new HomePage()
        const prodPage = new ProductsPage()
        const checkOutPage = new CheckOutPage()

        //cy.visit('https://www.rahulshettyacademy.com/angularpractice/')
        cy.visit(Cypress.env('url') + "/angularpractice/")
        homePage.getEditBox().type(this.data.name)
        homePage.getGender().select(this.data.gender)
        homePage.getTwoWayDataBinding().should('have.value',this.data.name)
        homePage.getEditBox().should('have.attr','minlength',2)
        homePage.getEntrepreneur().should('be.disabled')
        Cypress.config('defaultCommandTimeout',8000)
        homePage.getShopTab().click()
                   

        this.data.productName.forEach(function(element) {
            console.log(element);
            cy.selectProduct(element)
        });
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
})