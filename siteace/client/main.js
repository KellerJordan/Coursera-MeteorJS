Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function() {
	this.render('navbar', { to: 'navbar' });
	this.render('websites', { to: 'main' });
});

Router.route('/websites/:_id', function() {
	this.render('navbar', { to: 'navbar' });
	this.render('website', {
		to: 'main',
		data() {
			return Websites.findOne({ _id: this.params._id });
		}
	});
});

Accounts.ui.config({ passwordSignupFields: 'USERNAME_AND_EMAIL' });


Template.body.helpers({
	username(){
		if(Meteor.user()) return Meteor.user().username;
		else return 'anonymous internet user';
	}
});

Template.website_list.helpers({
	websites(){ return Websites.find({}, { sort: { votes: -1 } }) }
});

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

Template.website_form.events({
	'click .js-toggle-website-form'(event) {
		$("#website_form").toggle('slow');
	},

	'submit .js-save-website-form'(event) {
		let form = event.target;
		Websites.insert({
			title: form.title.value,
			url: form.url.value,
			description: form.description.value,
			time: new Date(),
			votes: 0
		});	
		return false;
	}
});

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
