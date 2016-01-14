var songs = [];

songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";


songs.push("Down The Line > by Sam Amidon > LilyO");
console.log("songs is", songs)

songs.pop();
console.log("pop off", songs)

songs.push("Down The Line > by Sam Amidon > LilyO");
console.log("added", songs)

songs.unshift("Lazarus > by David Bowie > Blackstar");
console.log("at the beginning", songs)

var songs = songs;
console.log(songs.indexOf(">"));

var songs;
console.log("songs is", songs);

var songs = songs
var mainSection = document.getElementById("main-content");
mainSection.innerHTML = songs;

for (var i = 0; i < songs.length; i++) {
 songs[i] = songs[i].replace(/>/g, "-").replace(/\(/g, "").replace(/@/g, "").replace(/\*/g, ""); 
};
console.log("replaced", songs)

var formattedSongs = "";

for (var i = 0; i < songs.length; i++) {
	formattedSongs += "<p>" + songs[i] + "</p>";
};


var mainSection = document.getElementById("main-content");
mainSection.innerHTML = formattedSongs;	

// for (var i = 0; i < song.length; i++) {
// 	song[i] =songs[i].replace(/\(/g, "")
// 		console.log(songs, i);
// };
