Feature('confirmation');

Scenario('Verification of confirmation events', async ({ I }) => {
    //arrange
    //act
    I.amOnPage('/clone.html');
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        evolv.context.remoteContext.confirmations.forEach(element => {
            confirmationsArray.push(element.cid);
        })
        return confirmationsArray;
       
    });
    //assert
    I.assertNotEqual(confirmations.length, 0);
});
