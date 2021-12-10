const utils = require('../utils/utils');

Feature('update_context');

const audienceAttribute = {audienceTest: 'true'};
const contextAttribute  = {contextTest: 'true'};
const variableAttribute = {variableTest: 'true'};

async function arrangeTest(I, page, contextItems) {
    I.amOnPage(page);
    I.wait(2);

    if (contextItems && contextItems !== "undefined") {
        I.updateContext(contextItems)
    }

    const experimentDetails = {
        context: await I.getContextItems(),
        currentActiveKeys: await I.getCurrentActiveKeys(),
        confirmations: await I.getConfirmations()
    }

    return experimentDetails;
}

Scenario('Verify the experiment audience matches', async ({I}) => {
    // ARRANGE & ACT
    const page = '/updateContext.html';
    const newContextItems = audienceAttribute;

    const before = await arrangeTest(I, page);
    const after = await arrangeTest(I, page, newContextItems);

    // ASSERT
    I.assertEqual(before.currentActiveKeys.length, 0);
    I.assertTrue(after.currentActiveKeys.length > before.currentActiveKeys.length);
    I.assertHasAProperty(after.context, Object.keys(newContextItems)[0]);
    I.assertTrue(after.confirmations.length === 1)
})

Scenario('Verify the context matches', async ({I}) => {
    const page = '/updateContext.html';
    const initialContextItems = audienceAttribute;
    const newContextItems = {...contextAttribute,...audienceAttribute};

    const before = await arrangeTest(I, page, initialContextItems);
    const after = await arrangeTest(I, page, newContextItems);

    // ASSERT
    I.assertTrue(before.confirmations.length === 1)
    I.assertTrue(after.currentActiveKeys.length > before.currentActiveKeys.length);
    I.assertHasAProperty(before.context, Object.keys(initialContextItems)[0]);
    I.assertHasAProperty(after.context, Object.keys(newContextItems)[0]);
    I.assertTrue(after.confirmations.length === before.confirmations.length);
})

Scenario('Verify the targeted variable matches @current', async ({I}) => {
    const page = '/updateContext.html';
    const initialContextItems = {...audienceAttribute, ...contextAttribute};
    const newContextItems = {...variableAttribute,...initialContextItems};

    const before = await arrangeTest(I, page, initialContextItems);
    const after = await arrangeTest(I, page, newContextItems);

    // ASSERT
    I.assertTrue(before.confirmations.length === 1);
    Object.keys(initialContextItems).forEach(key => {
        I.assertHasAProperty(before.context, key);
    });
    I.assertTrue(after.currentActiveKeys.length > before.currentActiveKeys.length);
    I.assertTrue(after.confirmations.length === before.confirmations.length);
    Object.keys(newContextItems).forEach(key => {
        I.assertHasAProperty(after.context, key);
    });
})
