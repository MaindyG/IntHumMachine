<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Remote Control App | theuicode.com </title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w=="
        crossorigin="anonymous" />
    <link rel="stylesheet" href="remote.css">
    <style>
        .container>.control:focus {
            background-color: aquamarine;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="d-flex flex-row justify-content-between px-3 py-4 align-items-center">
            <!--<i class="fas fa-chevron-left"></i>-->
            <span>Classroom - Chromecast</span>
            <!--<i class="fas fa-ellipsis-h"></i>-->
        </div>
        <div class="d-flex flex-row mt-4 justify-content-start px-5">
            <div class="menu-grid">
                <div id="connectButton" style="cursor: pointer;" class="d-flex flex-column align-items-center">
                    <i class="fas fa-unlock-alt"></i>
                    <span class="label">Connexion</span>
                </div>
                <div id="startBtn" style="cursor: pointer;" class="d-flex flex-column align-items-center">
                    <i class="fa fa-power-off" aria-hidden="true"></i>
                    <span class="label">Start</span>
                </div>
                

            </div>
        </div>

        <div class="mt-4"></div>



        <div class="d-flex flex-row justify-content-center">
            <div class="menu-grid">


                <div id="prevBtn" style="cursor: pointer;" class="d-flex flex-column align-items-center"
                    onclick=Previous()>
                    <i class="fas fa-step-backward"></i>
                    <span class="label">Previous</span>
                </div>
                <div id="playBtn" style="cursor: pointer;" class="d-flex flex-column align-items-center" onclick=Play()>
                    <i class="fas fa-play-circle"></i>
                    <span class="label">Pause/Play</span>
                </div>
                <div id="nextBtn" style="cursor: pointer;" class="d-flex flex-column align-items-center" onclick=Next()>
                    <i class="fas fa-step-forward"></i>
                    <span class="label">Next</span>
                </div>


            </div>
        </div>

        <div class="col-lg-8 px-0">
            <input type="range" id="seekSlider" min="0" max="100" step="1" value="0" style="width: 100%"><br>
            <span id="currentTime">0:00</span> / <span id="totalTime">0:00</span>
        </div>

        <div class="d-flex justify-content-center mt-4">
            <div class="d-flex flex-column align-items-center"></div>
            <div name="control"
                class="d-flex flex-column rounded-bg py-3 px-4 justify-content-center align-items-center">
                <button id="volumeUpBtn" style="cursor: pointer;" class="btn btn-link p-0 m-0" onclick="VolumeUp()">
                    <i class="fas fa-plus-circle py-3 control-icon"></i>
                </button>
                <span class="label py-3">Volume</span>
                <button id="volumeDownBtn" style="cursor: pointer;" class="btn btn-link p-0 m-0" onclick="VolumeDown()">
                    <i class="fas fa-minus-circle py-3 control-icon"></i>
                </button>
            </div>
        </div>

        <div class="d-flex flex-row justify-content-center mt-5 pt-4 px-3">
            <div id="muteButton" class="d-flex flex-row grey-bg justify-content-center align-items-center">
                <i style="cursor: pointer;" class="fas fa-volume-mute p-3 control-icon"></i>
            </div>
        </div>
        
    </div>
    <script src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"></script>
    <script src="index.js"></script>
</body>

</html>
