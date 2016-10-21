Images = new Mongo.Collection('images');

if(Images.find().count() == 0) {
	for(let i = 1; i <= 22; i++) {
		Images.insert({
			img_src: `img_${i}.jpg`,
			img_alt: `image ${i}`
		});
	}
}