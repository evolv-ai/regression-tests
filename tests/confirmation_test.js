Feature('confirmation');

Scenario('Verification of confirmation events', async ({ I }) => {
    I.amOnPage('/');
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        evolv.context.remoteContext.confirmations.forEach(element => {
            confirmationsArray.push(element.cid);
        })
        return confirmationsArray;
       
    });
    I.assertNotEqual(confirmations.length, 0);
});
