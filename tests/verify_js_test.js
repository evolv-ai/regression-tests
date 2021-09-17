Feature('verify_js');

Scenario('Verification of JS execution', async ({I})=>{
    //arrange
    let consoleMessages = [];
    //act
    I.amOnPage('/clone.html');
    const browserLogs = await I.grabBrowserLogs();
    browserLogs.forEach(element=>{
        if(element._type === 'log'){
            consoleMessages.push(element._text);
    }});
    const evolvMessages = consoleMessages.filter(m => !m.includes("hello"))
    //assert
    evolvMessages.forEach(element => {
        I.assertContain(element, 'learn is red');
    });
})
