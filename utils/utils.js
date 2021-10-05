const config = require('config');
const needle = require('needle');

module.exports = {
    getAllocations: async function()  {
        const uid = config.get('UID');
        const response = await needle('get', `${config.get('PARTICIPANT_URL')}v1/${config.get('ENVIRONMENT_ID')}/${uid}/allocations`).then((res)=>{
            if (res.statusCode == 200) {       
               return res;
            } else {
                throw new Error('Something is wrong: '+res);
            }
                
        })
        return response;
    },
    getCssLocator: async function (string) {
        const response = await needle('get', string).then((res)=>{
            if (res.statusCode == 200){
               return res.body;
            }else {
                throw new Error('Something is wrong: '+res);
            }
                
        });
        let locatorValues = response.split("\n");
        
        try {
            locatorValues.forEach(element => {
                element = element.split('{')[0].trim().split(' ')[1];
            });
        } catch (error) {
            throw new Error(error);
        } 
        const filteredValues = locatorValues.filter(value => value.length > 2);
        const result = filteredValues.map(value => value.split(' ')[1].split('{')[0]);
        return result;
    },
    getCssAttribute: async function (string) {
        const response = await needle('get', string).then((res)=>{
            if (res.statusCode == 200){
               return res.body;
            }else {
                throw new Error('Something is wrong: '+res);
            }
                
        });
        let locatorValues = response.split("\n");
        try {
            locatorValues.forEach(element => {
                element = element.split('{')[0].trim().split(' ')[1];
            });
        } catch (error) {
            throw new Error(error);
        } 
        const filteredValues = locatorValues.filter(value => value.length > 2);
        const result = filteredValues.map(value => {
            let cssObj = {attr:value.split(' ')[1].split('{')[1].split(":")[0],
            value: value.split(' ')[1].split('{')[1].split(":")[1].slice(0, -1)};
            return cssObj;
        });
        return result;
    }    
 }