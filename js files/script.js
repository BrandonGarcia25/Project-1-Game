//RESPONSIBLE FOR THE GAME'S START BUTTON

window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
    let game; 

//<-- Start Button -------------------------------------------------------->
 // Function that handles keydown event
  function handleKeydown(event) {
    const key = event.key;
    const possibleKeystrokes = [
      "ArrowLeft",
      "ArrowUp",
      "ArrowRight",
      "ArrowDown",
    ];

    if (possibleKeystrokes.includes(key)) {    // Check if the pressed key is in the possibleKeystrokes array
      event.preventDefault();

      // Update player's directionX and directionY based on the key pressed
      switch (key) {
        case "ArrowLeft":
          game.player.directionX = -3;
          break;
        case "ArrowUp":
          game.player.directionY = -3;
          break;
        case "ArrowRight":
          game.player.directionX = 3;
          break;
        case "ArrowDown":
          game.player.directionY = 3;
          break;
      }
    }
  }


//<-- Start Button -------------------------------------------------------->
    startButton.addEventListener("click", function () {
      startGame();
    });
//<-- Start Game -------------------------------------------------------->
    function startGame() {
      console.log("start game");
      game = new Game();
        game.start(); 
    }
    window.addEventListener("keydown", handleKeydown);
    // Add an event listener to the restart button
  restartButton.addEventListener("click", function () {
    // Call the restartGame function when the button is clicked
    restartGame();
  });

  // The function that reloads the page to start a new game
  function restartGame() {
    location.reload();
  }
};
