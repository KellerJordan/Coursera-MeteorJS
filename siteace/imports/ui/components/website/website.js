import './website.html';

Template.website.events({
	'submit .js-add-comment'(event) {
		Comments.insert({
			site_id: this._id,
			content: event.target.comment.value,
			user: Meteor.user().username,
			createdOn: new Date()
		});
		let words = this.title.split(' ');
		for(let i in words) {
			let pref = {
				user: Meteor.user().username,
				word: words[i]
			};
			if(!UserPrefs.findOne(pref)) UserPrefs.insert(pref);
		}
		return false;
	}
});

Template.website.helpers({
	comments() { return Comments.find({ site_id: this._id }) }
});
