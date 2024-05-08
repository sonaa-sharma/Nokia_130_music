var videoflag = 0;

function playVideo() {
  var videoPlayer = document.getElementById("videoPlayerId");
  var playPause = document.getElementById("play-pause-id");
  playPause.src = "Icons/pause-play.png"
  videoPlayer.play();
  videoflag = 1;
}

function pauseVideo() {
  var videoPlayer = document.getElementById("videoPlayerId");
  var playPause = document.getElementById("play-pause-id");
  videoPlayer.pause();
  playPause.src = "Icons/play (1).png"
}

function videoPlayerHandler(button) {
  switch (button.id) {
    case "left-select-button":
      // if (videoflag === 1) {
      //   pauseVideo();
      //   videoflag = 0;
      // } else {
      //   playVideo();
      // }
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
  // mountIdleScreenWallPaper(true);

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
