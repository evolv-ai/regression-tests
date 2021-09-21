const needle = require('needle');
const convert = require('color-convert');
const config = require('config');

Feature('css_check');
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
   
    //Assert
    await locator.forEach(async element => {
        I.waitForElement(element);
        let cssAttr = await I.grabCssPropertyFrom(element, css[locator.indexOf(element)].attr);
        I.assertContain(cssAttr, convert.keyword.rgb(css[locator.indexOf(element)].value).join(', ').toString());
    });
});
