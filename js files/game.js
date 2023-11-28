//RESPONSIBLE FOR MANAGING GAME DATA (PROPERTIES) AND BEHAVIOR (METHODS)

const obstacleArray = ["./images/chicken.png", "./images/cheese.png"];
const ingredientsArray = [
  "./images/lettuce.png",
  "./images/tomato.png",
  "./images/onion.png",
];

class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(
      this.gameScreen,
      250,
      350,
      150,
      150,
      "./images/hand.png"
    );
    this.height = 700;
    this.width = 583;
    this.obstacles = [];
    this.ingredients = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.scoreElement = document.getElementById("score")
    this.livesElement = document.getElementById('lives')
    this.outcomeElement = document.getElementById("outcome")
    this.timeElement = document.getElementById("time")
    this.timer = 0
    this.seconds = 30
  }
  //<-- Sets the height and width of the game screen. Hides the start screen.  -------------->
  //Shows the game screen.Starts the game loop by calling the gameLoop() method.
  start() {
    this.gameScreen.style.height = `${this.height}px`; // Set the height and width of the game screen
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none"; //Hide the start screen
    this.gameScreen.style.display = "block"; // Show the game screen
    this.gameLoop(); // Start the game loop
  }

  //<-- Checks if the gameIsOver flag is set to true.If it is, it interrupts the function to stop the loop.  -------------->
  //Invokes the update() method to update the game state.
  gameLoop() {
    if (this.gameIsOver) {
      return;
    }
    this.update();
    this.timer++
    if (this.timer % 60 === 0) {
      this.seconds--
      this.timeElement.innerHTML = this.seconds
    }
    if (this.seconds === 0) {
      this.endGame()
    }
    window.requestAnimationFrame(() => this.gameLoop());
  }

  // <--  Responsible for updating the game state during each loop iteration.  -------------->
  update() {
    this.player.move();
    console.log("in the update");

    for (let i = 0; i < this.ingredients.length; i++) {
      const obstacle = this.ingredients[i];
      obstacle.move();

      // If the player's collides with an obstacle
      // Remove the obstacle element from the DOM
      // Remove obstacle object from the array
      // Reduce player's lives by 1
      // Update the counter variable to account for the removed obstacle
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();
        this.ingredients.splice(i, 1);
        this.score++;
        this.scoreElement.innerHTML = this.score
        i--;
      } 
      
      // If the obstacle is off the screen (at the bottom)
      // Increase the score by 1
      // Remove the obstacle from the DOM
      // Remove obstacle object from the array
      // Update the counter variable to account for the removed obstacle    // this.score++;
      else if (obstacle.top > this.height) {
        obstacle.element.remove();
        this.ingredients.splice(i, 1);
        i--;
      }
    }

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();

      // If the player's car collides with an obstacle
      // Remove the obstacle element from the DOM
      // Remove obstacle object from the array
      // Reduce player's lives by 1
      // Update the counter variable to account for the removed obstacle
      if (this.player.didCollide(obstacle)) {
        obstacle.element.remove();

        this.obstacles.splice(i, 1);
        this.lives--;
        this.livesElement.innerHTML = this.lives
        i--;

      } // If the obstacle is off the screen (at the bottom)
      // Increase the score by 1
      // Remove the obstacle from the DOM
      // Remove obstacle object from the array
      // Update the counter variable to account for the removed obstacle
      else if (obstacle.top > this.height) {
        this.scoreElement.innerHTML = this.score

        obstacle.element.remove();

        this.obstacles.splice(i, 1);

        i--;
      }
    }
    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(
        new Obstacle(
          this.gameScreen,
          obstacleArray[Math.floor(Math.random() * obstacleArray.length)]
        )
      );
    }

    if (Math.random() < 0.05 && this.ingredients.length < 2) {
      this.ingredients.push(
        new Ingredient(
          this.gameScreen,
          ingredientsArray[Math.floor(Math.random() * ingredientsArray.length)]
        )
      );
    }
  }

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
    if (this.score > 15) {
      this.outcomeElement.innerHTML = `You finished with a score of ${this.score}.  You win!`
    } else {
      this.outcomeElement.innerHTML = "You did not collect enough ingredients.  You lose!"
    }
  }
}
