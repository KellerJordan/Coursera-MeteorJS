import './website.html';

Template.website.events({
	'submit .js-add-comment'(event) {
		Comments.insert({
			site_id: this._id,
			content: event.target.comment.value,
			user: Meteor.user().username,
			createdOn: new Date()
		});
		return false;
	}
});

Template.website.helpers({
	comments() { return Comments.find({ site_id: this._id }) }
});
