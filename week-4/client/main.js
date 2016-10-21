import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Images = new Mongo.Collection('images');

Template.body.helpers({
	username(){
		if(Meteor.user()) return Meteor.user().username;
		else return 'anonymous internet user';
	}
});

Session.set('imageLimit', 8);

let lastScrollTop = 0;
$(window).on('scroll', () => {
	if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
		let scrollTop = $(this).scrollTop();
		if(scrollTop > lastScrollTop) Session.set('imageLimit', Session.get('imageLimit') + 4);
		lastScrollTop = scrollTop;
	}
});

Accounts.ui.config({
	passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.images.helpers({
	images() {
		let filter = Session.get('userFilter') ? { createdBy: Session.get('userFilter') } : {};
		return Images.find(filter, { sort: { createdOn: -1, rating: -1 }, limit: Session.get('imageLimit') });
	},

	filtering_images() {
		if(Session.get('userFilter')) return true;
		else return false;
	},

	getFilterUser() {
		return Meteor.users.findOne({ _id: Session.get('userFilter') }).username;
	},

	getUser(user_id) {
		let user = Meteor.users.findOne({ _id: user_id });
		if(user) return user.username;
		else return 'anomymous';
	}
});

Template.images.events({
	'click .js-image'(event) {
		$(event.target).css('width', '50px');
	},

	'click .js-del-image'(event) {
		let image_id = this._id;
		console.log(image_id);
		$('#'+image_id).hide('slow', () => { Images.remove({ '_id': image_id }) });
	},

	'click .js-rate-image'(event) {
		let rating = $(event.currentTarget).data('userrating');
		console.log(rating);
		let image_id = this.id;
		console.log(image_id);

		Images.update({ _id: image_id }, { $set: { rating } });
	},

	'click .js-show-image-form'(event) {
		$('#image_add_form').modal('show');
	},

	'click .js-set-image-filter'(event) {
		Session.set('userFilter', this.createdBy);
	},

	'click .js-unset-image-filter'(event) {
		Session.set('userFilter', undefined);
	}
});

Template.image_add_form.events({
	'submit .js-add-image'(event){
		let img_src, img_alt;
		img_src = event.target.img_src.value;
		img_alt = event.target.img_alt.value;
		console.log(`src: ${img_src} alt: ${img_alt}`);
		if(Meteor.user()) {
			Images.insert({
				img_src: img_src, 
				img_alt: img_alt, 
				createdOn: new Date(),
				createdBy: Meteor.user()._id
			});
		}
		$('#image_add_form').modal('show');
		return false;
	}
});