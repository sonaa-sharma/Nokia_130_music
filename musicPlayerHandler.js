
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

function musicPlayerHandler(button){
  switch (button.id) {
    case "left-select-button":
      if(flag === 1){
        pause();
        flag = 0;
      }
      else{
        play();
      }
      break;

    case "mid-button-inner":
      if(flag === 1){
        pause();
        flag = 0;
      }
      else{
        play();
      }
      break;

    case "right-select-button":
      hideMusicPlayer();
      var musicPlayer = document.getElementById("music");
      AddRemoveClassList(musicPlayer, 'selected', false);
      showMenu();
      break;

    case "power-button":
      hideMusicPlayer();
      var musicPlayer = document.getElementById("music");
      AddRemoveClassList(musicPlayer, 'selected', false);
      showIdleScreen();
      break;
      
    default:
      break;
  }
}

function showMusicPlayer(){
  displayMusicPlayerScreen(false);
  displayNavbar(false);

  screenName = "musicPlayerScreen";
}

function hideMusicPlayer(){
  displayMusicPlayerScreen();
  displayNavbar();

}

function displayMusicPlayerScreen(show){
  var music = document.getElementById("music-player-container");
  AddRemoveClassList(music, "hide", show);
  AddRemoveClassList(music, "no-wall");
}

