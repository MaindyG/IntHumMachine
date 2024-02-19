let currentSession;
let currentMediaSession;
let isPlaying = true;
let currentVideoIndex = 0;
let currentVideoUrl;
let updateInterval;
const seekSlider = document.getElementById('seekSlider');
const currentTimeElement = document.getElementById('currentTime');
const totalTimeElement = document.getElementById('totalTime');
const defaultContentType = 'video/mp4';
const applicationID = '3DDC41A0';
const videoList = [
    'https://transfertco.ca/video/DBillPrelude.mp4',
    'https://transfertco.ca/video/DBillSpotted.mp4',
    'https://transfertco.ca/video/usa23_7_02.mp4'
    // Add more video URLs as needed
];

document.getElementById('connectButton').addEventListener('click', () => {
    initializeApiOnly();
});

document.getElementById('playBtn').addEventListener('click', () => {
    if (currentSession) {
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentSession) {
        currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
        loadMedia(videoList[currentVideoIndex]);
    } else {
        alert('Connectez-vous sur chromecast en premier');
    }
});

document.getElementById('playBtn').addEventListener('click', () => {
    if (currentMediaSession) {
        if (isPlaying) {
            currentMediaSession.pause(null, onMediaCommandSuccess, onError);
        } else {
            currentMediaSession.play(null, onMediaCommandSuccess, onError);
        }
        isPlaying = !isPlaying;
    }
});


function sessionListener(newSession) {
    currentSession = newSession;
    document.getElementById('playBtn').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'block';
}



function initializeSeekSlider(remotePlayerController, mediaSession) {
    currentMediaSession = mediaSession;
    document.getElementById('playBtn').style.display = 'block';
   // Set max value of seek slider to media duration in seconds
   seekSlider.max = mediaSession.media.duration;

    // Update seek slider and time elements on time update
    updateInterval = setInterval(() => {
        const currentTime = mediaSession.getEstimatedTime();
        const totalTime = mediaSession.media.duration;
  
        seekSlider.value = currentTime;
        currentTimeElement.textContent = formatTime(currentTime);
        totalTimeElement.textContent = formatTime(totalTime);
      }, 1000); //chaque 1000 ms... 1 sec
  
      // slider change
      seekSlider.addEventListener('input', () => {
        const seekTime = parseFloat(seekSlider.value);
        remotePlayerController.seek(seekTime);
      });
 }

function receiverListener(availability) {
    if (availability === chrome.cast.ReceiverAvailability.AVAILABLE) {
        document.getElementById('connectButton').style.display = 'block';
    } else {
        document.getElementById('connectButton').style.display = 'none';
    }
}

function onInitSuccess() {
    console.log('Chromecast init success');
}

function onError(error) {
    console.error('Chromecast initialization error', error);
}

function onMediaCommandSuccess() {
    console.log('Media command success');
}

function initializeApiOnly() {
    
    const sessionRequest = new chrome.cast.SessionRequest(chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function loadMedia(videoUrl) {
    currentVideoUrl = videoUrl;
    const mediaInfo = new chrome.cast.media.MediaInfo(videoUrl, defaultContentType);
    const request = new chrome.cast.media.LoadRequest(mediaInfo);
    const remotePlayer = new cast.framework.RemotePlayer();
    const remotePlayerController = new cast.framework.RemotePlayerController(remotePlayer);

    currentSession.loadMedia(request, mediaSession => {
        console.log('Media chargé avec succès');
        initializeSeekSlider(remotePlayerController, mediaSession);
      }, onError);
}

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

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

    document.getElementById('setVolHigh').addEventListener('click', function() {
        this.volumeLevel = Number(this._player.volumeLevel);
        this.volumeLevel += 0.1;
        if (this.volumeLevel > 1.0) {
            this.volumeLevel = 1.0;
        }
        this._player.setVolume(this.volumeLevel);
    }.bind(this));
}

function VolumeDown() {
    var volumeDownBtn = document.getElementById("volumeDownBtn");

    volumeDownBtn.classList.add("clicked");

    setTimeout(function() {
        volumeDownBtn.classList.remove("clicked");
    }, 100);

    document.getElementById('setVolLow').addEventListener('click', function() {
        this.volumeLevel = Number(this._player.volumeLevel);
        this.volumeLevel -= 0.1;
        if (this.volumeLevel < 0.0) {
            this.volumeLevel = 0.0;
        }
        this._player.setVolume(this.volumeLevel);
    }.bind(this)); 
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


