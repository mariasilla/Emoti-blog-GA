import {Template} from 'meteor/templating';

import {Items} from '../api/items.js';

import './body.html';
// var Chart = require('chart.js')


var postTitle;
var postText;
var giphUrl;

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
//render posts array to page
Template.stream.posts = function () {
    return Posts.find({}, {sort: {published: -1}});
};

//on click insert into mongo db
Template.editor.events({
    "click #submit-post": function() {
      var published_date = new Date();
      postTitle = document.getElementById("title-area").value;
      postText = document.getElementById("editor-area").value;

 //Giphy API call
      $.ajax({
       url: 'http://api.giphy.com/v1/gifs/search?q=' + postTitle + '&api_key=dc6zaTOxFJmzC',
       dataType: 'json',
       success: function(response) {
         // console.log(response.data);
         var resArr = response.data;
         var randomItem = resArr[Math.floor(Math.random()*resArr.length)];

         giphUrl = randomItem.images.downsized_small.mp4;
         console.log(giphUrl);

         }
       });
 //Giphy API call ends here

      Posts.insert({
        title: postTitle,
        text: postText,
        published: published_date.toLocaleTimeString()
      })
      // $("#giphImg").attr('src',giphUrl);
    }
  });

//Delete posts
Template.post.events({
    "click .remove": function () {
      Posts.remove(this._id);
    }
});

//Watson API AJAX call




// $.ajax({
//           method: "POST",
//           version: 'v2-beta',
//           url: "https://gateway.watsonplatform.net/natural-language-understanding/api",
//           username: "446d06fa-2fca-43c2-b645-cdb0e75456ad",
//           password: "n2tf1iPz32oO",
//           version_date:'2015-12-02',
//           natural_language_understanding: [
//               {
//               name: "natural-language-understanding",
//               label: "natural-language-understanding",
//               plan: "free",
//               credentials: {
//                  url: "https://gateway.watsonplatform.net/natural-language-understanding/api",
//                  username: "446d06fa-2fca-43c2-b645-cdb0e75456ad",
//                  password: "n2tf1iPz32oO"
//                 }
//               }
//             ]
//           }).done(function(msg){
//           if (200) {
//             console.log("This is a test for if.")
//           } else {
//             console.log("This is a test for else.")
//           }
//         });



        // //Random User
        // $.ajax({
        //   url: 'https://randomuser.me/api/',
        //   dataType: 'json',
        //   success: function(data) {
        //     console.log(data);
        //   }
        // });





//Add Chart.js CDN

// Template.body.onRendered(function () {
//        console.log("hello!!!!!!");
//       $('head').append('<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>');
//
// });


//Watson API starts here
// {
//   "url": "https://gateway.watsonplatform.net/natural-language-understanding/api",
//   "username": "446d06fa-2fca-43c2-b645-cdb0e75456ad",
//   "password": "n2tf1iPz32oO"
// }

//
// var piechart = document.getElementById("myChart").getContext("2d");
// var myPieChart = new Chart(piechart,{
//     type: 'pie',
//     data:  {
//     labels: [
//         "Red",
//         "Blue",
//         "Yellow"
//     ],
//     datasets: [
//         {
//             data: [300, 50, 100],
//             backgroundColor: [
//                 "#FF6384",
//                 "#36A2EB",
//                 "#FFCE56"
//             ],
//             hoverBackgroundColor: [
//                 "#FF6384",
//                 "#36A2EB",
//                 "#FFCE56"
//             ]
//         }]
// },
//    options: {
//         responsive: true
//     }
// });

// document.addEventListener( "DOMContentLoaded", bindButtons );
//
// function bindButtons(  ){
// 	document.getElementById( "submit" ).addEventListener( "click", function( event ){
// 		var req = new XMLHttpRequest();
// 		var sourceURL = encodeURIComponent(document.getElementById( "source" ).value);
//
// 		var endpoint = "https://gateway-a.watsonplatform.net/calls/url/URLGetEmotion?";
// 		var apikey = "your-api-key";
// 		var outputMode = "json";
// 		var sourceText = "cleaned_or_raw";
// 		var showSourceText = "1";
//
// 		req.open("GET", endpoint + "url=" + sourceURL + "&apikey=" + apikey
// 				+ "&outputMode=" + outputMode + "&sourceText=" + sourceText
// 				+ "&showSourceText=" + showSourceText, true);
//
// 		req.addEventListener("load", function(){
// 			if (!(req.status >= 200 && req.status < 400)) {
// 				console.log("Error in network request" + req.statusText);
// 			} else {
// 				var response = JSON.parse(req.responseText);
// 				if(response.status == "ERROR"){
// 					console.log(response.statusInfo);
// 				}
// 				else {
// 					var angerFloat = parseFloat(response.docEmotions.anger);
// 					var disgustFloat = parseFloat(response.docEmotions.disgust);
// 					var fearFloat = parseFloat(response.docEmotions.fear);
// 					var joyFloat = parseFloat(response.docEmotions.joy);
// 					var sadnessFloat = parseFloat(response.docEmotions.sadness);
// 					var unknownFloat = Math.abs(1.0 - (angerFloat + disgustFloat + fearFloat + joyFloat + sadnessFloat));
//
//           document.getElementById("sourceURL").textContent = response.url;
// 					document.getElementById("sourceText").textContent = response.text;
// 					document.getElementById("anger").textContent = response.docEmotions.anger;
// 					document.getElementById("disgust").textContent = response.docEmotions.disgust;
// 					document.getElementById("fear").textContent = response.docEmotions.fear;
// 					document.getElementById("joy").textContent = response.docEmotions.joy;
// 					document.getElementById("sadness").textContent = response.docEmotions.sadness;
//
// 				// Doughnut Chart Options
// 				var doughnutOptions = {
// 					//Boolean - Whether we should show a stroke on each segment
// 					segmentShowStroke : true,
//
// 					//String - The colour of each segment stroke
// 					segmentStrokeColor : "#fff",
//
// 					//Number - The width of each segment stroke
// 					segmentStrokeWidth : 2,
//
// 					//The percentage of the chart that we cut out of the middle.
// 					percentageInnerCutout : 40,
//
// 					//Boolean - Whether we should animate the chart
// 					animation : true,
//
// 					//Number - Amount of animation steps
// 					animationSteps : 75,
//
// 					//String - Animation easing effect
// 					animationEasing : "easeOutBounce",
//
// 					//Boolean - Whether we animate the rotation of the Doughnut
// 					animateRotate : true,
//
// 					//Boolean - Whether we animate scaling the Doughnut from the centre
// 					animateScale : true,
//
// 					//Function - Will fire on animation completion.
// 					onAnimationComplete : null,
//
// 					//Legend - rounded
// 					tooltipTemplate : function(v) {return +(100 * v.value).toFixed(2);}
// 				}
//
// 				// Doughnut Chart Data
// 				var doughnutData = [
// 					{
// 						value : angerFloat,
// 						color : "#CB4B16",
// 						label : "Anger"
// 					},
// 					{
// 						value : disgustFloat,
// 						color : "#1F8261",
// 						label : "Disgust"
// 					},
// 					{
// 						value: fearFloat,
// 						color: "white",
// 						label : "Fear"
// 					},
// 					{
// 						value : joyFloat,
// 						color : "#FFA500",
// 						label : "Joy"
// 					},
// 					{
// 						value : sadnessFloat,
// 						color : "#1789D4",
// 						label : "Sadness"
// 					},
// 					{
// 						value : unknownFloat,
// 						color : "grey",
// 						label : "Unknown"
// 					}
//
// 				]
//
// 				//Get the context of the Doughnut Chart canvas element we want to select
//
// 				var ctx = document.getElementById("doughnutChart").getContext("2d");
// 				ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
//
// 				// Create the Doughnut Chart
// 				// Prevent Chart Resize by Destorying Old One
// 				if(mydoughnutChart != null){
// 					mydoughnutChart.destroy();
// 				}
//
// 				mydoughnutChart = new Chart(ctx).Doughnut(doughnutData, doughnutOptions);
//
// 				// Create Legend
// 				document.getElementById("js-legend").innerHTML = mydoughnutChart.generateLegend();
// 				}
// 	}});
// 	req.send(null);
// 	event.preventDefault();
// 	});
// }




// //Random User
// $.ajax({
//   url: 'https://randomuser.me/api/',
//   dataType: 'json',
//   success: function(data) {
//     console.log(data);
//   }
// });

//Giphy
 //
 // $.ajax({
 //  url: 'http://api.giphy.com/v1/gifs/search?q=' + postTitle + '&api_key=dc6zaTOxFJmzC',
 //  dataType: 'json',
 //  success: function(response) {
 //    // console.log(response.data);
 //    var resArr = response.data;
 //    var randomItem = resArr[Math.floor(Math.random()*resArr.length)];
 //
 //    giphUrl = randomItem.images.downsized_small.mp4;
 //    // resArr.forEach(function(i){
 //    //   //  console.log(i);
 //    // })
 //   }
 //  });




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
