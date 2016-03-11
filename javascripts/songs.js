"use strict";
$(document).ready(function() {

	//SELECTING VIEWS // 
	var addLink = $("#addBtn");
	var addView = $("#userInputView");
	var listView = $("#listView");
	var listLink = $("#listBtn");
	var loginView = $("#loginView");
	var mainCont = $("main-outer-container");
	var navBar = $("#navBar");
	var btn = $("#fullBtnContainer");
	//GLOBAL VARIABLE
	

	var songsRef = new Firebase("https://blair-music-history.firebaseio.com/songs");

	songsRef.on("value", function(snapshot) {
	  console.log(snapshot.val());
	  executeThisCodeAfterFileIsLoaded(snapshot.val());
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});



	addLink.click("click", function () {
	  listView.addClass("hidden");
	  addView.removeClass("hidden");
	  $(".moreBtn").addClass("hidden");
	});

	listLink.click("click", function () {
		listView.removeClass("hidden");
		addView.addClass("hidden");
		$(".moreBtn").removeClass("hidden");
	});

	// OUTPUT TO DOM // 
	

	function outputSongstoDOM(songs) {
		console.log("got to outputSongstoDOM function");
		console.log(songs);
		var songsEl = $("#listView");
	 	var songData = ""; // intial blank string to hold data
		for (var i = 0; i < songs.length; i++) {
			songData += `<div class ="row" id="songList">`;
			songData += `<div class="col-sm-4 col-md-4"><h3>${songs[i].artist}</h3></div>`;
			songData += `<div class="col-sm-3 col-md-3"><h5>${songs[i].title}</h5></div>`;
			songData += `<div class="col-sm-3 col-md-3"><h5>${songs[i].album}</h5></div>`;
			songData += `<div class="col-sm-2 col-md-2"><button type="button" id=${songs[i].key} class="btn btn-danger deleteBtn">Delete</button></div>`;
			songData += `</div>`;
		};
		// songData += `<div class="row" id="moreBtnDiv"><button type="button" class="btn moreBtn">More</button></div>`;
		songsEl.html(songData);

	};

	//fUNCTION ON LOAD TO POPULATE DOM // 
	function executeThisCodeAfterFileIsLoaded (data) {
		var songsArray = [];

		// MAKE data object an array called songsArray
		for (var i in data) {
			// add the object's unique firebase key into the object
			data[i].key = i;
	  		console.log(">>>>>", data[i]);
	  		songsArray.push(data[i]);
	  	};
	  	console.log("ALL THE STUFF WITH KEYS:::::", songsArray);
		outputSongstoDOM(songsArray);
	};





	//////////// GETTING USER INPUT FROM THE DOM ////////////
	$("#userSongSubmitBtn").click(function() {
		var songName = $("#songInput").val();
		var artistName = $("#artistInput").val();
		var albumName = $("#albumInput").val();
		listView.removeClass("hidden");
		addView.addClass("hidden");
		// create object for database
		var songObject = {
			title: songName,
			artist: artistName,
			album: albumName
		};
		// add song object to database
		songsRef.push(songObject);
	});

	/********************
	DELETE BUTTON 
	**********************/

	$("#listView").click(function(event){
		console.log("clicked");
		if ($(event.target).hasClass("deleteBtn")) {
			var deleteRef = new Firebase("https://blair-music-history.firebaseio.com/songs/" + event.target.id);
			deleteRef.remove();
		} // end if
	});


	/************************
	Submit filter button
	*************************/
	$("#submitBtn").click(function(event){
		console.log("clickedBtn");
		console.log("artist=", $("#artist-select").val());
		console.log("album=", $("#album-select").val());


	});



/*****************************
MORE BUTTON
*******************************/

	$(".songcontainer").click(function(event) {
		// if the click is on the more button
		if ($(event.target).hasClass("moreBtn")) {
			console.log(event.target);
			// get second json file data
			$.get("lib2.json", function(moreData) {
	  			
	  			var newSongData = "";
	  			// put together full string for dom
				for (var i = 0; i < moreData.songs2.length; i++) {
					newSongData += `<div class ="row" id="songList">`;
					newSongData += `<div class="col-sm-4 col-md-4"><h3>${moreData.songs2[i].artist}</h3></div>`;
					newSongData += `<div class="col-sm-3 col-md-3"><h5>${moreData.songs2[i].title}</h5></div>`;
					newSongData += `<div class="col-sm-3 col-md-3"><h5>${moreData.songs2[i].album}</h5></div>`;
					newSongData += `<div class="col-sm-2 col-md-2"><button type="button" class="btn btn-danger deleteBtn">Delete</button></div>`;
					newSongData += `</div>`;
				};
				// append new songs to original list in listView
  				$('#listView').append(newSongData);
			});
		};
	});


/****************************
LOGIN VIEW
****************************/

	$("#createSubmitBtn").click(function() {
			var userEmail = $("#userEmail").val();
			var userPassword = $("#userPassword").val();
			console.log(userEmail);
			console.log(userPassword);
			// listView.removeClass("hidden");
			// mainCont.removeClass("hidden");
			// loginView.addClass("hidden");
			var ref = new Firebase("https://blair-music-history.firebaseio.com/");
			ref.createUser({
			  email    : userEmail,
			  password : userPassword,
			}, function(error, userData) {
			  if (error) {
			    console.log("Error creating user:", error);
			    alert("Please enter a valid email address");
			  } else {
			    console.log("Successfully created user account with uid:", userData.uid);
			    listView.removeClass("hidden");
			    mainCont.removeClass("hidden");
			    loginView.addClass("hidden");
			    navBar.removeClass("hidden");
			    btn.removeClass("hidden");
			  }
			});
	});


	$("#loginSubmitBtn").click(function(){
			var userEmail = $("#userEmail").val();
			var userPassword = $("#userPassword").val();
			console.log(userEmail);
			console.log(userPassword);
			console.log("clickedlogin");

			var ref = new Firebase("https://blair-music-history.firebaseio.com/");
			ref.authWithPassword({
			  email    : userEmail,
			  password : userPassword,
			}, function(error, authData) {
			  if (error) {
			    console.log("Login Failed!", error);
			    alert("please create an account to login");
			  } else {
			    console.log("Authenticated successfully with payload:", authData);
			     listView.removeClass("hidden");
			    mainCont.removeClass("hidden");
			    loginView.addClass("hidden");
			    navBar.removeClass("hidden");
			    btn.removeClass("hidden");

			  }
			});
	});

    



}); //  END OF DOC.READY FUNCTION 
