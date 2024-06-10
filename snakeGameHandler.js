var snakeGameConfig = null;

function getInitialSnakeGameConfig() {
  var timeIntervalId;
  var scoreIncrement = 7;
  var initialScore = 0;
  var boosterInterval = 1;
  var gridRowSize = 30;
  var gridColumnSize = 35;
  var snakeStartIndex = Math.floor(gridRowSize / 2) * gridColumnSize - 3;
  var snakePixels = [snakeStartIndex, snakeStartIndex + 1, snakeStartIndex + 2];

  var initialSnakeGameConfig = {
    timeIntervalId,
    gridRowSize,
    gridColumnSize,
    snakePixels,
    snakeMovingDirection: "right",
    snakeSpeed: 250,
    nextMovingDirection: "right",
    scoreIncrement,
    initialScore,
    boosterInterval,
    scoreBooster: scoreIncrement * 5,
    snakeFoodIndex: getFoodPosition(gridRowSize * gridColumnSize),
    foodBoosterIndex: getFoodPosition(gridRowSize * gridColumnSize),
    isFoodEaten: false,
    pauseFlag: false,
  };

  return initialSnakeGameConfig;
}

function snakeGameHandler(button) {
  var direction = snakeGameConfig.snakeMovingDirection;
  switch (button.id) {
    case "left-button":
      if (snakeGameConfig.pauseFlag) {
        return;
      }
      if (direction === "right") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "left";
      break;

    case "right-button":
      if (snakeGameConfig.pauseFlag) {
        return;
      }
      if (direction === "left") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "right";
      break;

    case "top-button":
      if (snakeGameConfig.pauseFlag) {
        return;
      }
      if (direction === "down") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "up";
      break;

    case "bottom-button":
      if (snakeGameConfig.pauseFlag) {
        return;
      }
      if (direction === "up") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "down";
      break;

    case "left-select-button":
      if (snakeGameConfig.pauseFlag) {
        playSnakeGame();
      } else {
        pauseSnakeGame();
      }
      break;

    case "right-select-button":
      unmountSnakeGame();
      mountMenu();
      break;

    case "power-button":
      unmountSnakeGame();
      showIdleScreen();
      break;

    default:
      break;
  }
}

function mountSnakeGame() {
  snakeGameConfig = getInitialSnakeGameConfig();

  var snakeGameScreenNode = document.getElementById("snakeGame-screen-id");

  var snakeGame = createSnakeGame();
  snakeGameScreenNode.appendChild(snakeGame);

  mountSnakeGameScreen(true);

  startSnakeCrawling();

  screenName = "snakeGameScreen";
}

function unmountSnakeGame() {
  var snakeGameScreenNode = document.getElementById("snakeGame-screen-id");

  var snakeGameBodyContainer = getSnakeGameBodyContainerNode();
  snakeGameScreenNode.removeChild(snakeGameBodyContainer);

  clearInterval(snakeGameConfig.timeIntervalId);

  snakeGameConfig = null;
  mountSnakeGameScreen(false);
}

function mountSnakeGameScreen(show) {
  var snakeGameScreenNode = document.getElementById("snakeGame-screen-id");
  AddRemoveClassList(snakeGameScreenNode, "hide", !show);
}

//snake creating code-------------->>>>>>>>>>>>

function createSnakeGame() {
  var snakeGame = document.createElement("div");
  snakeGame.classList.add("snakeGame-body-container");
  snakeGame.id = "snakeGameBodyContainerId";

  var snakeGameNavbar = createSnakeGameNavbar();
  var snakeGameBody = createSnakeGameBody();
  var bottomNavbar = createSnakeGameBottomNavbar();

  snakeGame.appendChild(snakeGameNavbar);
  snakeGame.appendChild(snakeGameBody);
  snakeGame.appendChild(bottomNavbar);

  return snakeGame;
}

function getSnakeGameBodyContainerNode() {
  return document.getElementById("snakeGameBodyContainerId");
}

function createSnakeGameBody() {
  var snakeGameBodyContainerNode = document.createElement("div");
  snakeGameBodyContainerNode.classList.add("snakeGame-body");
  snakeGameBodyContainerNode.id = "snakeGameBodyId";

  var snakeGamePlayGroundBodyNode = createSnakeGameGrid();
  snakeGameBodyContainerNode.appendChild(snakeGamePlayGroundBodyNode);

  return snakeGameBodyContainerNode;
}

function getSnakeGameNode() {
  return document.getElementById("snakeGameBodyId");
}

function createSnakeGameGrid() {
  var gridContainer = document.createElement("div");
  gridContainer.classList.add("gridContainer");
  gridContainer.id = "gridContainerId";

  for (i = 0; i < snakeGameConfig.gridRowSize; i++) {
    var boxContainer = createSnakeGameBoxContainer();
    for (j = 0; j < snakeGameConfig.gridColumnSize; j++) {
      var box = createSnakeGameBox();
      var id = i * snakeGameConfig.gridColumnSize + j;
      box.id = getPixelId(id);
      boxContainer.appendChild(box);
    }

    gridContainer.appendChild(boxContainer);
  }

  return gridContainer;
}

function getSnakeGridNode() {
  return document.getElementById("gridContainerId");
}

function getPixelId(index) {
  return "snake-box-" + index;
}

function createSnakeGameBox() {
  var box = document.createElement("div");
  box.classList.add("snakeGame-box");
  return box;
}

function createSnakeGameBoxContainer() {
  var container = document.createElement("div");
  container.classList.add("snakeGame-box-container");
  return container;
}

function createSnakeGameNavbar() {
  var navbar = document.createElement("div");
  navbar.classList.add("snakeGame-navbar");
  navbar.id = "scoreBoxId";
  navbar.innerHTML = "Score: " + snakeGameConfig.initialScore;

  return navbar;
}

function createGameOverBody() {
  var container = document.createElement("div");
  container.classList.add("snake-game-over-body");
  container.id = "gameOverScreenId";

  var gameOver = document.createElement("div");
  gameOver.classList.add("snakeGameOverText");
  container.appendChild(gameOver);

  // var yourScore = document.createElement("div");
  // yourScore.classList.add("yourScore");
  // yourScore.innerHTML = "Your Score: " + snakeGameConfig.initialScore;
  // container.appendChild(yourScore);

  // var highestScore = document.createElement("div");
  // highestScore.classList.add("highestScore");
  // highestScore.innerHTML = "HighestScore: 10000";
  // container.appendChild(highestScore);

  return container;
}

function showGameOverScreen() {
  var gameScreen = document.getElementById("snakeGameBodyId");
  var gamePlayGround = document.getElementById("gridContainerId");
  var gameOverScreen = createGameOverBody();
  var select = document.getElementById("playPauseBtn");
  select.innerHTML = "Restart";
  var scoreBox = document.getElementById("scoreBoxId");
  scoreBox.innerHTML = "Your Score: " + snakeGameConfig.initialScore;

  gameScreen.removeChild(gamePlayGround);
  gameScreen.appendChild(gameOverScreen);
}

function createSnakeGameBottomNavbar() {
  var navbar = document.createElement("div");
  navbar.classList.add("bottom-navbar", "bottom-navbar-color");

  var select = document.createElement("div");
  select.innerHTML = "Pause";
  select.id = "playPauseBtn";
  navbar.appendChild(select);

  var back = document.createElement("div");
  back.innerHTML = "Back";
  navbar.appendChild(back);

  return navbar;
}

//snake functioning code-------------->>>>>>>>>>>>

function startSnakeCrawling() {
  showSnakeFood(snakeGameConfig.snakeFoodIndex, snakeGameConfig.snakePixels);
  snakeGameConfig.timeIntervalId = setInterval(
    snakeCrawling,
    snakeGameConfig.snakeSpeed
  );
}

function snakeCrawling() {
  moveSnakeHead();
  if (snakeGameConfig.isFoodEaten) {
    return;
  }
  removeSnakeTail();
}

// move snake head------------------>>>>>>>>>>>>>>>>>>>>>

function moveSnakeHead() {
  var snakePixels = snakeGameConfig.snakePixels;
  var snakeHeadPosition = snakePixels[snakePixels.length - 1];

  var snakeMovingDirection = snakeGameConfig.nextMovingDirection;
  snakeGameConfig.snakeMovingDirection = snakeMovingDirection;

  var screenRowSize = snakeGameConfig.gridRowSize;
  var screenColumnSize = snakeGameConfig.gridColumnSize;

  var snakeNextHeadPosition = getNextHeadPosition(
    snakeHeadPosition,
    snakeMovingDirection,
    screenRowSize,
    screenColumnSize
  );

  var isSelfBody = isSelfBodyIndex(snakePixels, snakeNextHeadPosition);
  if (isSelfBody) {
    showGameOver();
    return;
  }

  snakeGameConfig.snakePixels.push(snakeNextHeadPosition);
  var snakeHeadId = getSnakeIndexId(snakeNextHeadPosition);

  var snakeFoodIndex = snakeGameConfig.snakeFoodIndex;
  var foodBoosterIndex = snakeGameConfig.foodBoosterIndex;
  var initialScore = snakeGameConfig.initialScore;
  var scoreIncrement = snakeGameConfig.scoreIncrement;
  var scoreBooster = snakeGameConfig.scoreBooster;
  var boosterInterval = snakeGameConfig.boosterInterval;
  console.log(boosterInterval);

  if (snakeNextHeadPosition === foodBoosterIndex) {
    snakeGameConfig.isFoodEaten = true;
    hideFoodBooster();
    updateBoosterScore(initialScore, scoreBooster);
  }

  if (snakeNextHeadPosition === snakeFoodIndex) {
    snakeGameConfig.isFoodEaten = true;
    hideSnakeFood(snakeFoodIndex)
    snakeGameConfig.boosterInterval += 1;

    if (snakeGameConfig.boosterInterval % 5 === 0) {
      snakeFoodIndex = getFoodPosition(screenRowSize * screenColumnSize);
      showFoodBooster(snakeFoodIndex);
    }

    snakeFoodIndex = getFoodPosition(screenRowSize * screenColumnSize);
    showSnakeFood(snakeFoodIndex, snakePixels);

    updateScore(initialScore, scoreIncrement);
    updateSnakeSpeed(snakeGameConfig.snakeSpeed);
    restartGame();
  } else {
    snakeGameConfig.isFoodEaten = false;
  }

  var snakeHeadNode = document.getElementById(snakeHeadId);
  AddRemoveClassList(snakeHeadNode, "snake-color", true);
}


function getFoodPosition(max) {
  return Math.floor(Math.random() * max);
}

function showSnakeFood(foodIndex, snakePixels) {
  for (i = 0; i < snakePixels.length; i++) {
    if (foodIndex === snakePixels[i]) {
      return;
    }
    var id = getPixelId(foodIndex);
    var node = document.getElementById(id);

    AddRemoveClassList(node, "snake-food", true);
    snakeGameConfig.snakeFoodIndex = foodIndex;
  }
}

function hideSnakeFood(foodIndex) {
  var id = getPixelId(foodIndex);
  var node = document.getElementById(id);
  AddRemoveClassList(node, "snake-food", false);
}

function showFoodBooster(max) {
  foodBoosterIndex = getFoodPosition(max);
  var id = getPixelId(foodBoosterIndex);
  var node = document.getElementById(id);
  AddRemoveClassList(node, "food-booster", true);
  snakeGameConfig.foodBoosterIndex = foodBoosterIndex;
}

function hideFoodBooster() {
  var id = getPixelId(snakeGameConfig.foodBoosterIndex);
  var node = document.getElementById(id);
  AddRemoveClassList(node, "food-booster", false);
}

function isSelfBodyIndex(snakePixels, snakeNextHeadPosition) {
  for (i = 0; i < snakePixels.length; i++) {
    if (snakeNextHeadPosition === snakePixels[i]) {
      return true;
    }
  }
  return false;
}

function updateSnakeSpeed(snakeSpeed) {
  snakeSpeed = snakeSpeed - (snakeSpeed * 5) / 100;
  snakeSpeed = Math.floor(snakeSpeed);
  if (snakeSpeed < 50) {
    snakeSpeed = 50;
  }
  snakeGameConfig.snakeSpeed = snakeSpeed;
  console.log(snakeGameConfig.snakeSpeed);
}

function updateScore(initialScore, scoreIncrement) {
  initialScore = initialScore + scoreIncrement;
  var scoreBox = document.getElementById("scoreBoxId");
  scoreBox.innerHTML = "Score: " + initialScore;
  snakeGameConfig.initialScore = initialScore;
}

function updateBoosterScore(initialScore, scoreBooster) {
  initialScore = initialScore + scoreBooster;
  var scoreBox = document.getElementById("scoreBoxId");
  scoreBox.innerHTML = "Score: " + initialScore;
  snakeGameConfig.initialScore = initialScore;
}
// sorted code---------------->>>>>>>>>>>>

function showGameOver() {
  clearInterval(snakeGameConfig.timeIntervalId);
  showGameOverScreen();
}

function pauseSnakeGame() {
  var playBtn = document.getElementById("playPauseBtn");
  playBtn.innerHTML = "Play";
  clearInterval(snakeGameConfig.timeIntervalId);
  snakeGameConfig.pauseFlag = true;
}

function playSnakeGame() {
  var playBtn = document.getElementById("playPauseBtn");
  playBtn.innerHTML = "Pause";
  startSnakeCrawling();
  snakeGameConfig.pauseFlag = false;
}

function restartGame() {
  clearInterval(snakeGameConfig.timeIntervalId);
  playSnakeGame();
}

function getSnakeIndexId(snakeIndex) {
  return getPixelId(snakeIndex);
}

// remove tail------------>>>>>>>>>>>>>

function removeSnakeTail() {
  var snakeTailPosition = snakeGameConfig.snakePixels[0];
  snakeGameConfig.snakePixels.shift();

  var snakeTailId = getPixelId(snakeTailPosition);

  var snakeTailNode = document.getElementById(snakeTailId);

  AddRemoveClassList(snakeTailNode, "snake-color", false);
}

// head position calculation------------------->>>>>>>>>>>>>

function getNextHeadPosition(
  snakeHeadPosition,
  snakeMovingDirection,
  screenRowSize,
  screenColumnSize
) {
  var nextSnakeHeadPosition;

  switch (snakeMovingDirection) {
    case "left":
      nextSnakeHeadPosition = getNextHeadPositionLeft(
        snakeHeadPosition,
        screenColumnSize
      );
      break;
    case "right":
      nextSnakeHeadPosition = getNextHeadPositionRight(
        snakeHeadPosition,
        screenColumnSize
      );
      break;
    case "up":
      nextSnakeHeadPosition = getNextHeadPositionUp(
        snakeHeadPosition,
        screenRowSize,
        screenColumnSize
      );
      break;
    case "down":
      nextSnakeHeadPosition = getNextHeadPositionDown(
        snakeHeadPosition,
        screenRowSize,
        screenColumnSize
      );
      break;
    default:
      break;
  }
  return nextSnakeHeadPosition;
}

function getNextHeadPositionLeft(snakeHeadPosition, screenColumnSize) {
  var nextSnakeHeadPosition = snakeHeadPosition - 1;
  if (snakeHeadPosition % screenColumnSize === 0) {
    nextSnakeHeadPosition = nextSnakeHeadPosition + screenColumnSize;
  }

  return nextSnakeHeadPosition;
}

function getNextHeadPositionRight(snakeHeadPosition, screenColumnSize) {
  var nextSnakeHeadPosition = snakeHeadPosition + 1;
  if (nextSnakeHeadPosition % screenColumnSize === 0) {
    nextSnakeHeadPosition = nextSnakeHeadPosition - screenColumnSize;
  }

  return nextSnakeHeadPosition;
}

function getNextHeadPositionUp(
  snakeHeadPosition,
  screenRowSize,
  screenColumnSize
) {
  var nextSnakeHeadPosition = snakeHeadPosition - screenColumnSize;
  var screenGridSize = screenRowSize * screenColumnSize;
  if (nextSnakeHeadPosition < 0) {
    nextSnakeHeadPosition = nextSnakeHeadPosition + screenGridSize;
  }

  return nextSnakeHeadPosition;
}

function getNextHeadPositionDown(
  snakeHeadPosition,
  screenRowSize,
  screenColumnSize
) {
  var nextSnakeHeadPosition = snakeHeadPosition + screenColumnSize;
  var screenGridSize = screenRowSize * screenColumnSize;
  if (nextSnakeHeadPosition >= screenGridSize) {
    nextSnakeHeadPosition = nextSnakeHeadPosition - screenGridSize;
  }

  return nextSnakeHeadPosition;
}
