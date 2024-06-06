var snakeGameConfig = null;

function getInitialSnakeGameConfig() {
  var timeIntervalId;
  var gridRowSize = 37;
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
  };

  return initialSnakeGameConfig;
}

function snakeGameHandler(button) {
  var direction = snakeGameConfig.snakeMovingDirection;
  switch (button.id) {
    case "left-button":
      if (direction === "right") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "left";
      break;

    case "right-button":
      if (direction === "left") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "right";
      break;

    case "top-button":
      if (direction === "down") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "up";
      break;

    case "bottom-button":
      if (direction === "up") {
        return;
      }
      snakeGameConfig.nextMovingDirection = "down";
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

function snakeGameMouseDownHandler(button) {
  switch (button.id) {
    case "left-button":
      break;
    case "right-button":
      break;
    case "top-button":
      break;
    case "bottom-button":
      break;
    default:
      break;
  }
}

function snakeGameMouseUpHandler(button) {
  switch (button.id) {
    case "left-button":
      break;
    case "right-button":
      break;
    case "top-button":
      break;
    case "bottom-button":
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

  return navbar;
}

function createSnakeGameBottomNavbar() {
  var navbar = document.createElement("div");
  navbar.classList.add("bottom-navbar", "bottom-navbar-color");

  var select = document.createElement("div");
  select.innerHTML = "Select";
  navbar.appendChild(select);

  var back = document.createElement("div");
  back.innerHTML = "Back";
  navbar.appendChild(back);

  return navbar;
}

//snake functioning code-------------->>>>>>>>>>>>

function startSnakeCrawling() {
  snakeGameConfig.timeIntervalId = setInterval(
    snakeCrawling,
    snakeGameConfig.snakeSpeed
  );
}

function snakeCrawling() {
  moveSnakeHead();
  removeSnakeTail();
}

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

  snakeGameConfig.snakePixels.push(snakeNextHeadPosition);

  var snakeHeadId = getSnakeIndexId(snakeNextHeadPosition);

  var snakeHeadNode = document.getElementById(snakeHeadId);
  AddRemoveClassList(snakeHeadNode, "snake-color", true);
}

function removeSnakeTail() {
  var snakeTailPosition = snakeGameConfig.snakePixels[0];
  snakeGameConfig.snakePixels.shift();

  var snakeTailId = getPixelId(snakeTailPosition);

  var snakeTailNode = document.getElementById(snakeTailId);

  AddRemoveClassList(snakeTailNode, "snake-color", false);
}

function getSnakeIndexId(snakeIndex) {
  return getPixelId(snakeIndex);
}

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
