const needle = require('needle');
const convert = require('color-convert');
const config = require('config');

Feature('multiproject');
//Arrange
const getAllocations = async () => {
    const uid = config.get('UID');
    const response = await needle('get', `${config.get('PARTICIPANT_URL')}v1/${config.get('ENVIRONMENT_ID')}/${uid}/allocations`).then((res)=>{
        if (res.statusCode == 200) {       
           return res;
        } else {
            throw new Error('Something is wrong: '+res);
        }
            
    })
    return response;
}

const getCssLocator = async (string) => {
    const response = await needle('get', string).then((res)=>{
        if (res.statusCode == 200){
           return res.body;
        }else {
            throw new Error('Something is wrong: '+res);
        }
            
    });
    let locatorValues = response.split("\n");
    
    try {
        locatorValues.forEach(element => {
            element = element.split('{')[0].trim().split(' ')[1];
        });
    } catch (error) {
        throw new Error(error);
    } 
    const filteredValues = locatorValues.filter(value => value.length > 2);
    const result = filteredValues.map(value => value.split(' ')[1].split('{')[0]);
    return result;
}

const getCssAttribute = async (string) => {
    const response = await needle('get', string).then((res)=>{
        if (res.statusCode == 200){
           return res.body;
        }else {
            throw new Error('Something is wrong: '+res);
        }
            
    });
    let locatorValues = response.split("\n");
    try {
        locatorValues.forEach(element => {
            element = element.split('{')[0].trim().split(' ')[1];
        });
    } catch (error) {
        throw new Error(error);
    } 
    const filteredValues = locatorValues.filter(value => value.length > 2);
    const result = filteredValues.map(value => {
        let cssObj = {attr:value.split(' ')[1].split('{')[1].split(":")[0],
        value: value.split(' ')[1].split('{')[1].split(":")[1].slice(0, -1)};
        return cssObj;
    });
    console.log(result);
    return result;
}
const learnMoreCID = '3fb3a217cd28:c6fdd16b87';
const checkoutCID = '6b02a62df319:47a781df83';

Scenario('Verify changes when both experiments matching', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/index.html');
    
    const scripts = await I.grabAttributeFromAll(locate('//head').find('script'),'src');
    await scripts.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            allocations = getAllocations();
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

    const locator = await getCssLocator(cssAsset);
    const css = await getCssAttribute(cssAsset);
   
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
    I.amOnPage('/clone.html');
    const scripts = await I.grabAttributeFromAll(locate('//head').find('script'),'src');
    await scripts.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            allocations = getAllocations();
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

    const locator = await getCssLocator(cssAsset);
    const css = await getCssAttribute(cssAsset);
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

    await I.assertNotContain(confirmations, learnMoreCID);
    await I.assertContain(confirmations, checkoutCID);

});

Scenario('Verify changes when second experiment matching', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/clone1.html');
    const scripts = await I.grabAttributeFromAll(locate('//head').find('script'),'src');
    await scripts.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            allocations = getAllocations();
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

    const locator = await getCssLocator(cssAsset);
    const css = await getCssAttribute(cssAsset);
    
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

    await I.assertContain(confirmations, learnMoreCID);
    await I.assertNotContain(confirmations, checkoutCID);
});

Scenario('Verify changes when none of experiment matching', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/');
    const scripts = await I.grabAttributeFromAll(locate('//head').find('script'),'src');
    await scripts.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            allocations = getAllocations();
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

    const locator = await getCssLocator(cssAsset);
    const css = await getCssAttribute(cssAsset);
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


