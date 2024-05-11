var audioIndex = 0;
var audioTimeoutId;
var flag = 0;

var audioArray = [
  "MusicFolder/RADHA_RANI_LAGE_SIMPAL_KHAREL_NEW_SONG_RADHA_KRISHNA_BHAJAN_2023.mp3",
  "MusicFolder/krishna_flute_meditation_music_beautiful_song_instrumentalMP3_160K.mp3",
];

var musicCoverPhoto = [
  "Icons/radha-rani-song.jpg",
  "Icons/flute-pic.jpg",
]
var songNameDescription = [
  "Radha Rani Lage",
  "Krishna Flute",
];

var singerNameDescription = [
  "...Simple Kharel",
  "...Instrumental",
];


function playAudio() {
  var audioPlayer = document.getElementById("audioId");
  audioPlayer.play();
  showPlayIcon("play-pause-audioId");
  audioTimeoutId = setInterval(function () {
    moveProgressBar(audioPlayer, "progress-bar-audioId");
    audioCurrentPlayDuration();
  }, 33);

  audioPlayer.addEventListener("ended", onAudioEnd);
  flag = 1;
}

function onAudioEnd() {
  pauseAudio();
}

function pauseAudio() {
  var audioPlayer = document.getElementById("audioId");
  audioPlayer.pause();
  clearInterval(audioTimeoutId);
  showPauseIcon("play-pause-audioId");
  flag = 0;
}

function musicPlayerHandler(button) {
  switch (button.id) {
    case "left-select-button":
      break;

    case "mid-button-inner":
      if (flag === 1) {
        pauseAudio();
      } else {
        playAudio();
      }
      break;

    case "right-select-button":
      hideMusicPlayer();
      mountMenu(false);
      break;

    case "power-button":
      hideMusicPlayer();
      showIdleScreen();
      break;

    case "right-button":
      playNextAudio();
      break;

    case "left-button":
      playPreviousAudio();
      break;

    default:
      break;
  }
}

function showMusicPlayer() {
  audioIndex = 0;
  flag = 0;
  mountMusicPlayerScreen(true);
  audioTotalDuration();

  screenName = "musicPlayerScreen";
}

function hideMusicPlayer() {
  mountMusicPlayerScreen(false);
}

function mountMusicPlayerScreen(show) {
  var music = document.getElementById("music-player-containerId");
  AddRemoveClassList(music, "hide", !show);
}

function audioCurrentPlayDuration() {
  var audioNode = document.getElementById("audioId");
  var currentTime = audioNode.currentTime;
  currentTime = Math.ceil(currentTime);
  showMinSecFormatCurrentTime(currentTime, "audio-current-time-min", "audio-current-time-sec");
}

function audioTotalDuration() {
  var audioNode = document.getElementById("audioId");
  var totalTime = audioNode.duration;
  totalTime = Math.ceil(totalTime);
  showMinSecFormatTotalTime(totalTime, "audio-total-time-min", "audio-total-time-sec");
}

function playNextAudio() {
  clearInterval(audioTimeoutId);
  showSelection("right-button", "next-audio");
  nextIndex = goLeft(audioArray.length, audioIndex, true);
  audioTotalDuration();
  audioIndex = nextIndex;
  updateAudioInfo(audioIndex);
  setProgressBarAtZero("progress-bar-audioId");
  playAudio();

}

function playPreviousAudio() {
  clearInterval(audioTimeoutId);
  showSelection("left-button", "previous-audio");
  audioTotalDuration();
  nextIndex = goLeft(audioArray.length, audioIndex, true);
  audioIndex = nextIndex;
  updateAudioInfo(audioIndex);
  playAudio();
}

function updateAudioInfo(audioIndex){
  var currentAudio = audioArray[audioIndex];
  var audioNode = document.getElementById("audioId");
  audioNode.src = currentAudio;
  var songNameDes = document.getElementById("song-nameId");
  songNameDes.innerHTML = songNameDescription[audioIndex];
  var singerNameDes = document.getElementById("singer-nameId");
  singerNameDes.innerHTML = singerNameDescription[audioIndex];
  var coverPhoto = document.getElementById("music-cover-photo");
  coverPhoto.src = musicCoverPhoto[audioIndex];
}


