import './website_form.html';
import { HTTP } from 'meteor/http';

Template.website_form.helpers({
	'recommended_sites_text'() {
		return Session.get('showing_recommended') ? 'Show All Sites' : 'Show Only Recommended Sites';
	}
})

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
	},

	'click .js-toggle-recommended-sites'(event) {
		Session.set('showing_recommended', !Session.get('showing_recommended'));
	}
});