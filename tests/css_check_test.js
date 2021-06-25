const needle = require('needle');

Feature('css_check');

const getLocator = async (string) => {
    const response = await needle('get', string).then((res)=>{
        if (res.statusCode == 200){
           return res.body;
        }else throw new Error('Something is wrong: '+res);
            
    });
    console.log("css from file: " + response);
    let locator;
    try {
        locator = response.split('{')[0].trim().split(' ')[1]; 
    } catch (error) {
        throw new Error(error);
    }
    
    return locator;
}

const getAttribute = async (string) => {
    const response = await needle('get', string).then((res)=>{
        if (res.statusCode == 200){
           return res.body;
        }else throw new Error('Something is wrong: '+res);
            
    })
    const attr = response.split(' ')[1].split('{')[1].split(":")[0]; 
    const value = response.split(' ')[1].split('{')[1].split(":")[1].slice(0, -1); 
    const res = { attr:attr, value:value };
    return res;
}

const basicRBG = {
    red : 'rgb(255, 0, 0)',
    yellow : 'rgb(255, 255, 0)',
    grey : 'rgb(128, 128, 128)',
    blue : 'rgb(0, 0, 255)',
    green : 'rgb(0, 128, 0)'
}


Scenario('check for css values', async ({ I }) => {
    I.amOnPage('/');
    //get evolv scripts and use 
    const scripts = await I.grabAttributeFromAll(locate('//head').find('script'),'src');
    
   

    await scripts.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            console.log('Evolv script loaded: '+ element);
        }
    });
    
    const links = await I.grabAttributeFromAll(locate('//head').find('link'),'href');
    console.log(links);
    
    let cssAsset = null;
    
    await links.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            console.log('Evolv css asset loaded: '+ element);
            cssAsset = element;
        }
    });
    //get locators via request to css asset directly
    if(!cssAsset){
    
        throw new Error('links does not contain evolv assets');
        
    }

    const locator = await getLocator(cssAsset);
    const css = await getAttribute(cssAsset);
    //wait for this locator to load on page
    I.waitForElement(locator);
    const cssAttr = await I.grabCssPropertyFrom(locator, css.attr);
    //check if css from assets corresponds to what we see on page
    I.assertContain(cssAttr, basicRBG[css.value]);
    await I.executeScript(async () => {
        eval(await evolv.client.getActiveKeys()).current.forEach(element => {
            //get list of active keys
            console.log(element);
        });
      
        
    });
    //can check browser console logs for output
    const logs = await I.grabBrowserLogs();
    //uncomment to see browser logs in test output
    //console.log(logs);
});
