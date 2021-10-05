const convert = require('color-convert');
const utils = require('../utils/utils');
Feature('css_check');
//Arrange

Scenario('Verify css is applied to DOM elements', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/index.html');
    
    const scripts = await I.grabAttributeFromAll(locate('//head').find('script'),'src');
    await scripts.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            allocations = utils.getAllocations();
        }
    });
    
    const links = await I.grabAttributeFromAll(locate('//head').find('link'),'href');
   
    await links.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            cssAsset = element;
        }
    });
    if(!cssAsset){
    
        throw new Error('links does not contain evolv assets');  
    }

    const locator = await utils.getCssLocator(cssAsset);
    const css = await utils.getCssAttribute(cssAsset);
   
    //Assert
    await locator.forEach(async element => {
        I.waitForElement(element);
        let cssAttr = await I.grabCssPropertyFrom(element, css[locator.indexOf(element)].attr);
        I.assertContain(cssAttr, convert.keyword.rgb(css[locator.indexOf(element)].value).join(', ').toString());
    });
});
