var snakeGameConfig = null;

function getInitialSnakeGameConfig() {
  var gridRowSize = 30;
  var gridColumnSize = 35;
  var snakeStartIndex = Math.floor(gridRowSize / 2) * gridColumnSize - 3;
  var snakePixels = [snakeStartIndex, snakeStartIndex + 1, snakeStartIndex + 2];

  var initialSnakeGameConfig = {
    timeIntervalId: null,
    gridRowSize,
    gridColumnSize,
    snakePixels,
    snakeMovingDirection: "right",
    snakeSpeed: 250,
    nextMovingDirection: "right",
    scoreIncrement: 7,
    score: 0,
    boosterInterval: 1,
    boostScoreIncrement: 42,
    boosterTimeoutId: null,
    snakeFoodIndex: getFoodPosition(gridRowSize * gridColumnSize, snakePixels),
    foodBoosterIndex: -1,
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
      if (direction === "right" || direction === "left") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "left";
      moveSnakeImmedieately();
      break;

    case "right-button":
      if (snakeGameConfig.pauseFlag) {
        return;
      }
      if (direction === "left" || direction === "right") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "right";
      moveSnakeImmedieately();
      break;

    case "top-button":
      if (snakeGameConfig.pauseFlag) {
        return;
      }
      if (direction === "down" || direction === "up") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "up";
      moveSnakeImmedieately();
      break;

    case "bottom-button":
      if (snakeGameConfig.pauseFlag) {
        return;
      }
      if (direction === "up" || direction === "down") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "down";
      moveSnakeImmedieately();
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

function snakeGameOverHandler(button) {
  switch (button.id) {
    case "left-select-button":
      unmountSnakeGame();
      mountSnakeGame();
      break;

    case "right-select-button":
      unmountSnakeGame();
      mountMenu();
      break;

    default:
      break;
  }
}

function moveSnakeImmedieately(){
  var success = snakeCrawling();
  if(success){
    restartSnakeCrawling();
  }
}

function restartSnakeCrawling() {
  clearInterval(snakeGameConfig.timeIntervalId);
  startSnakeCrawling();
}

// mount unmount snake game--------------->>>>>>>>>>>>>>>>>>>>>

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
  var snakeGameCircle = createSnakeGameCircle();
  box.appendChild(snakeGameCircle);
  return box;
}

function createSnakeGameCircle() {
  var box = document.createElement("div");
  box.classList.add("snakeGame-circle");
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
  navbar.innerHTML = "Score: " + snakeGameConfig.score;

  return navbar;
}

function getSnakeIndexId(snakeIndex) {
  return getPixelId(snakeIndex);
}

// snake game over -------------------->>>>>>>>>>>>>>>>>

function createGameOverBody() {
  var container = document.createElement("div");
  container.classList.add("snake-game-over-body", "overlay");
  container.id = "gameOverScreenId";

  var gameOver = document.createElement("div");
  gameOver.classList.add("snakeGameOverText");
  gameOver.innerHTML = "GAME OVER";
  container.appendChild(gameOver);

  return container;
}

function mountSnakeGameOver() {
  var select = document.getElementById("playPauseBtn");
  select.innerHTML = "Restart";
  var back = document.getElementById("backBtn");
  back.innerHTML = "Exit";

  var snakeGameScreenNode = document.getElementById("snakeGameBodyId");
  var gameOverScreen = createGameOverBody();
  snakeGameScreenNode.appendChild(gameOverScreen);
  screenName = "snakeGameOverScreen";
}

function getGameOverNode() {
  return document.getElementById("gameOverScreenId");
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
  back.id = "backBtn";
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

function setFoodBooster() {
  var { snakeFoodIndex, gridColumnSize, gridRowSize, snakePixels } =
    snakeGameConfig;

  snakeFoodIndex = getFoodPosition(gridColumnSize * gridRowSize, snakePixels);

  showFoodBooster(snakeFoodIndex);
  snakeGameConfig.boosterTimeoutId = setTimeout(foodBoosterDisappear, 7000);
}

function relocateSnakeFood() {
  var { snakeFoodIndex, gridColumnSize, gridRowSize, snakePixels } =
    snakeGameConfig;

  hideSnakeFood(snakeFoodIndex);
  snakeFoodIndex = getFoodPosition(gridColumnSize * gridRowSize, snakePixels);

  showSnakeFood(snakeFoodIndex, snakePixels);
}

function onFoodEaten() {
  relocateSnakeFood();

  snakeGameConfig.boosterInterval += 1;

  if (snakeGameConfig.boosterInterval % 5 === 0) {
    setFoodBooster();
  }

  updateScore();
  updateSnakeSpeed(snakeGameConfig.snakeSpeed);
}

function onBoosterEaten() {
  hideFoodBooster();
  clearTimeout(snakeGameConfig.boosterTimeoutId);
  updateScore(true);
}

function setGameOver(){
  pauseSnakeGame();
  mountSnakeGameOver();
}

function snakeCrawling() {
  var success = moveSnakeHead();
  var { snakePixels, snakeFoodIndex, foodBoosterIndex } = snakeGameConfig;
  if (!success) {
    setGameOver();
    return success;
  }
  var snakeNextHeadPosition = snakePixels[snakePixels.length - 1];

  var isFoodEaten = snakeNextHeadPosition === snakeFoodIndex;

  if (isFoodEaten) {
    onFoodEaten();
  } else {
    removeSnakeTail();
  }

  var isBoosterEaten = snakeNextHeadPosition === foodBoosterIndex;

  if (isBoosterEaten) {
    onBoosterEaten()
  }
  return success;
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
    return false;
  }

  snakeGameConfig.snakePixels.push(snakeNextHeadPosition);
  var snakeHeadId = getSnakeIndexId(snakeNextHeadPosition);

  var snakeHeadNode = document.getElementById(snakeHeadId);
  AddRemoveClassList(snakeHeadNode, "snake-color", true);

  return true;
}

// food update code------------------->>>>>>>>>>>>>>>>>>

function getFoodPosition(max, snakePixels) {
  var foodIndex = Math.floor(Math.random() * max);
  while (snakePixels.includes(foodIndex)) {
    foodIndex++;
    if (
      foodIndex >
      snakeGameConfig.gridColumnSize * snakeGameConfig.gridRowSize - 1
    ) {
      foodIndex = 0;
    }
  }
  return foodIndex;
}

function showSnakeFood(foodIndex) {
  var id = getPixelId(foodIndex);
  var node = document.getElementById(id);
  AddRemoveClassList(node, "snake-food", true);
  snakeGameConfig.snakeFoodIndex = foodIndex;
}

function hideSnakeFood(foodIndex) {
  var id = getPixelId(foodIndex);
  var node = document.getElementById(id);
  AddRemoveClassList(node, "snake-food", false);
}

function showFoodBooster(max) {
  foodBoosterIndex = getFoodPosition(max, [
    ...snakeGameConfig.snakePixels,
    snakeGameConfig.snakeFoodIndex,
  ]);
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

function foodBoosterDisappear() {
  hideFoodBooster();
  snakeGameConfig.foodBoosterIndex = -1;
}

function isSelfBodyIndex(snakePixels, snakeNextHeadPosition) {
  return snakePixels.includes(snakeNextHeadPosition);
}

function updateSnakeSpeed(snakeSpeed) {
  snakeSpeed = snakeSpeed - (snakeSpeed * 2) / 100;
  snakeSpeed = Math.floor(snakeSpeed);
  snakeGameConfig.snakeSpeed = snakeSpeed;
  restartGame();
}

function updateScore(isBoosterScore) {
  if (isBoosterScore) {
    score = snakeGameConfig.score + snakeGameConfig.boostScoreIncrement;
  } else {
    score = snakeGameConfig.score + snakeGameConfig.scoreIncrement;
  }
  var scoreBox = document.getElementById("scoreBoxId");
  scoreBox.innerHTML = "Score: " + score;
  snakeGameConfig.score = score;
}

// play pause restart code---------------->>>>>>>>>>>>

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
