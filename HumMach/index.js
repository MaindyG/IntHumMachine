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
function sessionListener(newSession) {
    session = newSession;
    document.getElementById('startBtn').style.display = 'block';
    document.getElementById('nextBtn').style.display = 'block';
}



function onMediaDiscovered(mediaItem) {
    media = mediaItem;
    document.getElementById('playBtn').style.display = 'block';
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


//

function initializeApiOnly() {
    
    const sessionRequest = new chrome.cast.SessionRequest(applicationID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function loadMedia(videoUrl) {
    const mediaInfo = new chrome.cast.media.MediaInfo(videoUrl, 'video/mp4');
    const request = new chrome.cast.media.LoadRequest(mediaInfo);

    session.loadMedia(request, onMediaDiscovered, onError);
}


// Function to initialize the Cast SDK
function initializeCastApi() {

    // Set up Cast SDK options
    const castOptions = new cast.framework.CastOptions();
    castOptions.receiverApplicationId = applicationID;

    // Initialize CastContext with the CastOptions
    const castContext = cast.framework.CastContext.getInstance();
    castContext.setOptions(castOptions);
    
    // Your existing event listener and button click handling code
    const castButton = document.getElementById('castButton');
    cast.framework.CastContext.getInstance().addEventListener(
        cast.framework.CastContextEventType.CAST_STATE_CHANGED,
        function(event) {
            switch (event.castState) {
                case cast.framework.CastState.NO_DEVICES_AVAILABLE:
                    castButton.disabled = true;
                    break;
                case cast.framework.CastState.NOT_CONNECTED:
                    castButton.disabled = false;
                    break;
                case cast.framework.CastState.CONNECTING:
                case cast.framework.CastState.CONNECTED:
                    castButton.disabled = true;
                    break;
            }
        }
    );

    // Add a click event listener to the Cast button
    castButton.addEventListener('click', function() {
        // Get the current Cast session
        const session = castContext.getCurrentSession();

        // Check if there is an active Cast session
        if (session) {
            // Already connected - do nothing or disconnect if needed
        } else {
            // Not connected - initiate a Cast session
            castContext.requestSession().then(
                function() {
                    // Handle successful connection
                    console.log('Connected to Chromecast');
                    initializeApiOnly();
                },
                function(errorCode) {
                    // Handle connection error
                    console.error('Error connecting to Chromecast: ' + errorCode);
                }
            );
        }
    })
}
