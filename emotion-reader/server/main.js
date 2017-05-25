import { Meteor } from 'meteor/meteor';
import '../imports/api/items.js';

var sadness;
var joy;
var fear;
var disgust;
var anger;
var unknownEm;


Meteor.startup(() => {
 //Posts Collection
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
           published: posts[i].published
         });
       }
     }



// Accounts.onCreateUser(function(options, user) {
//   options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
//   user.profile = options.profile;
//   return user;
// });


'use strict';
const fs = require('fs');
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
// require('dotenv').config({ silent: true }); //  optional

const nlu = new NaturalLanguageUnderstandingV1({
  // note: if unspecified here, credentials are pulled from environment properties:
  // NATURAL_LANGUAGE_UNDERSTANDING_USERNAME &  NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD
  username: "446d06fa-2fca-43c2-b645-cdb0e75456ad",
  password: "n2tf1iPz32oO",
  version_date: NaturalLanguageUnderstandingV1.VERSION_DATE_2016_01_23
});

const filename = Posts.findOne().text;
console.log(filename);
    const options = {
      // html: file_datca,
      text: filename,

        features: {
          entities: {
            emotion: true,
            sentiment: true
          },
        concepts: {},
        keywords: {
          emotion: true,
          sentiment: true
        }
      }
    };
    nlu.analyze(options, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }

      sadness = (res.keywords[0].emotion.sadness * 100).toFixed(2);
      joy = (res.keywords[0].emotion.joy * 100).toFixed(2);
      fear = (res.keywords[0].emotion.fear * 100).toFixed(2);
      disgust = (res.keywords[0].emotion.disgust * 100).toFixed(2);
      anger = (res.keywords[0].emotion.anger * 100).toFixed(2);
      unknownEm = 100 - (parseInt(sadness) + parseInt(joy) + parseInt(fear) + parseInt(disgust) + parseInt(anger));
      console.log(unknownEm);
      console.log(sadness, joy, fear, disgust, anger, unknownEm);
//       Meteor.methods({
//         emotion: function () {
//         return sadness;
//   },
// });

    });


 });
