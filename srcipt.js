// ===========================================================
//              All DOM Elements
// ===========================================================

const togglePlayListBtn = document.getElementById("toggle-playlist")
// ===========================================================
const trackImage = document.getElementById("track-image")
const songTitle = document.getElementById("title")
const songArtist = document.getElementById("artist")
//  ==========================================================         
const currentSongTime = document.getElementById("current-time")
const totalSongTime = document.getElementById("duration-time")
const songDurationSlider = document.getElementById("duration-slider")
//  ==========================================================         
const prevButton = document.getElementById("prev")
const playButton = document.getElementById("play")
const nextButton = document.getElementById("next")

//  ==========================================================         
const autoplayAllBtn = document.getElementById("play-all")
//  ==========================================================         
const showVolume = document.getElementById("show-volume")
const volumeIcon = document.getElementById("volume-icon")
const volumeSlider = document.getElementById("volume")
//  ==========================================================         
const closePlaylist = document.getElementById("close-playlist")
const songPlaylist = document.getElementById("playlist")
const completeList = document.getElementById("playlist-div")
//  ==========================================================         
const musicLines = document.querySelectorAll(".motion")

// ===========================================================
//              All Required Variables
// ===========================================================
let songsList = [
    {
        img:"./images/hanan.jpg",
        title:"Iraaday",
        path:"./music/iraaday.mp3",
        artist:"Abdul Hanan & Rovalio",
    },
    {
        img:"./images/ali-zafar.jpg",
        title:"Jhoom",
        path:"./music/jhoom.mp3",
        artist:"Ali Zafar",
    },
    {
        img:"./images/arijit-singh.jpg",
        title:"Channa Meeraya",
        path:"./music/chaana-meeraya.mp3",
        artist:"Arijit Singh",
    },
    {
        img:"./images/nusrat.jpg",
        title:"Kali Kali Zulfon",
        path:"./music/kali-zulfain.mp3",
        artist:"Nusrat Fateh Ali Khan",
    },
    {
        img:"./images/images.jpg",
        title:"Unki Masom Nazroon Sai",
        path:"./music/massom.mp3",
        artist:"Nusrat Fateh Ali Khan",
    },

]

let timer;
let autoplay = false;  // Start with autoplay off
let songIndex = 1;
let songIsPlaying = false;
let track = document.createElement("audio")

// ===========================================================
//              All Functions
// ===========================================================

// reset song slider
const resetSongSlider = () =>{
    songDurationSlider.value = 0;
}

// function to update song slider
const updateSongSlider = () => {
    let pos = 0;
    if (!isNaN(track.duration)) {
        pos = track.currentTime * (100 / track.duration);
        songDurationSlider.value = pos;
    }
    if (track.ended) {
        playButton.innerHTML = '<i class="fas fa-play"></i>';
        if (autoplay == 1 && indexTrack < trackList.length - 1) {
          indexTrack++;
          loadTrack(indexTrack);
          playSong();
        } else if (autoplay == 1 && indexTrack == trackList.length - 1) {
          indexTrack = 0;
          loadTrack(indexTrack);
          playSong();
        }
      }
}

// Function to toggle playlist
const togglePlaylist = () => {
    songPlaylist.classList.toggle("show");
}

// Function to load a song
const loadSong = (songIndex) => {
    clearInterval(timer);
    resetSongSlider();

    track.src = songsList[songIndex].path;
    songTitle.innerHTML = songsList[songIndex].title;
    songArtist.innerText = songsList[songIndex].artist;
    trackImage.src = songsList[songIndex].img;
    track.load();

    timer = setInterval(updateSongSlider, 1000); // Pass the function reference, not the call
}

loadSong(songIndex);

// Function to play or pause the song
const playSong = () => {
    if(!songIsPlaying){
        songIsPlaying = true;
        track.play();
        playButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        trackImage.classList.add("rotate");
        musicLines.forEach(line => {
            line.classList.add("start");
        });
    }
    else{
        songIsPlaying = false;
        track.pause();
        playButton.innerHTML = `<i class="fas fa-play"></i>`;
        trackImage.classList.remove("rotate");
        musicLines.forEach(line => {
            line.classList.remove("start");
        });
    }
}

// Function to play the next song
const nextSong = () => {
    songIndex = (songIndex + 1) % songsList.length; 
    loadSong(songIndex);
    playSong();
}

// Function to play the previous song
const prevSong = () => {
    songIndex = (songIndex - 1 + songsList.length) % songsList.length; 
    loadSong(songIndex);
    playSong();
}

// Function to toggle autoplay
const toggleAutoplay = () => {
    autoplay = !autoplay;
    autoplayAllBtn.classList.toggle("active", autoplay);
    autoplayAllBtn.innerHTML = autoplay ? `<i class="fa fa-random active"></i>` : `<i class="fa fa-random"></i>`;
}

// Function to mute sound
const muteSound = () => {
    if (track.volume > 0) {
        volumeIcon.className = "fas fa-volume-mute";
        showVolume.innerText = 0;
        track.volume = 0;
        volumeSlider.value = 0;
    } else {
        volumeIcon.className = "fas fa-volume-high";
        showVolume.innerText = `${65}%`; 
        track.volume = 0.65; 
        volumeSlider.value = 65;
    }
}

// Function to change volume
const changeVolume = () => {
    track.volume = volumeSlider.value / 100;
    showVolume.innerText = `${volumeSlider.value}%`;
    if(volumeSlider.value == 0){
        volumeIcon.className = "fas fa-volume-mute";
    }
    else if(volumeSlider.value <= 50){
        volumeIcon.className = "fas fa-volume-low"; 
    }
    else{
        volumeIcon.className = "fas fa-volume-high";
    }
}

// Function to change song time

const changeSongTime = () => {
    let currentTime = track.duration * (songDurationSlider.value / 100)
    track.currentTime = currentTime;
}

// Function to update song timer
const updateSongTimer = () => {
    let curmins = Math.floor(track.currentTime / 60);
    let cursecs = Math.floor(track.currentTime % 60);
    let durmins = Math.floor(track.duration / 60);
    let dursecs = Math.floor(track.duration % 60);

    if (dursecs < 10) {
        dursecs = "0" + dursecs;
    }
    if (durmins < 10) {
        durmins = "0" + durmins;
    }
    if (curmins < 10) {
        curmins = "0" + curmins;
    }
    if (cursecs < 10) {
        cursecs = "0" + cursecs;
    }

    currentSongTime.innerText = `${curmins}:${cursecs}`;
    totalSongTime.innerText = `${durmins}:${dursecs}`;

    if (isNaN(track.duration)) {
        currentSongTime.innerText = "00:00";
        totalSongTime.innerText = "00:00";
    }
};

// Function to display all songs in the playlist
// Function to display songs in the playlist
const displayPlaylist = () => {
    completeList.innerHTML = ""; // Clear the playlist
    songsList.forEach((song, index) => {
        const songItem = document.createElement("div");
        songItem.className = "playlist-item";
        songItem.innerHTML = `
            <div class="playlist-details">
                <span class="playlist-title">${song.title}</span>
                <span class="playlist-artist">${song.artist}</span>
            </div>
            <button class="play-button" data-index="${index}"><i class="fas fa-play"></i></button>
        `;
        
        songItem.querySelector(".play-button").addEventListener("click", () => {
            songIndex = index; // Update the song index
            loadSong(songIndex); // Load the selected song
            playSong(); // Play the selected song
        });

        completeList.appendChild(songItem); // Add the song item to the playlist
    });
}

// Call displayPlaylist to initialize the playlist
// displayPlaylist();


// ===========================================================
//              All Event Listeners
// ===========================================================

// Event Listener to show playlist
togglePlayListBtn.addEventListener("click", () => {
    togglePlaylist();
    displayPlaylist()
    
})

// Event Listener to hide playlist
closePlaylist.addEventListener("click", () => {
    togglePlaylist();
})

// Event Listener to play/pause song
playButton.addEventListener("click", () => {
    playSong();
})

// Event Listener to play the next song
nextButton.addEventListener("click", () => {
    nextSong();
})

// Event Listener to play the previous song
prevButton.addEventListener("click", () => {
    prevSong();
})

// Event Listener to toggle autoplay
autoplayAllBtn.addEventListener("click", () => {
    toggleAutoplay();
})

// Event Listener to autoplay the next song when the current one ends
track.addEventListener('ended', () => {
    nextSong()
    if (autoplay) {
        nextSong();
    }
})

// Event Listener to mute sound
volumeIcon.addEventListener('click', (e) =>{
    muteSound()
})
//Event Listener to change volume
volumeSlider.addEventListener('input', (e) => {
    changeVolume()
})

// Event Listener to change song current time or duration
songDurationSlider.addEventListener("change",(e) => {
    changeSongTime()
})

// Event listener to update thr song timer
track.addEventListener("timeupdate",(e) => {
    updateSongTimer()
})
// ===========================================================
//              Init
// ===========================================================

loadSong(songIndex);

