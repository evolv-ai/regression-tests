const utils = require('../utils/utils');

Feature('entry_page');
Scenario('Verify changes when both experiments matching', async ({ I }) => {
    //Act
    I.amOnPage('/index.html');
    I.wait(2);
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
       
        if(evolv.context.remoteContext.experiments.confirmations){

            evolv.context.remoteContext.experiments.confirmations.forEach(element => {
                confirmationsArray.push(element.cid);
            })
            return confirmationsArray;
        }
        else {
            throw new Error("No confirmations on this page!");
        };
    });

    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
        return filteredKeys.map(key => key.split('.')[1]);
    })

    let experimentsConfig = await utils.getConfiguration();
 
    const entryPoints = await utils.getEntryPoints(activeKeys, experimentsConfig);
   
    //Assert
    entryPoints.forEach(element => {
        if(element.isEntryPoint){
            I.assertContain(confirmations[entryPoints.indexOf(element)], element.id);
        }else{
            I.assertNotContain(confirmations[entryPoints.indexOf(element)], element.id);
        }
    });
});

Scenario('Verify changes when first experiment matching', async ({ I }) => {
   //Act
   I.amOnPage('/clone.html');
   I.wait(2);
   let activeKeys = await I.executeScript(async () => {
       let keys = await evolv.client.getActiveKeys();
       let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
       return filteredKeys.map(key => key.split('.')[1]);
   })
   let experimentsConfig = await utils.getConfiguration();
   let confirmations = await I.executeScript(async () => {
       let confirmationsArray = [];
      
       if(evolv.context.remoteContext.experiments.confirmations){

           evolv.context.remoteContext.experiments.confirmations.forEach(element => {
               confirmationsArray.push(element.cid);
           })
           return confirmationsArray;
       }
       else {
           return [];
       };
   });
   const entryPoints = await utils.getEntryPoints(activeKeys, experimentsConfig);

   //Assert
   I.assertEqual(confirmations.length, 0);
   entryPoints.forEach(element => {
        I.assertEqual(element.isEntryPoint, false);
   });
});

Scenario('Verify changes when second experiment matching', async ({ I }) => {
    //Act
    I.amOnPage('/clone1.html');
    I.wait(2);
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
       
        if(evolv.context.remoteContext.experiments.confirmations){

            evolv.context.remoteContext.experiments.confirmations.forEach(element => {
                confirmationsArray.push(element.cid);
            })
            return confirmationsArray;
        }
        else {
            return [];
        };
    });

    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
        return filteredKeys.map(key => key.split('.')[1]);
    })

    let experimentsConfig = await utils.getConfiguration();
 
    const entryPoints = await utils.getEntryPoints(activeKeys, experimentsConfig);
   
    //Assert
    entryPoints.forEach(element => {
        if(element.isEntryPoint){
            I.assertContain(confirmations[entryPoints.indexOf(element)], element.id);
        }else{
            I.assertNotContain(confirmations[entryPoints.indexOf(element)], element.id);
        }
    });
});

Scenario('Verify changes when none of experiment matching', async ({ I }) => {
    //Act
    I.amOnPage('/');
    I.wait(2);
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
       
        if(evolv.context.remoteContext.experiments.confirmations){

            evolv.context.remoteContext.experiments.confirmations.forEach(element => {
                confirmationsArray.push(element.cid);
            })
            return confirmationsArray;
        }
        else {
            return [];
        };
    });

    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
        return filteredKeys.map(key => key.split('.')[1]);
    })

    let experimentsConfig = await utils.getConfiguration();
 
    const entryPoints = await utils.getEntryPoints(activeKeys, experimentsConfig);
   
    //Assert
    entryPoints.forEach(element => {
        if(element.isEntryPoint){
            I.assertContain(confirmations[entryPoints.indexOf(element)], element.id);
        }else{
            I.assertNotContain(confirmations[entryPoints.indexOf(element)], element.id);
        }
    });

    I.assertEqual(confirmations.length, 0);
    entryPoints.forEach(element => {
         I.assertEqual(element.isEntryPoint, false);
    });
});
