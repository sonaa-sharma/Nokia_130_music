var audioPlayer = document.getElementById("audioPlayer");
var playPause = document.getElementById("music-select");
var flag = 0;

function play() {
  playPause.innerHTML = "Pause";
  audioPlayer.play();
  flag = 1;
}

function pause() {
  audioPlayer.pause();
  playPause.innerHTML = "Play";
}

function musicPlayerHandler(button) {
  switch (button.id) {
    case "left-select-button":
      if (flag === 1) {
        pause();
        flag = 0;
      } else {
        play();
      }
      break;

    case "mid-button-inner":
      if (flag === 1) {
        pause();
        flag = 0;
      } else {
        play();
      }
      break;

    case "right-select-button":
      hideMusicPlayer();
      showMenu();
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
