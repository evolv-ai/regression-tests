Feature('confirmation');

Scenario('Verifcation of confirmation events', async ({ I }) => {
    I.amOnPage('/');
    let confirmations = await I.executeScript(async () => {
        let confirmationsArray = [];
        evolv.context.remoteContext.confirmations.forEach(element => {
            console.log(element.cid)
            confirmationsArray.push(element.cid);
        })
        return confirmationsArray;
       
    });
    //prints cid of confirmation
    console.log(confirmations)
    //checking that confirmations array is not empty
    I.assertNotEqual(confirmations.length, 0);
});
