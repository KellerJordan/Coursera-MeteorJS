import './website_list.html';
import { Session } from 'meteor/session';

Template.website_list.helpers({
	websites(){
		let SearchTerms = Session.get('SearchTerms');
		// if(SearchTerms) 
		return Websites.find({}, { sort: { votes: -1 } });
		// return Websites.find({ title: })
	}
});