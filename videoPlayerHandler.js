var videoflag = 0;
var videoTimeoutId;
var videoIndex = 0;

var videoArray = [
  "videoFolder/video6187948439217639655.mp4",
  "videoFolder/video6187948439217639654.mp4",
  "videoFolder/video6187948439217639649.mp4",
  "videoFolder/video6187948439217639642.mp4",
  "videoFolder/beautiful_forest_video_4K_ULTRA_HD_forest_video_clip_forest_view.mp4", 
];

var videoDescription = [
  "Krishna Flute",
  "Butterfly",
  "Nature Rain",
  "Bird Chirping",
  "Water Fall",
]

function playVideo() {
  var videoPlayer = document.getElementById("videoId");
  var playPause = document.getElementById("play-pause-id");
  playPause.src = "Icons/pause-play.png";
  videoPlayer.play();
  videoTimeoutId = setInterval(moveProgressBar, 500);
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
  videoflag = 0;

}

function videoPlayerHandler(button) {
  switch (button.id) {
    case "left-select-button":
    
      break;

    case "mid-button-inner":
      if (videoflag === 1) {
        pauseVideo();
        // videoflag = 0;
      } else {
        playVideo();
      // playNextVideo();

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
  clearInterval(videoTimeoutId);
}

function playNextVideo(){
  clearInterval(videoTimeoutId);
  showSelection("right-button");

  var barNode = document.getElementById("progress-bar-id");
  barNode.value = 0;

  videoIndex++;

  if(videoIndex === videoArray.length){
    videoIndex = 0;
  }
  var videoNode = videoArray[videoIndex];
  var videoBoxId = document.getElementById("videoId");
  videoBoxId.src = videoNode;
  var videoDes = document.getElementById("video-des");
  videoDes.innerHTML = videoDescription[videoIndex];

  playVideo();
}

function playPreviousVideo(){
  clearInterval(videoTimeoutId);
  showSelection("left-button");

  var barNode = document.getElementById("progress-bar-id");
  barNode.value = 0;

  videoIndex--;

  if(videoIndex < 0){
    videoIndex = videoArray.length-1;
  }
  var videoNode = videoArray[videoIndex];
  var videoBoxId = document.getElementById("videoId");
  videoBoxId.src = videoNode;
  playVideo();
}

function showSelection(idName) {
  if (idName === "left-button") {
    var buttonClick = document.getElementById(idName);
    buttonClick.addEventListener("mousedown", showBorderBackwardButton);
    buttonClick.addEventListener("mouseup", hideBorderBackwardButton);
  } else {
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
  var video = document.getElementById("video-player-container");
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

function printTimer() {
  console.log(getVideoPlayedPercentage());
}
