const utils = require('../utils/utils');

Feature('entry_page');

const logExperimentDetails = (
    countOfActiveKeys, countOfEntryPoints, allActiveKeysEntryPointInfo, countOfConfirmations, confirmations
) => {
    console.log(`Active keys: ${countOfActiveKeys}`);
    console.log(`Entry points: ${countOfEntryPoints}`);
    allActiveKeysEntryPointInfo.forEach(key => {
        console.log(`${key.id} | isEntryPoint: ${key.isEntryPoint}`);
    })
    console.log(`Confirmations: ${countOfConfirmations}`);
    console.log(confirmations);
}

const validateEntryPoints = (allActiveKeysEntryPointInfo, entryPointValue) => {
    allActiveKeysEntryPointInfo.forEach(key => {
        if (key.isEntryPoint !== entryPointValue) {
            return false
        }
    })
    return true;
}

const checkOnlyEntryPointConfirmations = (confirmations, allActiveKeysEntryPointInfo) => {
    confirmations.forEach(confirmation => {
        allActiveKeysEntryPointInfo.find(key => {
            if (key.isEntryPoint) {
                if (confirmation.indexOf(key.id) === -1) {
                    return false
                }
            } else {
                if (confirmation.indexOf(key.id) > -1) {
                    return false
                }
            }
        })
    })

    return true;
}

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

    logExperimentDetails(
        countOfActiveKeys, countOfEntryPoints, allActiveKeysEntryPointInfo, countOfConfirmations, confirmations
    );

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
    I.assertTrue(exp.countOfConfirmations === exp.countOfEntryPoints);
    I.assertTrue(exp.countOfConfirmations === 1);
    I.assertTrue(checkOnlyEntryPointConfirmations(exp.confirmations, exp.allActiveKeysEntryPointInfo));
});

Scenario('Verify no confirmation when entry page is false', async ({ I }) => {
    // ACT & ARRANGE
    const page = '/clone.html';
    const exp = await arrangeTest(I, page);

    // ASSERT
    I.assertTrue(exp.countOfActiveKeys === 1);
    I.assertTrue(validateEntryPoints(exp.allActiveKeysEntryPointInfo, false))
    I.assertTrue(exp.countOfConfirmations === 0);
});

Scenario('Verify confirmation when entry page is true', async ({ I }) => {
    // ACT & ARRANGE
    const page = '/clone1.html';
    const exp = await arrangeTest(I, page);

    // ASSERT
    I.assertTrue(exp.countOfActiveKeys === 1);
    I.assertTrue(validateEntryPoints(exp.allActiveKeysEntryPointInfo, true))
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
