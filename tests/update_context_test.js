const utils = require('../utils/utils');

Feature('update_context');

async function arrangeTest(I, page, updateContext) {
    I.amOnPage(page);
    I.wait(2);

    if (updateContext) {
        I.executeScript(async () => {
            await evolv.context.update({newContextItem:'true'});
        })
    }

    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
        return filteredKeys.map(key => key.split('.')[1]);
    })

    let contextItems = await I.executeScript(async () => {
        let context = await evolv.context.remoteContext;
        let items = [];
        for (let key in context) {
            if (context.hasOwnProperty(key)) {
                items.push({
                    key: key,
                    value: context[key]
                });
            }
        }
        return items;
    })

    const experimentDetails = {
        activeKeys: activeKeys,
        contextItems: contextItems
    }
    return experimentDetails;
}

Scenario('Verify active keys are updated', async ({I}) => {
    const page = '/index.html';
    const before = await arrangeTest(I, page);
    const after = await arrangeTest(I, page, true);

    console.log('BEFORE:');
    before.activeKeys.forEach(key => {
        console.log(key);
    });
    console.log('AFTER:');
    after.activeKeys.forEach(key => {
        console.log(key);
    });

    I.assertTrue(true);
})

Scenario('Verify confirmation for newly active experiment', async ({I}) => {
    // await arrangeContextUpdate(exp.I);

    // I update the context
    // evolv.context.update({"customAttribute": "true"});
    // The experiment confirms
    // The active keys are updated
})

// Scenario('Verify experiment audience matches', async ({I}) => {
//
// })
//
// Scenario('Verify new variables are rendered', async ({I}) => {
//
// })
//
Scenario('Verify new context item', async ({I}) => {
    // ACT & ARRANGE
    const page = '/index.html';
    const before = await arrangeTest(I, page);
    const after = await arrangeTest(I, page, true);

    // ASSERT
    // I expect there to be more items in the context
    I.assertTrue(after.contextItems.length > before.contextItems.length);
    // I expect to find the new context item

    const newItem = Object.keys(after.contextItems).find(item => {
        return item.key === 'newContextItem'
    })

    console.log(after.contextItems)
    console.log(newItem)
    I.assertTrue(true);
})
//
// Scenario('Targeted Variables', async ({I}) => {
//
// })


/*
Regression test repo verification around:

Update context will
-update active keys
-fire confirmation for newly active experiments
-render new variables

Testing matching of
-Experiment audience
-New contexts
-Targeted Variables
 */
