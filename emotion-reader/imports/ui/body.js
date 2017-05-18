import {Template} from 'meteor/templating';

import {Items} from '../api/items.js';

import './body.html';


//helper-
//modify the body template - object
Template.body.helpers({
    loggedIn() {
       return Meteor.userId();
    }
    // items() {
    //   return Items.find({});
    // }
})

//event-method that accepts an object
Template.body.events({
  //the first property is a string
  'click .test': (event) => {
    console.log('hello');
  }
})

Template.stream.posts = function () {
    return Posts.find({}, {sort: {published: -1}});
};

Template.editor.events({
    "click #submit-post": function() {
      var published_date = new Date();
      Posts.insert({
        title: document.getElementById("title-area").value,
        text: document.getElementById("editor-area").value,
        published: published_date.toLocaleTimeString()
      })
    }
  });

Template.post.events({
    "click .remove": function () {
      Posts.remove(this._id);
    }
});




//Random User
$.ajax({
  url: 'https://randomuser.me/api/',
  dataType: 'json',
  success: function(data) {
    console.log(data);
  }
});





// // Coverr Video background
// $( document ).ready(function() {
//
//     scaleVideoContainer();
//
//     initBannerVideoSize('.video-container .poster img');
//     initBannerVideoSize('.video-container .filter');
//     initBannerVideoSize('.video-container video');
//
//     $(window).on('resize', function() {
//         scaleVideoContainer();
//         scaleBannerVideoSize('.video-container .poster img');
//         scaleBannerVideoSize('.video-container .filter');
//         scaleBannerVideoSize('.video-container video');
//     });
//
// });
//
// function scaleVideoContainer() {
//
//     var height = $(window).height() + 5;
//     var unitHeight = parseInt(height) + 'px';
//     $('.homepage-hero-module').css('height',unitHeight);
//
// }
//
// function initBannerVideoSize(element){
//
//     $(element).each(function(){
//         $(this).data('height', $(this).height());
//         $(this).data('width', $(this).width());
//     });
//
//     scaleBannerVideoSize(element);
//
// }
//
// function scaleBannerVideoSize(element){
//
//     var windowWidth = $(window).width(),
//     windowHeight = $(window).height() + 5,
//     videoWidth,
//     videoHeight;
//
//     // console.log(windowHeight);
//
//     $(element).each(function(){
//         var videoAspectRatio = $(this).data('height')/$(this).data('width');
//
//         $(this).width(windowWidth);
//
//         if(windowWidth < 1000){
//             videoHeight = windowHeight;
//             videoWidth = videoHeight / videoAspectRatio;
//             $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});
//
//             $(this).width(videoWidth).height(videoHeight);
//         }
//
//         $('.homepage-hero-module .video-container video').addClass('fadeIn animated');
//
//     });
//
// }

//Coverr ends here

// if(Meteor.isClient) {
  // window.fbAsyncInit = function() {
  //   FB.init({
  //     appId      : '1020591371405236',
  //     status     : true,
  //     xfbml      : true
  //   });
  // };
  // (function(d, s, id){
  //    var js, fjs = d.getElementsByTagName(s)[0];
  //    if (d.getElementById(id)) {return;}
  //    js = d.createElement(s); js.id = id;
  //    js.src = "//connect.facebook.net/en_US/sdk.js";
  //    fjs.parentNode.insertBefore(js, fjs);
  //  }(document, 'script', 'facebook-jssdk'));

// }
// Meteor.loginWithInstagram(function (err) {
//          if (err) {
//            console.log('login failed', err);
//          } else {
//            console.log('login success', Meteor.user());
//          }
//      });
//
//
// Meteor.call("getAccessToken", function(error, accessToken){
//   console.log(accessToken);
//   var faceBookPhotoURL = 'https://graph.facebook.com/' + Meteor.userId() + '/picture?access_token=' + accessToken;
//   console.log(faceBookPhotoURL);
// })


//
// Template.body.rendered = function () {
// console.log("foobar");
//   FB.api('/me', {fields: 'last_name'}, function(response) {
//   console.log(response);
// });
// }

 //  function makeFacebookPhotoURL( id, accessToken ) {
 //   return 'https://graph.facebook.com/' + id + '/picture?access_token=' + accessToken;
 //   console.log(accessToken);
 // }



//
//
// FB.api('/me', { fields: 'id, name, email' }, function(response)
// {
//   var userInfo = document.getElementById('user-info');
//   userInfo.innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name ;
//   console.log(response);
// });


// FB.api(
//   "/{photo-id}",
//   function (response) {
//     if (response && !response.error) {
//       /* handle the result */
//       console.log(response);
//     }
//   }
// );
