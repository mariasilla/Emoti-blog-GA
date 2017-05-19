import { Meteor } from 'meteor/meteor';
import '../imports/api/items.js';
var sadness;
var joy;
var fear;
var disgust;
var anger;


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
const path = require('path')
const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
// require('dotenv').config({ silent: true }); //  optional

const nlu = new NaturalLanguageUnderstandingV1({
  // note: if unspecified here, credentials are pulled from environment properties:
  // NATURAL_LANGUAGE_UNDERSTANDING_USERNAME &  NATURAL_LANGUAGE_UNDERSTANDING_PASSWORD
  username: "",
  password: "",
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

      sadness = res.keywords[0].emotion.sadness;
      joy = res.keywords[0].emotion.joy;
      fear = res.keywords[0].emotion.fear;
      disgust = res.keywords[0].emotion.disgust;
      anger = res.keywords[0].emotion.anger;

      console.log(sadness, joy, fear, disgust, anger);
    });
 });

// });
