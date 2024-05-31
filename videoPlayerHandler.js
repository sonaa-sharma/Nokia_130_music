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
  videoPlayer.play();
  showPlayIcon("play-pause-id");
  videoTimeoutId = setInterval(function () {
    moveProgressBar(videoPlayer, "progress-bar-id");
    videoCurrentPlayDuration(videoPlayer);
  }, 500);
  videoPlayer.addEventListener("ended", onVideoEnd);
  videoflag = 1;
}

function onVideoEnd() {
  playNextVideo();
}

function pauseVideo() {
  var videoPlayer = document.getElementById("videoId");
  videoPlayer.pause();
  showPauseIcon("play-pause-id");
  clearInterval(videoTimeoutId);
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
  videoIndex = 0;
  videoflag = 0;
  mountVideoPlayerScreen(true);
  showPauseIcon("play-pause-id");
  setCurrentTimeAtZero("current-time-min", "current-time-sec");
  setProgressBarAtZero("progress-bar-id");
  videoTotalDuration();
  updateVideoInfo();
  
  screenName = "videoPlayerScreen";
}

function hideVideoPlayer() {
  mountVideoPlayerScreen(false);
  pauseVideo();
  clearInterval(videoTimeoutId);
}

function playNextVideo() {
  clearInterval(videoTimeoutId);
  showSelection("right-button", "next-video");
  videoIndex = goRight(videoArray.length, videoIndex, true);
  videoTotalDuration();
  updateVideoInfo();
  setCurrentTimeAtZero("current-time-min", "current-time-sec");
  setProgressBarAtZero("progress-bar-id");
  playVideo();
}

function playPreviousVideo() {
  clearInterval(videoTimeoutId);
  showSelection("left-button", "previous-video");
  videoTotalDuration();
  videoIndex = goLeft(videoArray.length, videoIndex, true);
  updateVideoInfo();
  setCurrentTimeAtZero("current-time-min", "current-time-sec");
  setProgressBarAtZero("progress-bar-id");
  playVideo();
}

function showPauseIcon(playNodeId){
  var playPause = document.getElementById(playNodeId);
  playPause.src = "Icons/pause-icon.png";
}

function showPlayIcon(pauseNodeId){
  var playPause = document.getElementById(pauseNodeId);
  playPause.src = "Icons/play-icon.png";
}

function updateVideoInfo(){
  var videoNode = videoArray[videoIndex];
  var videoBoxId = document.getElementById("videoId");
  videoBoxId.src = videoNode;
  var videoDes = document.getElementById("video-des");
  videoDes.innerHTML = videoDescription[videoIndex];
}

function setProgressBarAtZero(progressBarId){
  var barNode = document.getElementById(progressBarId);
  barNode.value = 0;
}

function setCurrentTimeAtZero(timeInMin, timeInSec){
  var minCurrentTimeNode = document.getElementById(timeInMin);
  var secCurrentTimeNode = document.getElementById(timeInSec);
  minCurrentTimeNode.innerHTML = "00";
  secCurrentTimeNode.innerHTML = "00";
}

function showSelection(buttonId, elementId) {
  console.log(buttonId);
  console.log(elementId);
    var buttonClick = document.getElementById(buttonId);
    buttonClick.addEventListener("mousedown",function(){ showBorder(elementId)});
    buttonClick.addEventListener("mouseup",function(){ removeBorder(elementId)});
}

function showBorder(elementId) {
  var backwardButton = document.getElementById(elementId);
  backwardButton.style.border = "1px solid white";
}

function removeBorder(elementId) {
  var backwardButton = document.getElementById(elementId);
  backwardButton.style.border = "1px solid ";
}

function mountVideoPlayerScreen(show) {
  var video = document.getElementById("video-player-containerId");
  AddRemoveClassList(video, "hide", !show);
}

function getVideoPlayedPercentage(currentVideoNode) {
  var totalTime = currentVideoNode.duration;
  var currentTime = currentVideoNode.currentTime;
  var percentage = (currentTime / totalTime) * 100;
  return Math.ceil(percentage);
}

function moveProgressBar(currentVideoNode, progressBarId) {
  var per = getVideoPlayedPercentage(currentVideoNode);
  var barNode = document.getElementById(progressBarId);
  barNode.value = per;
}

function videoCurrentPlayDuration() {
  var videoNode = document.getElementById("videoId");
  var currentTime = videoNode.currentTime;
  currentTime = Math.ceil(currentTime);
  showMinSecFormatCurrentTime(currentTime, "current-time-min", "current-time-sec");
}

function videoTotalDuration() {
  var videoNode = document.getElementById("videoId");
  var totalTime = videoNode.duration;
  totalTime = Math.ceil(totalTime);
  showMinSecFormatTotalTime(totalTime, "total-time-min", "total-time-sec");
}

function showMinSecFormatTotalTime(totalTime, totalMin, totalSec) {
  var minTotalTimeNode = document.getElementById(totalMin);
  var secTotalTimeNode = document.getElementById(totalSec);
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

function showMinSecFormatCurrentTime(currentTime, currentMin, currentSec) {
  var minCurrentTimeNode = document.getElementById(currentMin);
  var secCurrentTimeNode = document.getElementById(currentSec);
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
