import './website_form.html';

Template.website_form.events({
	'click .js-toggle-website-form'(event) {
		$("#website_form").toggle('slow');
		console.log('working');
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