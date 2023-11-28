//RESPONSIBLE FOR THE INGREDIENTS
const imageArray = ["./images/lettuce.png", "./images/tomato.png", "./images/onion.png"];

class Ingredient {
    constructor (gameScreen, src) {
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 400 + 80); //randomly generated number representing the horizontal position 
        this.top = 0; // the initial vertical position of the obstacle. 
        this.width = 50; // he width of the obstacle element.
        this.height = 50;
        // this.imageArray = imageArray; 
        // this.imageSrc =  imageArray;

        this.element = document.createElement("img"); // the image element that represents the ingredient

        this.element.src = src; 
        this.element.style.position = "absolute";
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.gameScreen.appendChild(this.element);
    }

    updatePosition() {
        // Update the obstacle's position based on the properties left and top
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
}
move() {
    // Move the obstacle down by 3px
    this.top += 7;
    // Update the obstacle's position on the screen
    this.updatePosition();
  }

  // getRandomImage () {
  //   const randomIndex = Math.floor(Math.random()* this.imageArray.length);
  //   return this.imageArray[randomIndex];
  // }
}

