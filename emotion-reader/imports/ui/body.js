import {Template} from 'meteor/templating';
import {Items} from '../api/items.js';
import './body.html';
// import '../server/main.js';



var postTitle;
var postText;
var giphUrl;

//helper-
//check if user is logged in
Template.body.onCreated(function(){
    Meteor.subscribe('posts'); //string name of our publications
    //Activate Bootstrap tooltip
    $('.about').tooltip("hover focus");
});

Template.body.helpers({
    loggedIn() {
       return Meteor.userId();
    }
})

//event-method that accepts an object
Template.body.events({
  //the first property is a string
  "click #emotionBtn": (event) => {
    $( "#myModal" ).off();
    $('#myModal').modal('show');
    addD3();
    Meteor.call('emotion',function(err, response) {
           Session.set('sadness', response);
           console.log(sadness);
       });

       //D3 graph
   function addD3() {
    var svg = d3.select("#modalBody")
    	.append("svg")
    	.append("g")

    svg.append("g")
    	.attr("class", "slices");
    svg.append("g")
    	.attr("class", "labels");
    svg.append("g")
    	.attr("class", "lines");

    var width = 960,
        height = 450,
    	radius = Math.min(width, height) / 2;

    var pie = d3.layout.pie()
    	.sort(null)
    	.value(function(d) {
    		return d.value;
    	});

    var arc = d3.svg.arc()
    	.outerRadius(radius * 0.8)
    	.innerRadius(radius * 0.4);

    var outerArc = d3.svg.arc()
    	.innerRadius(radius * 0.9)
    	.outerRadius(radius * 0.9);

    svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var key = function(d){ return d.data.label; };
    var arr = [15.86, 60.28, 9.36, 1.12, 6.56, 9];
    var color = d3.scale.ordinal()
    	.domain(["sadness", "joy", "fear", "disgust", "anger", "unknown emotion"])
    	.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


    function randomData (){
    	var labels = color.domain();
              console.log(arr);
    	return labels.map(function(label, index){

    		return { label: label, value: arr[index] }
    	});
    }

    change(randomData());

    d3.select(".randomize")
    	.on("click", function(){
    		change(randomData());
    	});


    function change(data) {

    	/* ------- PIE SLICES -------*/
    	var slice = svg.select(".slices").selectAll("path.slice")
    		.data(pie(data), key);

    	slice.enter()
    		.insert("path")
    		.style("fill", function(d) { return color(d.data.label); })
    		.attr("class", "slice");

    	slice
    		.transition().duration(1000)
    		.attrTween("d", function(d) {
    			this._current = this._current || d;
    			var interpolate = d3.interpolate(this._current, d);
    			this._current = interpolate(0);
    			return function(t) {
    				return arc(interpolate(t));
    			};
    		})

    	slice.exit()
    		.remove();

    	/* ------- TEXT LABELS -------*/

    	var text = svg.select(".labels").selectAll("text")
    		.data(pie(data), key);

    	text.enter()
    		.append("text")
    		.attr("dy", ".35em")
    		.text(function(d) {
    			return d.data.label;
    		});

    	function midAngle(d){
    		return d.startAngle + (d.endAngle - d.startAngle)/2;
    	}

    	text.transition().duration(1000)
    		.attrTween("transform", function(d) {
    			this._current = this._current || d;
    			var interpolate = d3.interpolate(this._current, d);
    			this._current = interpolate(0);
    			return function(t) {
    				var d2 = interpolate(t);
    				var pos = outerArc.centroid(d2);
    				pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
    				return "translate("+ pos +")";
    			};
    		})
    		.styleTween("text-anchor", function(d){
    			this._current = this._current || d;
    			var interpolate = d3.interpolate(this._current, d);
    			this._current = interpolate(0);
    			return function(t) {
    				var d2 = interpolate(t);
    				return midAngle(d2) < Math.PI ? "start":"end";
    			};
    		});

    	text.exit()
    		.remove();

    	/* ------- SLICE TO TEXT POLYLINES -------*/

    	var polyline = svg.select(".lines").selectAll("polyline")
    		.data(pie(data), key);

    	polyline.enter()
    		.append("polyline");

    	polyline.transition().duration(1000)
    		.attrTween("points", function(d){
    			this._current = this._current || d;
    			var interpolate = d3.interpolate(this._current, d);
    			this._current = interpolate(0);
    			return function(t) {
    				var d2 = interpolate(t);
    				var pos = outerArc.centroid(d2);
    				pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
    				return [arc.centroid(d2), outerArc.centroid(d2), pos];
    			};
    		});

    	polyline.exit()
    		.remove();
    };
  }

    //D3 graph ends here

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
