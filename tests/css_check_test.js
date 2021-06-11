const needle = require('needle');
Feature('css_check');

const getLocator = async (string) => {
    const response = await needle('get', string).then((res)=>{
        if (res.statusCode == 200){
           return res.body;
        }else throw new Error('Something is wrong: '+res);
            
    })
    const locator = response.split(' ')[1].split('{')[0]; 
    return locator;
}

const getAttribute = async (string) => {
    const response = await needle('get', string).then((res)=>{
        if (res.statusCode == 200){
           return res.body;
        }else throw new Error('Something is wrong: '+res);
            
    })
    const attr = response.split(' ')[1].split('{')[1].split(":")[0]; 
    return attr;
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
    let cssAsset = '';
    await links.forEach(element => {
        if(element)
        if(element.includes('evolv')){
            console.log('Evolv css asset loaded: '+ element);
            cssAsset = element;
        }
    });
    //get locators via request to css asset directly
    const locator = await getLocator(cssAsset);
    const attribute = await getAttribute(cssAsset);
    //wait for this locator to load on page
    I.waitForElement(locator);
    const cssAttr = await I.grabCssPropertyFrom(locator, attribute);
    /*VERIFICATION PART*/ 
    //should use assetContain or assertEquals for css 
    //but for now we have i.e. "backgrond:grey" and properties from above "rgb(128, 128, 128) none repeat scroll 0% 0% / auto padding-box border-box"
    //We should define what to use: some conversion (rgb => text or vice versa). Or do we need check css values ​​at all.
    console.log(cssAttr);
    await I.executeScript(async () => {
        eval(await evolv.client.getActiveKeys()).current.forEach(element => {
            //get list of active keys
            console.log(element);
        });
      
        
    });
    //can check browser console logs for output
    const logs = await I.grabBrowserLogs();
    console.log(logs);
});
