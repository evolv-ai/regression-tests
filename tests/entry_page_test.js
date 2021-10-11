const utils = require('../utils/utils');

Feature('entry_page');
const learnMoreCID = '3fb3a217cd28:3a7c12f7a5';
const checkoutCID = '6b02a62df319:ac6d3e5bf2';
Scenario('Verify changes when both experiments matching', async ({ I }) => {
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
    };

    I.wait(2);

    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        evolv.context.remoteContext.confirmations.forEach(element => {
            confirmationsArray.push(element.cid);
        })
        return confirmationsArray;
    });

    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
        return filteredKeys.map(key => key.split('.')[1]);
    })

    let experimentsConfig = await utils.getConfiguration();

    let getEntryPoints = async function (){ 
        let entryPoints = [];
        
        await experimentsConfig.forEach(element => {
            
                entryPoints.push(element.web[activeKeys[experimentsConfig.indexOf(element)]]._is_entry_point);
            
            
        });
        
        return entryPoints;
    }
    const entryPoints = await getEntryPoints();
    
    //Assert
    I.assertEqual(entryPoints.length, confirmations.length);
    
    for (let index = 0; index < entryPoints.length; index++) {
        if(entryPoints[index]){
            await I.assertEqual(typeof confirmations[index], 'string'); 
        }else {
            await I.assertEqual(typeof confirmations[index], 'undefined'); 
        }
    }
    
    
    
});

Scenario('Verify changes when first experiment matching', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/clone.html');
    
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
    };

    I.wait(2);
    let getEntryPoints = async function (){ 
        let entryPoints = [];
        experimentsConfig.forEach(element => {
            
            if(activeKeys.length===1){
                if(element.web[activeKeys[0]]){
                    entryPoints.push(element.web[activeKeys[0]]._is_entry_point);
                }
            }    

        });
        
        return entryPoints;
    }
    
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        if(evolv.context.remoteContext.confirmations){

            evolv.context.remoteContext.confirmations.forEach(element => {
                confirmationsArray.push(element.cid);
            })
            return confirmationsArray;
        }else{
            return [];
        }
        
    });

    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
        return filteredKeys.map(key => key.split('.')[1]);
    })
    let experimentsConfig = await utils.getConfiguration();
    const entryPoints = await getEntryPoints();

    //Assert
    //I.assertEqual(entryPoints.length, confirmations.length);
    console.log(entryPoints);
    console.log(confirmations);
    for (let index = 0; index < entryPoints.length; index++) {
        if(entryPoints[index]){
            I.assertEqual(typeof confirmations[index], 'string'); 
        }else {
            I.assertEqual(typeof confirmations[index], 'undefined'); 
        }
    }
    

});

Scenario('Verify changes when second experiment matching', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/clone1.html');
    
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
    };

    I.wait(2);
    let getEntryPoints = async function (){ 
        let entryPoints = [];
        experimentsConfig.forEach(element => {
            
            if(activeKeys.length===1){
                if(element.web[activeKeys[0]]){
                    entryPoints.push(element.web[activeKeys[0]]._is_entry_point);
                }
            }    

        });
        
        return entryPoints;
    }
    
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        if(evolv.context.remoteContext.confirmations){

            evolv.context.remoteContext.confirmations.forEach(element => {
                confirmationsArray.push(element.cid);
            })
            return confirmationsArray;
        }else{
            return [];
        }
        
    });

    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
        return filteredKeys.map(key => key.split('.')[1]);
    })
    let experimentsConfig = await utils.getConfiguration();
    const entryPoints = await getEntryPoints();

    //Assert
    //I.assertEqual(entryPoints.length, confirmations.length);

    for (let index = 0; index < entryPoints.length; index++) {
        if(entryPoints[index]){
            I.assertEqual(typeof confirmations[index], 'string'); 
        }else {
            I.assertEqual(typeof confirmations[index], 'undefined'); 
        }
    }
    console.log(confirmations);
    console.log(entryPoints);

});

Scenario('Verify changes when none of experiment matching', async ({ I }) => {
    let cssAsset = null;
    //Act
    I.amOnPage('/');
    
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
    };

    I.wait(2);
    let getEntryPoints = async function (){ 
        let entryPoints = [];
        experimentsConfig.forEach(element => {
            
            if(activeKeys.length===1){
                if(element.web[activeKeys[0]]){
                    entryPoints.push(element.web[activeKeys[0]]._is_entry_point);
                }
            }    

        });
        
        return entryPoints;
    }
    
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        if(evolv.context.remoteContext.confirmations){

            evolv.context.remoteContext.confirmations.forEach(element => {
                confirmationsArray.push(element.cid);
            })
            return confirmationsArray;
        }else{
            return [];
        }
        
    });

    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
        return filteredKeys.map(key => key.split('.')[1]);
    })
    let experimentsConfig = await utils.getConfiguration();
    const entryPoints = await getEntryPoints();

    //Assert
    for (let index = 0; index < entryPoints.length; index++) {
        if(entryPoints[index]){
            I.assertEqual(typeof confirmations[index], 'string'); 
        }else {
            I.assertEqual(typeof confirmations[index], 'undefined'); 
        }
    }
    
    console.log(confirmations); 
    console.log(entryPoints);
    

});
