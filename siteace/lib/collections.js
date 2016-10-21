Websites = new Mongo.Collection('websites');
Comments = new Mongo.Collection('comments');

Websites.allow({
	insert(userId, doc) {
		if(Meteor.user()) return true;
		return false;
	},

	remove(userId, doc) {
		if(Meteor.user()) return true;
		return false;
	},

	update(userId, doc) {
		if(Meteor.user()) return true;
		return false;
	}
});

Comments.allow({
	insert(userId, doc) {
		if(Meteor.user()) return true;
		return false;
	}
})