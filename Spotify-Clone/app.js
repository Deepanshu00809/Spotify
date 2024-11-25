const music = new Audio('vande.mp3');

// create Array 

const songs = [
    {
        id:'1',
        songName:` On My Way `,
        poster: "img/1.jpg"
    },
    {
        id:'2',
        songName:` Alan Walker-Fade `,
        poster: "img/2.jpg"
    },
    // all object type 
    {
        id:"3",
        songName: `Cartoon - On & On `,
        poster: "img/3.jpg",
    },
    {
        id:"4",
        songName: `Warriyo - Mortals `,
        poster: "img/4.jpg",
    },
    {
        id:"5",
        songName: `Ertugrul Gazi `,
        poster: "img/5.jpg",
    },
    {
        id:"6",
        songName: `Electronic Music `,
        poster: "img/6.jpg",
    },
    {
        id:"7",
        songName: `Agar Tum Sath Ho `,
        poster: "img/7.jpg",
    },
    {
        id:"8",
        songName: `Suna Hai `,
        poster: "img/8.jpg",
    },
    {
        id:"9",
        songName: `Dilber `,
        poster: "img/9.jpg",
    },
    {
        id:"10",
        songName: `Duniya `,
        poster: "img/10.jpg",
    },
    {
        id:"11",
        songName: `Lagdi Lahore Di `,
        poster: "img/11.jpg",
    },
    {
        id:"12",
        songName: `Putt Jatt Da `,
        poster: "img/12.jpg",
    },
    {
        id:"13",
        songName: `Baarishein `,
        poster: "img/13.jpg",
    },
    {
        id:"14",
        songName: `Vaaste `,
        poster: "img/14.jpg",
    },
    {
        id:"15",
        songName: `Lut Gaye `,
        poster: "img/15.jpg",
    },
    {
        id:"16",
        songName: `Big Daws `,
        poster: "img/16.jpg",
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})


let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
} )


const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
            element.classList.add('bi-play-circle-fill');
            element.classList.remove('bi-pause-circle-fill');
    })
}
const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
            element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');
Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `audio/${index}.mp3`;
        poster_master_play.src =`img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele)=>{
            return ele.id == index;
        })

        song_title.forEach(ele =>{
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended',()=>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    })
})


let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];

music.addEventListener('timeupdate',()=>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10) {
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if (sec1<10) {
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', ()=>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})


let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})



let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', ()=>{
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src =`img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    
})
next.addEventListener('click', ()=>{
    index -= 0;
    index += 1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
        }
    music.src = `audio/${index}.mp3`;
    poster_master_play.src =`img/${index}.jpg`;
    music.play();
    let song_title = songs.filter((ele)=>{
        return ele.id == index;
    })

    song_title.forEach(ele =>{
        let {songName} = ele;
        title.innerHTML = songName;
    })
    makeAllPlays()

    document.getElementById(`${index}`).classList.remove('bi-play-fill');
    document.getElementById(`${index}`).classList.add('bi-pause-fill');
    makeAllBackgrounds();
    Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    
})


let left_scroll = document.getElementById('left_scroll');
let right_scroll = document.getElementById('right_scroll');
let pop_song = document.getElementsByClassName('pop_song')[0];

left_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft -= 330;
})
right_scroll.addEventListener('click', ()=>{
    pop_song.scrollLeft += 330;
})


let left_scrolls = document.getElementById('left_scrolls');
let right_scrolls = document.getElementById('right_scrolls');
let item = document.getElementsByClassName('item')[0];

left_scrolls.addEventListener('click', ()=>{
    item.scrollLeft -= 330;
})
right_scrolls.addEventListener('click', ()=>{
    item.scrollLeft += 330;
})


document.getElementById("voice-search").addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    
    recognition.onstart = () => {
        console.log("Voice recognition started. Speak now.");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript.toLowerCase();
        console.log("You said: " + transcript);
        searchSongs(transcript);
    };

    recognition.onerror = (event) => {
        console.error("Error occurred in recognition: " + event.error);
    };

    recognition.start();
});

// Function to search for songs based on the query and display in a dropdown
function searchSongs(query) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (query) {
        const results = songs.filter(song => 
            song.songName.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length > 0) {
            resultsContainer.style.display = "block"; // Show dropdown
            results.forEach(result => {
                const resultItem = document.createElement("div");
                resultItem.innerHTML = result.songName;

                // Click event to play the selected song
                resultItem.addEventListener("click", () => {
                    playSong(result.id);
                    resultsContainer.style.display = "none"; // Hide dropdown on selection
                    document.getElementById("manual-search").value = result.songName; // Set input to selected song
                });
                resultsContainer.appendChild(resultItem);
            });
        } else {
            resultsContainer.style.display = "none"; // Hide dropdown if no results
        }
    } else {
        resultsContainer.style.display = "none"; // Hide dropdown if query is empty
    }
}

// Function to play the selected song
function playSong(id) {
    const song = songs.find(s => s.id === id);
    if (song) {
        music.src = `audio/${id}.mp3`; // Assuming audio files are named by id
        music.play();

        // Update the UI with the song details
        document.getElementById("poster_master_play").src = song.poster;
        document.getElementById("title").innerHTML = song.songName;
        
        // Additional play/pause controls
        const masterPlay = document.getElementById('masterPlay');
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
    }
}

// Event listeners
document.getElementById("manual-search").addEventListener("input", (event) => {
    searchSongs(event.target.value);
});

document.addEventListener("click", (e) => {
    const searchResults = document.getElementById("search-results");
    if (!searchResults.contains(e.target) && e.target.id !== "manual-search") {
        searchResults.style.display = "none";
    }
});

