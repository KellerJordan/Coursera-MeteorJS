import './body.html';
import { Template } from 'meteor/templating';

Template.body.helpers({
	test: return -4
});
console.log(Template.body);