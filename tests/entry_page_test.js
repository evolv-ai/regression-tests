const utils = require('../utils/utils');

Feature('entry_page');

async function arrangeTest(I, page) {
    I.amOnPage(page);
    I.wait(2);

    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];

        if (evolv.context.remoteContext.experiments.confirmations) {
            evolv.context.remoteContext.experiments.confirmations.forEach(element => {
                confirmationsArray.push(element.cid);
            })
            return confirmationsArray;
        } else {
            throw new Error("No confirmations on this page!");
        };
    });

    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
        return filteredKeys.map(key => key.split('.')[1]);
    })

    let experimentsConfig = await utils.getConfiguration();
    const allActiveKeysEntryPointInfo = await utils.getEntryPoints(activeKeys, experimentsConfig);

    const countOfEntryPoints = allActiveKeysEntryPointInfo.filter(key => key.isEntryPoint).length;
    const countOfConfirmations = confirmations.length;

    console.log(`Entry points: ${countOfEntryPoints}`);
    console.log(`Confirmations: ${countOfConfirmations}`);

    const experimentDetails = {
        confirmations: confirmations,
        allActiveKeysEntryPointInfo: allActiveKeysEntryPointInfo,
        countOfEntryPoints: countOfEntryPoints,
        countOfConfirmations: countOfConfirmations
    }

    return experimentDetails;
}

Scenario('Verify confirmation when both experiments match the context and the first has entry point equal to true', async ({ I }) => {
    // Act
    const page = '/index.html';
    const exp = await arrangeTest(I, page);

    // Assert
    I.assertTrue(exp.countOfEntryPoints === exp.countOfConfirmations);
    I.assertTrue(exp.countOfConfirmations > 0);

    exp.confirmations.forEach(confirmation => {
        exp.allActiveKeysEntryPointInfo.find(key => {
            if (key.isEntryPoint) {
                I.assertTrue(confirmation.indexOf(key.id) > -1);
            } else {
                I.assertTrue(confirmation.indexOf(key.id) === -1);
            }
        })
    })
});

// Scenario('Verify confirmation when both experiments match the context and the second has entry point equal to true', async ({ I }) => {
//     //Act
//     const page = '/index.html';
//     await arrangeTest(I, page);
//
// });

// Scenario('Verify confirmation when both experiments match the context and both have entry point equal to true', async ({ I }) => {
//     //Act
//     const page = '/index.html';
//     await doTest(I, page);
//     I.assertTrue(countOfConfirmations > 0);
// });
//
// Scenario('Verify no confirmations when none of experiment matching', async ({ I }) => {
//     //Act
//     I.amOnPage('/');
//     I.wait(2);
//     let confirmations = await I.executeScript(async () => {
//         let confirmationsArray = [];
//
//         if(evolv.context.remoteContext.experiments.confirmations){
//
//             evolv.context.remoteContext.experiments.confirmations.forEach(element => {
//                 confirmationsArray.push(element.cid);
//             })
//             return confirmationsArray;
//         }
//         else {
//             return [];
//         };
//     });
//
//     let activeKeys = await I.executeScript(async () => {
//         let keys = await evolv.client.getActiveKeys();
//         let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
//         return filteredKeys.map(key => key.split('.')[1]);
//     })
//
//     let experimentsConfig = await utils.getConfiguration();
//
//     const entryPoints = await utils.getEntryPoints(activeKeys, experimentsConfig);
//
//     //Assert
//     entryPoints.forEach(element => {
//         if(element.isEntryPoint){
//             I.assertContain(confirmations[entryPoints.indexOf(element)], element.id);
//         }else{
//             I.assertNotContain(confirmations[entryPoints.indexOf(element)], element.id);
//         }
//     });
//
//     I.assertEqual(confirmations.length, 0);
//     entryPoints.forEach(element => {
//         I.assertEqual(element.isEntryPoint, false);
//     });
// });
