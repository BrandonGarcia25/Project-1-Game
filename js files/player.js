//RESPONSIBLE FOR THE CHARACTER

class Player{
    constructor (gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen; 
        this.left = left; //Horizontal position of the character
        this.top = 600; // Vertical position of the character
        this.width = width; //Width of character element
        this.height = height; //Height of the character element
        this.directionX = 0; //Used to specify the horizontal movement direction (0=not moving horizon, 1=moving horizon to the right, -1moving horizon to the left)
        this.directionY = 0; //Used to specify the vertical movement direction
        this.element = document.createElement ('img'); //Image of the character

        this.element.src = imgSrc; 
        this.element.style.position = "absolute";

        //Default elements property values
        this.element.style.width = `${width}px`;
    this.element.style.height = `${height}px`;
    this.element.style.left = `${left}px`;
    this.element.style.top = `${top}px`;

    this.gameScreen.appendChild(this.element);
    }
 //<-- Update the playes of the character -------------------------------------------------------->
    move (){
          // Update player's car position based on directionX and directionY
    this.left += this.directionX;
    this.top += this.directionY;
    // Ensure the player's stays within the game screen
    // handles left hand side
    if (this.left < 10) {
        this.left = 10;
      }
  
      // handles top side
      if (this.top < 10) {
        this.top = 10;
      }
  
      // handles right hand side
      if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
        this.left = this.gameScreen.offsetWidth - this.width - 10;
      }
  
      // handles bottom side
      if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
        this.top = this.gameScreen.offsetHeight - this.height - 10;
      }
  
      // Update the player's car position on the screen
      this.updatePosition();
    }

//<-- Update the position of the character -------------------------------------------------------->
    updatePosition (){
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
    }

//<-- Checks if the players car collides with an obstacle  ------------------------------------------>
    didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
    
        if (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }
}