import './search.html';
import { Session } from 'meteor/session';

Template.search.events({
	'keyup .js-search'(event) {
		Session.set('SearchTerms', event.target.value);
	}
});