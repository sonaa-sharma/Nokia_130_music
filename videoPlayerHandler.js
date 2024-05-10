var videoflag = 0;
var videoTimeoutId;
var videoIndex = 0;

var videoArray = [
  "videoFolder/krishnaFlute.mp4",
  "videoFolder/butterflyFlying.mp4",
  "videoFolder/rain-nature.mp4",
  "videoFolder/birds-chirping.mp4",
  "videoFolder/waterFall.mp4",
];

var videoDescription = [
  "Krishna Flute",
  "Butterfly",
  "Nature Rain",
  "Bird Chirping",
  "Water Fall",
];

function playVideo() {
  var videoPlayer = document.getElementById("videoId");
  var playPause = document.getElementById("play-pause-id");
  playPause.src = "Icons/pause-play.png";
  videoPlayer.play();
  videoTimeoutId = setInterval(function () {
    moveProgressBar();
    videoCurrentPlayDuration();
  }, 33);

  videoPlayer.addEventListener("ended", onVideoEnd);
  videoflag = 1;
}

function onVideoEnd() {
  playNextVideo();
}

function pauseVideo() {
  var videoPlayer = document.getElementById("videoId");
  var playPause = document.getElementById("play-pause-id");
  videoPlayer.pause();
  clearInterval(videoTimeoutId);
  playPause.src = "Icons/play (1).png";
  var buttonClick = document.getElementById("play-pause-option");
  buttonClick.addEventListener("mousedown", showBorderPauseButton);
  buttonClick.addEventListener("mouseup", hideBorderPauseButton);
  videoflag = 0;

}

function videoPlayerHandler(button) {
  switch (button.id) {
    case "left-select-button":
      break;

    case "mid-button-inner":
      if (videoflag === 1) {
        pauseVideo();
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

    case "right-button":
      playNextVideo();
      break;

    case "left-button":
      playPreviousVideo();
      break;

    default:
      break;
  }
}

function showVideoPlayer() {
  mountVideoPlayerScreen(true);
  var barNode = document.getElementById("progress-bar-id");
  barNode.value = 0;
  videoflag = 0;
  videoIndex = 0;

  var minCurrentTimeNode = document.getElementById("current-time-min");
  var secCurrentTimeNode = document.getElementById("current-time-sec");
  minCurrentTimeNode.innerHTML = "00";
  secCurrentTimeNode.innerHTML = "00";

  videoTotalDuration();

  var videoNode = videoArray[videoIndex];
  var videoBoxId = document.getElementById("videoId");
  videoBoxId.src = videoNode;

  var playPause = document.getElementById("play-pause-id");
  playPause.src = "Icons/play (1).png";

  var videoDes = document.getElementById("video-des");
  videoDes.innerHTML = videoDescription[videoIndex];

  screenName = "videoPlayerScreen";
}

function hideVideoPlayer() {
  mountVideoPlayerScreen(false);
  mountIdleScreenWallPaper(false);
  pauseVideo();
  clearInterval(videoTimeoutId);
}

function playNextVideo() {
  clearInterval(videoTimeoutId);
  showSelection("right-button");

  var barNode = document.getElementById("progress-bar-id");
  barNode.value = 0;

  videoIndex++;

  if (videoIndex === videoArray.length) {
    videoIndex = 0;
  }
  videoTotalDuration();

  var videoNode = videoArray[videoIndex];
  var videoBoxId = document.getElementById("videoId");
  videoBoxId.src = videoNode;

  var videoDes = document.getElementById("video-des");
  videoDes.innerHTML = videoDescription[videoIndex];

  playVideo();
}

function playPreviousVideo() {
  clearInterval(videoTimeoutId);
  showSelection("left-button");
  videoTotalDuration();
  getPreviousIndex();
  updateVideoInfo();
  playVideo();
}

function updateVideoInfo(){
  var videoNode = videoArray[videoIndex];
  var videoBoxId = document.getElementById("videoId");
  videoBoxId.src = videoNode;
  var videoDes = document.getElementById("video-des");
  videoDes.innerHTML = videoDescription[videoIndex];
}

function getPreviousIndex(){
  videoIndex--;

  if (videoIndex < 0) {
    videoIndex = videoArray.length - 1;
    // return  videoIndex;
  }
  // return videoIndex;
}

function backToInitialState(){
  var barNode = document.getElementById("progress-bar-id");
  barNode.value = 0;
}
function showSelection(idName) {
  if (idName === "left-button") {
    var buttonClick = document.getElementById(idName);
    buttonClick.addEventListener("mousedown", showBorderBackwardButton);
    buttonClick.addEventListener("mouseup", hideBorderBackwardButton);
  } else if (idName === "right-button") {
    var buttonClick = document.getElementById(idName);
    buttonClick.addEventListener("mousedown", showBorderForwardButton);
    buttonClick.addEventListener("mouseup", hideBorderForwardButton);
  }
}

function showBorderBackwardButton() {
  var backwardButton = document.getElementById("previous-video");
  backwardButton.style.border = "1px solid white";
}

function hideBorderBackwardButton() {
  var backwardButton = document.getElementById("previous-video");
  backwardButton.style.border = "1px solid ";
}

function showBorderForwardButton() {
  var backwardButton = document.getElementById("next-video");
  backwardButton.style.border = "1px solid white";
}

function hideBorderForwardButton() {
  var backwardButton = document.getElementById("next-video");
  backwardButton.style.border = "1px solid ";
}

function mountVideoPlayerScreen(show) {
  var video = document.getElementById("video-player-containerId");
  AddRemoveClassList(video, "hide", !show);
}

function getVideoPlayedPercentage() {
  var videoNode = document.getElementById("videoId");
  var totalTime = videoNode.duration;
  var currentTime = videoNode.currentTime;
  var percentage = (currentTime / totalTime) * 100;
  return Math.ceil(percentage);
}

function moveProgressBar() {
  var per = getVideoPlayedPercentage();
  var barNode = document.getElementById("progress-bar-id");
  barNode.value = per;
}

function videoCurrentPlayDuration() {
  var videoNode = document.getElementById("videoId");
  var currentTime = videoNode.currentTime;
  currentTime = Math.ceil(currentTime);
  showMinSecFormatCurrentTime(currentTime);
}

function videoTotalDuration() {
  var videoNode = document.getElementById("videoId");
  var totalTime = videoNode.duration;
  totalTime = Math.ceil(totalTime);
  showMinSecFormatTotalTime(totalTime);
}

function showMinSecFormatTotalTime(totalTime) {
  var minTotalTimeNode = document.getElementById("total-time-min");
  var secTotalTimeNode = document.getElementById("total-time-sec");
  var totalTimeValue = totalTime;

  if (totalTime < 60) {
    minTotalTimeNode.innerHTML = "00";
    secTotalTimeNode.innerHTML = getTwoDigitNumber(totalTime);
  } else {
    totalDurationInMin = Math.floor(totalTimeValue / 60);
    totalDurationInSec = totalTime % 60;
    minTotalTimeNode.innerHTML = getTwoDigitNumber(totalDurationInMin);
    secTotalTimeNode.innerHTML = getTwoDigitNumber(totalDurationInSec);
  }
}

function showMinSecFormatCurrentTime(currentTime) {
  var minCurrentTimeNode = document.getElementById("current-time-min");
  var secCurrentTimeNode = document.getElementById("current-time-sec");
  var currentTimeValue = currentTime;

  if (currentTime < 60) {
    minCurrentTimeNode.innerHTML = "00";
    secCurrentTimeNode.innerHTML = getTwoDigitNumber(currentTime);
  } else {
    currentPlayInMin = Math.floor(currentTimeValue / 60);
    currentPlayInSec = currentTime % 60;
    minCurrentTimeNode.innerHTML = getTwoDigitNumber(currentPlayInMin);
    secCurrentTimeNode.innerHTML = getTwoDigitNumber(currentPlayInSec);
  }
}
