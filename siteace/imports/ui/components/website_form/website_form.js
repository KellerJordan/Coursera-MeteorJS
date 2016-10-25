import './website_form.html';
import { HTTP } from 'meteor/http';

Template.website_form.helpers({
	'recommended_sites_text'() {
		return Session.get('showing_recommended') ? 'Show All Sites' : 'Show Only Recommended Sites';
	},

	'using_http'() {
		return Session.get('using_http');
	}
})

Template.website_form.events({
	'click .js-toggle-website-form'(event) {
		$("#website_form").toggle('slow');
	},

	'submit .js-save-website-form'(event) {
		let form = event.target;
		if(Session.get('using_http')) {
			try {
				HTTP.get(form.url.value, {}, (error, result) => {
					if(error) {
						console.log(error);
					} else {
						let title = $(result.content).filter('title').text();
						Websites.insert({
							title: title,
							url: form.url.value,
							description: form.description.value,
							time: new Date(),
							votes: 0
						});
					}
				});			
			} catch(err) {
				console.log(err);
			}
		} else {
			Websites.insert({
				title: form.title.value,
				url: form.url.value,
				description: form.description.value,
				time: new Date(),
				votes: 0
			});
		}
		return false;
	},

	'click .js-toggle-recommended-sites'(event) {
		Session.set('showing_recommended', !Session.get('showing_recommended'));
	},

	'click .js-toggle-http'(event) {
		Session.set('using_http', !Session.get('using_http'));
	}
});