import './website_list.html';

Template.website_list.helpers({
	websites(){ return Websites.find({}, { sort: { votes: -1 } }) }
});