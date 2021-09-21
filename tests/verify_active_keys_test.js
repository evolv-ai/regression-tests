Feature('verify_active_keys');

Scenario('Verification of active keys', async ({I})=>{
    //Arrange
    const expectedKeys = ["web.ziki67zuk.r41ruj170","web.ziki67zuk","web.jol5muwhq.bv1pfu3vu","web.jol5muwhq"];
    //Act
    I.amOnPage('/index.html');
    let activeKeys = await I.executeScript(async () => {
        let keys = await evolv.client.getActiveKeys();
        return keys.current;
    })
    //Assert
    expectedKeys.forEach(element => {
        I.assertContain(activeKeys, element);
    });
});
