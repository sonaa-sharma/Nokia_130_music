var musicArray = [
  "MusicFolder/krishna_flute_meditation_music_beautiful_song_instrumentalMP3_160K.mp3",
  "MusicFolder/beautiful_forest_video_4K_ULTRA_HD_forest_video_clip_forest_view.mp3",
  "MusicFolder/Musim Hujan(MP3_160K).mp3",
  "MusicFolder/The Splendor of Butterflies_ Nature_s Living Art(MP3_160K).mp3",
  "",
]

var flag = 0;

function playMusic() {
  var audioPlayer = document.getElementById("audioPlayerId");
  var playPause = document.getElementById("play-pause-text");
  playPause.innerHTML = "Pause";
  audioPlayer.play();
  flag = 1;
}

function pauseMusic() {
  var audioPlayer = document.getElementById("audioPlayerId");
  var playPause = document.getElementById("play-pause-text");
  audioPlayer.pause();
  playPause.innerHTML = "Play";
}


function musicPlayerHandler(button) {
  switch (button.id) {
    case "left-select-button":
      if (flag === 1) {
        pauseMusic();
        flag = 0;
      } else {
        playMusic();
      }
      break;

    case "mid-button-inner":
      if (flag === 1) {
        pauseMusic();
        flag = 0;
      } else {
        playMusic();
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

    default:
      break;
  }
}

function showMusicPlayer() {
  mountMusicPlayerScreen(true);
  mountNavbar(true);
  mountIdleScreenWallPaper(true);

  screenName = "musicPlayerScreen";
}

function hideMusicPlayer() {
  mountMusicPlayerScreen(false);
  mountNavbar(false);
  mountIdleScreenWallPaper(false);
}

function mountMusicPlayerScreen(show) {
  var music = document.getElementById("music-player-container");
  AddRemoveClassList(music, "hide", !show);
  AddRemoveClassList(music, "no-wall", true);
}
