Images = new Mongo.Collection('images');

Images.allow({
	insert(userId, doc) {
		if(Meteor.user()) return userId == doc.createdBy;
		return false;
	},

	remove(userId, doc) {
		if(Meteor.user()) return true;
		return false;
	}
});