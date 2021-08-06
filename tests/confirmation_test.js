Feature('confirmation');

Scenario('Verification of confirmation events', async ({ I }) => {
    I.amOnPage('/');
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        evolv.context.remoteContext.confirmations.forEach(element => {
            console.log(element.cid)
            confirmationsArray.push(element.cid);
        })
        return confirmationsArray;
       
    });
    console.log(confirmations)
    I.assertNotEqual(confirmations.length, 0);
});
