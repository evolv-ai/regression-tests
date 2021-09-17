Feature('verify_active_keys');

Scenario('Verification of active keys', async ({I})=>{
    //arrange
    const expectedKeys = ['web.ju44cc698.znq3q7z08','web.ju44cc698','web.ju44cc698.3khie0czk'];
    //act
    I.amOnPage('/clone.html');
    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        return keys.current;
    })
    //assert
    expectedKeys.forEach(element => {
        I.assertContain(activeKeys, element);
    });
});
