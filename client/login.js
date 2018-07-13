import { Template } from 'meteor/templating';
import { OAuth } from 'meteor/oauth'
import { Meteor } from 'meteor/meteor'
import { Random } from 'meteor/random'
import { HTTP } from 'meteor/http'
import { Session } from 'meteor/session';
// import { Usernames } from '../lib/collections.js'

import './main.html';
if(Meteor.isClient) {


Template.login.onRendered( () => {
	Session.set('name', (Router.current().params.query["openid.ax.value.fullname"])),
 console.log(Session.get('name'));
console.log(Session.equals('name', (Router.current().params.query["openid.ax.value.fullname"])));
  console.log(Router.current().params.query);
  console.log(Router.current().params.query["openid.identity"])


  // store identity in a session or persistant storage such as mongoDB?
  //Router.current().params.query["openid.identity"]

});


Template.login.events({
  'click button'(event, instance) {


    try {


      var loginUrl = 'https://openid.nus.edu.sg/auth/' +
      '?openid.ns=http://specs.openid.net/auth/2.0' +
      '&openid.mode=checkid_setup' +
      '&openid.return_to=http://localhost:3000' +
      '&openid.realm=' + Meteor.absoluteUrl() +
      '&openid.ax_mode=fetch_request' +
      '&openid.ns.ax=http://openid.net/srv/ax/1.0' +
      '&openid.ns.sreg=http://openid.net/extensions/sreg/1.1' +
      '&openid.identity=http://specs.openid.net/auth/2.0/identifier_select' +
      '&openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select' +
      '&openid.ax.type.contact_email=http://axschema.org/contact/email' +
      '&openid.ax.type.fullname=http://axschema.org/namePerson' +
      '&openid.ax.type.user_id= http://axschemas.org/user/id' +
      '&openid.ax.type.nickname=http://axschema.org/contact/nickname' +
      '&openid.ax.required=contact_email, fullname' +
      '&oopenid.sreg.required=email' +
      '&oopenid.sreg.required=fullname' +
      '&oopenid.sreg.required=nickname' +
      "&controller=server&action=index&module=default"

      OAuth.launchLogin({
        loginService: 'nus',
        loginStyle: "redirect",
        loginUrl: loginUrl,

        credentialRequestCompleteCallback: function(data)
        {
          console.log(data)
        },
        credentialToken: Random.secret()

      });

    } catch (e) {
      console.log("error")
    }



	// var fullname = (Router.current().params.query["openid.ax.value.fullname"]);
	// var email = (Router.current().params.query["openid.ax.value.contact_email"]);
	//
	// Meteor.call('Usernames.insert', fullname, email);
},

   //  'click button': function(event) {
 	 // 	var fullname = (Router.current().params.query["openid.ax.value.fullname"]);
 	 // 	var email = (Router.current().params.query["openid.ax.value.contact_email"]);
	 //
 	 // 	Accounts.createUser({
 	 // 					fullname: fullname,
 	 // 					email: email,
	 //
 	 // 					profile: {
 	 // 			likeScore: 0,
 	 // 			commentScore: 0,
 	 // 			dislikeScore: 0,
 	 // 			voted: [],
 	 // 		}
 	 // 	});
 	 // }
});

Template.login.helpers({
  testing: function() {
  //var fullname = (Router.current().params.query["openid.ax.value.fullname"]);
  //  return fullname;
 return Session.get('name');
  },

	loggedIn: function() {
		 //  var fullname = (Router.current().params.query["openid.ax.value.fullname"]);
		//	  if (fullname != null) {
		if (Session.get('name')!= null) {
			  	return true;
		//	return Session.equals('userId', (Router.current().params.query["openid.ax.value.fullname"]));
			}
		}

});

// Tracker.autorun(function(){
// 	if (loggedIn) {
// 		Router.go("/reviews");
// 	}
// });

// Template.login.rendered = function() {
// 	$("#login-link").addClass('selected');
// 	$("#profile-link").removeClass('selected');
// 	$("#rankings-link").removeClass('selected');
// 	$("#search-link").removeClass('selected');
// 	$("#reviews-link").removeClass('selected');
// }
}
