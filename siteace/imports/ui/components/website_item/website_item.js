import './website_item.html';

Template.website_item.events({
	'click .js-upvote'(event) {
		Websites.update({ _id: this._id }, { $inc: { votes: 1 } });
		return false;
	},

	'click .js-downvote'(event) {
		Websites.update({ _id: this._id }, { $inc: { votes: -1 } });
		return false;
	},

	'click .js-remove'(event) {
		$('#' + this._id).hide('slow', () => { Websites.remove({ _id: this._id }) });
		return false;
	}
});