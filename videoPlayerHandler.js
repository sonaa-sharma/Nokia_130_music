var videoflag = 0;

function playVideo() {
  var videoPlayer = document.getElementById("videoPlayerId");
  var playPause = document.getElementById("play-pause-option");
  videoPlayer.play();
  playPause.innerHTML = "Pause";
  videoflag = 1;
}

function pauseVideo() {
  var videoPlayer = document.getElementById("videoPlayerId");
  var playPause = document.getElementById("play-pause-option");
  videoPlayer.pause();
  playPause.innerHTML = "Play";
}

function videoPlayerHandler(button) {
  switch (button.id) {
    case "left-select-button":
      if (videoflag === 1) {
        pauseVideo();
        videoflag = 0;
      } else {
        playVideo();
      }
      break;

    case "mid-button-inner":
      if (videoflag === 1) {
        pauseVideo();
        videoflag = 0;
      } else {
        playVideo();
      }
      break;

    case "right-select-button":
      hideVideoPlayer();
      mountMenu(false);
      break;

    case "power-button":
      hideVideoPlayer();
      showIdleScreen();
      break;

    default:
      break;
  }
}

function showVideoPlayer() {
  mountVideoPlayerScreen(true);
//   mountNavbar(true);
  mountIdleScreenWallPaper(true);

  screenName = "videoPlayerScreen";
}

function hideVideoPlayer() {
  mountVideoPlayerScreen(false);
//   mountNavbar(false);
  mountIdleScreenWallPaper(false);
}

function mountVideoPlayerScreen(show) {
  var video = document.getElementById("video-player-container");
  AddRemoveClassList(video, "hide", !show);
}
