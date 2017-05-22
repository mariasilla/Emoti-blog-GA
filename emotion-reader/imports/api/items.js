import {Mongo} from 'meteor/mongo';

// export const Items = new Mongo.Collection('items');

Posts = new Meteor.Collection("posts");


if (Meteor.isServer) {
    Meteor.publish('posts',function(){
        let post = Posts.find({});
        return posts
    })
}
