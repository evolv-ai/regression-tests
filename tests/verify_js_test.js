Feature('verify_js');

Scenario('Verification of JS execution', async ({I})=>{
    //Arrange
    let consoleMessages = [];
    //Act
    I.amOnPage('/clone.html');
    const browserLogs = await I.grabBrowserLogs();
    browserLogs.forEach(element=>{
        if(element._type === 'log'){
            consoleMessages.push(element._text);
    }});
    const evolvMessages = consoleMessages.filter(m => !m.includes("hello"))
    //Assert
    evolvMessages.forEach(element => {
        I.assertContain(element, 'is green');
    });
})
