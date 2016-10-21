// if(Meteor.isServer) {
// 	Meteor.startup(() => {
// 		if(Images.find().count() == 0) {
// 			Images.insert({
// 				img_src: "/public/laptops.jpg",
// 				img_alt: "some laptops on a table"
// 			});
// 		}
// 	});
// }
Meteor.startup(() => {
	if(Meteor.isClient) console.log("I am the client");
	if(Meteor.isServer) console.log("I am the server");
	console.log("I am either");
});