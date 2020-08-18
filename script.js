const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const lyricsShow = document.getElementById('lyricsData');

const apiURL = 'https://api.lyrics.ovh';

// Get lyrics 
async function getLyrics(artist, songTitle) {
	const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
	const data = await res.json();
	const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

	lyricsShow.innerHTML = `
		     <div class="single-lyrics text-center">
                  <h2 class="text-success mb-4"> ${artist} - ${songTitle}</h2>
                  <div class="lyric text-white">
                  		${lyrics}
                  </div>
             </div>
	`
}




// Get Lyrics button clicked
result.addEventListener('click', e => {

    const clickedEl = e.target;

    if( clickedEl.tagName === "BUTTON") {
        const artist = clickedEl.getAttribute('data-artist');
        const songTitle = clickedEl.getAttribute('data-songtitle');
        getLyrics(artist, songTitle);
    }
    
} )


// Show data 
function showData (data) {
	let output = '';

	data.data.slice(0, 10).forEach(song => {
		output += `
				<div class="single-result row align-items-center my-3 p-3">	
			        <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" data-artist = "${song.artist.name}" data-songtitle = "${song.title}">Get Lyrics</button>
                    </div>
                </div>    
		`

		result.innerHTML = `
			 <div class="search-result col-md-8 mx-auto py-4">
			 	${output}
			 </div>
		`
	})
}


// Search Songs 
async function searchSongs (term) {
	const res = await fetch(`${apiURL}/suggest/${term}`);
	const data = await res.json();
	console.log(data);
	showData(data);
}


// Add event Listener
form.addEventListener('click', e => {
    e.preventDefault();

    const searchTerm = search.value.trim();

    if ( !searchTerm ) {
        alert('Please Type the song name what you want');
    } else {
    	searchSongs(searchTerm);
    }
    
})