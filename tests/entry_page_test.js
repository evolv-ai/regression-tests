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
            return[];
        };
    });

    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
        return filteredKeys.map(key => key.split('.')[1]);
    })

    let experimentsConfig = await utils.getConfiguration();
    const allActiveKeysEntryPointInfo = await utils.getEntryPoints(activeKeys, experimentsConfig);

    const countOfActiveKeys = activeKeys.length;
    const countOfEntryPoints = allActiveKeysEntryPointInfo.filter(key => key.isEntryPoint).length;
    const countOfConfirmations = confirmations.length;

    console.log(`Active keys: ${countOfActiveKeys}`);
    console.log(`Entry points: ${countOfEntryPoints}`);
    allActiveKeysEntryPointInfo.forEach(key => {
        console.log(`${key.id} | isEntryPoint: ${key.isEntryPoint}`);
    })
    console.log(`Confirmations: ${countOfConfirmations}`);

    const experimentDetails = {
        confirmations: confirmations,
        allActiveKeysEntryPointInfo: allActiveKeysEntryPointInfo,
        countOfActiveKeys: countOfActiveKeys,
        countOfEntryPoints: countOfEntryPoints,
        countOfConfirmations: countOfConfirmations,
    }

    return experimentDetails;
}

Scenario('Verify confirmation when one experiment has entry point equal to true and the other set to false', async ({ I }) => {
    // ACT & ARRANGE
    const page = '/index.html';
    const exp = await arrangeTest(I, page);

    // ASSERT
    // I expect there to be a confirmation for each experiment where entry point is true
    I.assertTrue(exp.countOfConfirmations === exp.countOfEntryPoints);
    // I expect there to be one confirmation
    I.assertTrue(exp.countOfConfirmations === 1);
    // I expect there to be no confirmation where entry point is false
    exp.confirmations.forEach(confirmation => {
        exp.allActiveKeysEntryPointInfo.find(key => {
            if (key.isEntryPoint) {
                I.assertTrue(confirmation.indexOf(key.id) > -1); // Confirmation
            } else {
                I.assertTrue(confirmation.indexOf(key.id) === -1); // No confirmation
            }
        })
    })
});

Scenario('Verify no confirmation when entry page is false', async ({ I }) => {
    // ACT & ARRANGE
    const page = '/clone.html';
    const exp = await arrangeTest(I, page);

    // ASSERT
    I.assertTrue(exp.countOfActiveKeys === 1);
    // I expect the entry point for the active key to be false
    exp.allActiveKeysEntryPointInfo.forEach(key => {
        I.assertTrue(key.isEntryPoint === false);
    })
    // I expect there to be no confirmations
    I.assertTrue(exp.countOfConfirmations === 0);

});

Scenario('Verify confirmation when entry page is true', async ({ I }) => {
    // ACT & ARRANGE
    const page = '/clone1.html';
    const exp = await arrangeTest(I, page);

    // ASSERT
    // I expect the entry point for the active key to be true
    I.assertTrue(exp.countOfActiveKeys === 1);
    exp.allActiveKeysEntryPointInfo.forEach(key => {
        I.assertTrue(key.isEntryPoint === true);
    })
    I.assertTrue(exp.countOfConfirmations === 1);
});

Scenario('Verify no confirmations when none of the experiments match', async ({ I }) => {
    // ACT & ARRANGE
    const page = '/nocontextmatch.html';
    const exp = await arrangeTest(I, page);

    // ASSERT
    I.assertTrue(exp.countOfConfirmations === 0);
    I.assertTrue(exp.countOfActiveKeys === 0);
    I.assertTrue(exp.countOfEntryPoints === 0);
});
