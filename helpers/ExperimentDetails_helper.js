const Helper = require('@codeceptjs/helper');

class ExperimentDetails extends Helper {

    // before/after hooks
    /**
     * @protected
     */
    _before() {
        // remove if not used
    }

    /**
     * @protected
     */
    _after() {
        // remove if not used
    }

     async getActiveKeys() {
        const { Puppeteer } = this.helpers;

        return await Puppeteer.executeScript( async () => {
            let keys = await evolv.client.getActiveKeys();
            let filteredKeys = keys.current.filter(key => key.split('.').length < 3);
            return filteredKeys.map(key => key.split('.')[1]);
        })
    }

    updateTheContext(contextChange) {
        const { Puppeteer } = this.helpers;

        Puppeteer.executeScript( contextChange => {
            evolv.context.update({newContextItem: contextChange.join(' ')});
        }, contextChange)
    }

    async getContextItems() {
        const { Puppeteer } = this.helpers;

        return await Puppeteer.executeScript( async () => {
            let context = await evolv.context.remoteContext;
            let items = [];
            for (let key in context) {
                if (context.hasOwnProperty(key)) {
                    items.push({
                        key: key,
                        value: context[key]
                    });
                }
            }
            return items;
        });
    }
}

module.exports = ExperimentDetails;
