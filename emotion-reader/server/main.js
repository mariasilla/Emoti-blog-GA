import { Meteor } from 'meteor/meteor';
import '../imports/api/items.js';


Meteor.startup(() => {

  if (Posts.find().count() === 0) {
       var posts = [
       {
         title: "Title one",
         text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et iure porro sunt repudiandae amet saepe asperiores commodi repellendus hic accusamus obcaecati ipsum modi magnam nulla magni vitae ea voluptates dignissimos!",
         published: (new Date()).toLocaleTimeString()
       },
       {
         title: "Title two",
         text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa natus mollitia similique accusamus minus harum magnam eum pariatur rerum fugit ducimus sapiente asperiores quidem molestias repudiandae consequuntur repellendus dolorum placeat.",
         published: (new Date()).toLocaleTimeString()
       }
       ];
       for (var i = 0; i < posts.length; i++) {
         Posts.insert({
           title: posts[i].title,
           text: posts[i].text,
           published: posts[i].published,
         });
       }
     }



// Accounts.onCreateUser(function(options, user) {
//   options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
//   user.profile = options.profile;
//   return user;
// });

});
