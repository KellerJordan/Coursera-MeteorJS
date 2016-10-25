import './website_list.html';
import { Session } from 'meteor/session';

Template.website_list.helpers({
	websites(){
		let query = {};
		if(Session.get('showing_recommended')) {
			let SearchTerms = [];
			UserPrefs.find({ user: Meteor.user().username }).map(val => { SearchTerms.push(val.word); });
			query = { $where: function() {
				return this.title.split(' ').some(v => {
					return SearchTerms.indexOf(v) != -1;
				});
			} };
		} else {
			let SearchTerms = Session.get('SearchTerms');
			if(SearchTerms) query = { title: { $regex: SearchTerms, $options: 'i' } };
		}
		return Websites.find(query, { sort: { votes: -1 } });
	}
});