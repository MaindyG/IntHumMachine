let session;
let media;
let isPlaying = true;
let currentVideoIndex = 0;
const applicationID = '3DDC41A0';
const videoList = [
    'https://transfertco.ca/video/DBillPrelude.mp4',
    'https://transfertco.ca/video/DBillSpotted.mp4',
    'https://transfertco.ca/video/usa23_7_02.mp4'
];

function Login(){
    document.getElementById('connectButton').addEventListener('click', () => {
        initializeApiOnly();
    });
}

function Previous(){
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (session) {
            currentVideoIndex = (currentVideoIndex - 1) % videoList.length;
            loadMedia(videoList[currentVideoIndex]);
        } else {
            alert('Connectez-vous sur chromecast en premier');
        }
    });
}

function Play(){
    document.getElementById('playBtn').addEventListener('click', () => {
        if (media) {
            if (isPlaying) {
                media.pause(null, onMediaCommandSuccess, onError);
            } else {
                media.play(null, onMediaCommandSuccess, onError);
            }
            isPlaying = !isPlaying;
        }
    });
}

function Next(){
    document.getElementById('nextBtn').addEventListener('click', () => {
        if (session) {
            currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
            loadMedia(videoList[currentVideoIndex]);
        } else {
            alert('Connectez-vous sur chromecast en premier');
        }
    });
}

function VolumeUp() {
    var volumeUpBtn = document.getElementById("volumeUpBtn");

    volumeUpBtn.classList.add("clicked");

    setTimeout(function() {
        volumeUpBtn.classList.remove("clicked");
    }, 100);

    // Add event listener for increasing volume
    document.getElementById('setVolHigh').addEventListener('click', function() {
        this.volumeLevel = Number(this._player.volumeLevel);
        this.volumeLevel += 0.1;
        if (this.volumeLevel > 1.0) {
            this.volumeLevel = 1.0;
        }
        this._player.setVolume(this.volumeLevel);
    }.bind(this)); // bind this to ensure it refers to the expected object
}

function VolumeDown() {
    var volumeDownBtn = document.getElementById("volumeDownBtn");

    volumeDownBtn.classList.add("clicked");

    setTimeout(function() {
        volumeDownBtn.classList.remove("clicked");
    }, 100);

    // Add event listener for decreasing volume
    document.getElementById('setVolLow').addEventListener('click', function() {
        this.volumeLevel = Number(this._player.volumeLevel);
        this.volumeLevel -= 0.1;
        if (this.volumeLevel < 0.0) {
            this.volumeLevel = 0.0;
        }
        this._player.setVolume(this.volumeLevel);
    }.bind(this)); // bind this to ensure it refers to the expected object
}



function Mute() {
    var button = document.getElementById('muteButton');
    var old = button.muted;
    button.muted = !button.muted;
    if (old !== button.muted) {
        button.trigger(button.muted ? 'mute' : 'unmute');
    }
}

document.getElementById('muteButton').addEventListener('click', function() {
    if (!this.muted) {
        return this._controller.muteOrUnmute();
    } else {
        return this._controller.muteOrUnmute();
    }
});


function Info(){
    document.getElementById('info').addEventListener('click', () => {
        return this.title
    
    });
}