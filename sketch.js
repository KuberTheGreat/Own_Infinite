// The variable section
var car, car_image;
var fuel, fuel_image;

// Group for the fueling
var fuelGroup;

var fueling = 100;

var score = 0;

var track, track_image;

// Function to preload all the images
function preload(){
	// Loaded all the images for the sprites
	car_image = loadImage("images/car.png");

	fuel_image = loadImage("images/fuel.png");

	track_image = loadImage("images/track.jpg");
}

function setup(){
	// Creates the canvas as per the screen 
	createCanvas(displayWidth - 50, displayHeight - 150);

	// Creates the track first so that the car comes over it
	track = createSprite(displayWidth / 2, -displayHeight * 4);
	track.addImage("rasta", track_image);

	// Creates the car sprite, adds the images and reduces the size
	car = createSprite(displayWidth / 2, displayHeight / 2)
	car.addImage("best", car_image);
	car.scale = 0.05;

	// Creates the fuel group
	fuelGroup = new Group();
}

function draw(){
	background(51);

	// If the up_arrow is pressed
	if(keyIsDown(UP_ARROW)){
		// The car moves 40 frames
		car.y -= 40;
		// Moves the camera with it
		camera.position.x = displayWidth / 2;
		camera.position.y = car.y;
		camera.position.y = car.y;

		// Reduces the fueling by 1
		fueling--;
	}

	// If the fuel group touches the car
	if(fuelGroup.isTouching(car)){
		// The score increases by 1
		score += 1;
		// Also increases the fueling by 20
		fueling += 20;
	}

	// Calls the create fuel function 
	createFuel();

	drawSprites();

	// Displays the score and the fuel remaining text
	textSize(25);
	stroke(255, random(0, 255), random(0, 255));
	noFill();
	text("Fuel Remaining" + fueling, 100, car.y - 200);

	text("Score: " + score, 1200, car.y - 200);

	// Condition if the fuel vanishes
	if(fueling <= 0){
		// The canvas is cleared and the background color is set to black
		clear();
		background("black");
		// Destroys the car sprite
		car.destroy();

		// Displays the game over text in the console
		console.log("Game Ended!!");

		// Sets the car y at the center
		car.y = displayHeight / 2;
		// Returns no output when the up_arrow is pressed and fueling is set to 0
		if(keyIsDown(UP_ARROW)){
			return null;

			fueling = 0;
		}

		// Fixed stroke and fill to the game over text
		stroke(255, 255, 255);
		fill(255, 255, 255);
		text("Game Over!!", displayWidth / 2 - 100, displayHeight / 2 - 100);

		// Random fill to the best score text
		noStroke();
		fill(random(100, 255), random(100, 255), 100);
		text("Best Score: " + score, displayWidth / 2 - 100, displayHeight / 2);
	}
}

// Function to create the fuel
function createFuel(){
	// After a count of 90 frames
	if(frameCount % 90 === 0){

		// Creates the fuel sprite and adds the image
		fuel = createSprite(car.x, car.y - 500, 1, 1);
		fuel.addImage("petrol", fuel_image);
		fuel.scale = 0.1;

		// Adds the fuel sprite to the fuel group
		fuelGroup.add(fuel);
	}
}