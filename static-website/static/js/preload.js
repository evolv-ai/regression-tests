/**
 * @type EvolvPreload
 */
window.evolvPreload = {
	listeners: {
		initialize: function(event) {
			console.log('initialize', event);
		},

		initialized: function(event) {
			console.log('initialized', event);
		},

		skipped: function(event) {
			console.log('initialized', event);
		},

		activated: function(event) {
			console.log('activated', event);
		},

		reverted: function(event) {
			console.log('reverted', event);
		},

		filtered: function(event) {
			console.log('filtered', event);
		},

		selected: function(event) {
			console.log('selected', event);
		},

		rendered: function(event) {
			console.log('rendered', event);
		},

		notrendered: function(event) {
			console.log('notrendered', event);
		},

		stagecompleted: function(event) {
			console.log('stagecompleted', event);
		}
	}
};
