const convert = require('color-convert');
const utils = require('../utils/utils');

Feature('multiproject');
//Arrange

const learnMoreCID = '3fb3a217cd28:66b598a4bd';
const checkoutCID = '6b02a62df319:4c1e0fedd0';
const env_id = "f7796c595a";
const uid = "66428915_1635165183658";
Scenario('Verify changes when both experiments matching', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/multiProjectBoth.html');
    const scripts = await I.grabAttributeFromAll(locate('//head').find('script'),'src');
    await scripts.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            allocations = utils.getAllocations(env_id,uid);
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
    I.wait(1);
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        evolv.context.remoteContext.confirmations.forEach(element => {
            confirmationsArray.push(element.cid);
        })
        return confirmationsArray;
    });
    //Assert
    await locator.forEach(async element => {
        I.waitForElement(element);
        let cssAttr = await I.grabCssPropertyFrom(element, css[locator.indexOf(element)].attr);
        I.assertContain(cssAttr, convert.keyword.rgb(css[locator.indexOf(element)].value).join(', ').toString());
    });
    
    await I.assertContain(confirmations, learnMoreCID);
    await I.assertContain(confirmations, checkoutCID);
    
});

Scenario('Verify changes when first experiment matching', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/multiprojectSecond.html');
    const scripts = await I.grabAttributeFromAll(locate('//head').find('script'),'src');
    await scripts.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            allocations = utils.getAllocations(env_id,uid);
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
    I.wait(1);
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        evolv.context.remoteContext.confirmations.forEach(element => {
            confirmationsArray.push(element.cid);
        })
        return confirmationsArray;
    });
    
    //Assert
    I.waitForElement(locator[0]);
    let cssAttr = await I.grabCssPropertyFrom(locator[0], css[0].attr);
    I.assertContain(cssAttr, convert.keyword.rgb(css[0].value).join(', ').toString());
    I.waitForElement(locator[1]);
    cssAttr = await I.grabCssPropertyFrom(locator[1], css[1].attr);
    I.assertNotContain(cssAttr, convert.keyword.rgb(css[1].value).join(', ').toString());

    await I.assertContain(confirmations, learnMoreCID);
    await I.assertNotContain(confirmations, checkoutCID);

});

Scenario('Verify changes when second experiment matching', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/multiProjectFirst.html');
    const scripts = await I.grabAttributeFromAll(locate('//head').find('script'),'src');
    await scripts.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            allocations = utils.getAllocations(env_id,uid);
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
    I.wait(1);
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        evolv.context.remoteContext.confirmations.forEach(element => {
            confirmationsArray.push(element.cid);
        })
        return confirmationsArray;
    });
    //Assert
   
    I.waitForElement(locator[1]);
    let cssAttr = await I.grabCssPropertyFrom(locator[1], css[1].attr);
    I.assertContain(cssAttr, convert.keyword.rgb(css[1].value).join(', ').toString());
    I.waitForElement(locator[0]);
    cssAttr = await I.grabCssPropertyFrom(locator[0], css[0].attr);
    I.assertNotContain(cssAttr, convert.keyword.rgb(css[0].value).join(', ').toString());
    await I.assertNotContain(confirmations, learnMoreCID);
    await I.assertContain(confirmations, checkoutCID);
});

Scenario('Verify changes when none of experiment matching', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/multiprojectNone.html');
    const scripts = await I.grabAttributeFromAll(locate('//head').find('script'),'src');
    await scripts.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            allocations = utils.getAllocations(env_id,uid);
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
    I.wait(1);
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        if(evolv.context.remoteContext.confirmations){
            evolv.context.remoteContext.confirmations.forEach(element => {
                confirmationsArray.push(element.cid);
            })
        }else confirmationsArray = [];
        return confirmationsArray;
    });
    //Assert
   
    await locator.forEach(async element => {
        I.waitForElement(element);
        let cssAttr = await I.grabCssPropertyFrom(element, css[locator.indexOf(element)].attr);
        I.assertNotContain(cssAttr, convert.keyword.rgb(css[locator.indexOf(element)].value).join(', ').toString());
    });

    await I.assertNotContain(confirmations, learnMoreCID);
    await I.assertNotContain(confirmations, checkoutCID);
});


