"use strict";
$(document).ready(function() {

	//SELECTING VIEWS // 
	var addLink = $("#addBtn");
	var addView = $("#userInputView");
	var listView = $("#listView");
	var listLink = $("#listBtn");
	//GLOBAL VARIABLE
	var songsArray = [];


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
			songData += `<div class="col-sm-2 col-md-2"><button type="button" class="btn btn-danger deleteBtn">Delete</button></div>`;
			songData += `</div>`;
		};
		// songData += `<div class="row" id="moreBtnDiv"><button type="button" class="btn moreBtn">More</button></div>`;
		songsEl.html(songData);

	};

	//fUNCTION ON LOAD TO POPULATE DOM // 
	function executeThisCodeAfterFileIsLoaded (data) {
		// MAKE data object an array called songsArray
			for(var i in data){
	  		console.log(">>>>>", data[i]);
	  		songsArray.push(data[i]);
	  	};
		outputSongstoDOM(songsArray);
	};


	// GETTING DATA FROM FIREBASE // 
	
	 $.ajax({
	    url: "https://scorching-torch-2191.firebaseio.com/songs.json",
	    method: "GET"
	    // data: JSON.stringify(data)
	  }).done(function(data) {
	  	console.log("data from firebase!!::::", data);
	    executeThisCodeAfterFileIsLoaded(data);
	  });


	//////////// GETTING USER INPUT FROM THE DOM ////////////
	$("#userSongSubmitBtn").click(function() {
		var songName = $("#songInput").val();
		var artistName = $("#artistInput").val();
		var albumName = $("#albumInput").val();
		listView.removeClass("hidden");
		addView.addClass("hidden");
		var songObject = {
			title: songName,
			artist: artistName,
			album: albumName
		};
		songsArray.push(songObject);
		outputSongstoDOM(songsArray);
		$("#songInput").val("");
		$("#artistInput").val("");
		$("#albumInput").val("");

	});

	/********************
	DELETE BUTTON 
	**********************/

	$("#listView").click(function(event){
		console.log("clicked");
		if ($(event.target).hasClass("deleteBtn")) {
			console.log("has a class");
			console.log(event.target);
			$(event.target).parentsUntil("#listView").remove();
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


}); //  END OF DOC.READY FUNCTION 
