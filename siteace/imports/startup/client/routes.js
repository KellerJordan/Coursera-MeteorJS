import '/imports/ui/pages/ApplicationLayout/ApplicationLayout.js';
import '/imports/ui/components/comment/comment.js';
import '/imports/ui/components/navbar/navbar.js';
import '/imports/ui/components/website/website.js';
import '/imports/ui/components/website_form/website_form.js';
import '/imports/ui/components/website_item/website_item.js';
import '/imports/ui/components/website_list/website_list.js';
import '/imports/ui/components/websites/websites.js';
import '/imports/ui/components/search/search.js';

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