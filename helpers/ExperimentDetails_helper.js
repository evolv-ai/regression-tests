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

    async getCurrentActiveKeys() {
        const {Puppeteer} = this.helpers;

        return await Puppeteer.executeScript(async () => {
            const keys = await evolv.client.getActiveKeys();
            return keys.current;
        })
    }

    updateContext(contextItems) {
        const {Puppeteer} = this.helpers;

        Puppeteer.executeScript(contextItems => {
            evolv.context.update(contextItems);
        }, contextItems)

    }

    async getContextItems() {
        const {Puppeteer} = this.helpers;

        return await Puppeteer.executeScript(async () => {
            return evolv.context.remoteContext;
        });
    }

    async getConfirmations() {
        const {Puppeteer} = this.helpers;

        return await Puppeteer.executeScript(() => {
            let confirmationsArray = [];

            if (evolv.context.remoteContext.experiments.confirmations) {
                evolv.context.remoteContext.experiments.confirmations.forEach(element => {
                    confirmationsArray.push(element.cid);
                })
                return confirmationsArray;
            } else {
                return [];
            }
        });
    }
}

module.exports = ExperimentDetails;
