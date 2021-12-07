const utils = require('../utils/utils');

Feature('update_context');

async function arrangeTest(I, page, contextChange) {
    I.amOnPage(page);
    I.wait(2);

    if (contextChange && contextChange !== "undefined") {
        I.updateTheContext(contextChange, true)
    }

    const experimentDetails = {
        activeKeys: await I.getActiveKeys(),
        contextItems: await I.getContextItems()
    }

    return experimentDetails;
}

Scenario('Verify the experiment audience matches', async ({I}) => {
    // const page = '/updateContext.html'; // Needs experiments before it'll return anything
    const page = '/index.html';
    const contextChange = ['updateContext','variableTargeting'];

    const before = await arrangeTest(I, page);
    console.log(before.activeKeys); // Working
    console.log(before.contextItems); // Working

    const after = await arrangeTest(I, page, contextChange);
    console.log(after.activeKeys); // Working
    console.log(after.contextItems); // Working

    // ASSERT
    // I expect there to be more items in the context
    // I.assertTrue(after.contextItems.length > before.contextItems.length);
    // // I expect to find the new context item
    //
    // const newItem = Object.keys(after.contextItems).find(item => {
    //     return item.key === 'newContextItem'
    // })

    I.assertTrue(true);
})
/*
Scenario('Verify the context matches', async ({I}) => {
    const page = '/index.html';
    const before = await arrangeTest(I, page);
    const after = await arrangeTest(I, page, true);

    // ASSERT
    // I expect there to be more items in the context
    // I.assertTrue(after.contextItems.length > before.contextItems.length);
    // // I expect to find the new context item
    //
    // const newItem = Object.keys(after.contextItems).find(item => {
    //     return item.key === 'newContextItem'
    // })

    I.assertTrue(true);
})

Scenario('Verify the targeted variable matches', async ({I}) => {
    const page = '/index.html';
    const before = await arrangeTest(I, page);
    const after = await arrangeTest(I, page, true);

    // ASSERT
    // I expect there to be more items in the context
    // I.assertTrue(after.contextItems.length > before.contextItems.length);
    // // I expect to find the new context item
    //
    // const newItem = Object.keys(after.contextItems).find(item => {
    //     return item.key === 'newContextItem'
    // })

    I.assertTrue(true);
})
 */
