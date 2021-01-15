var car, car_image;
var fuel, fuel_image;

var fuelGroup;

var fueling = 100;

var score = 0;

function preload(){
	car_image = loadImage("images/car.png");

	fuel_image = loadImage("images/fuel.png");
}

function setup(){
	createCanvas(displayWidth - 50, displayHeight - 150);

	car = createSprite(displayWidth / 2, displayHeight / 2)
	car.addImage("best", car_image);
	car.scale = 0.05;

	fuelGroup = new Group();
}

function draw(){
	background(51);

	if(keyIsDown(UP_ARROW)){
		car.y -= 50;
		camera.position.x = displayWidth / 2;
		camera.position.y = car.y;
		camera.position.y = car.y;

		fueling--;
	}

	if(fuelGroup.isTouching(car)){
		score += 1
		fueling += 50
	}

	createFuel();

	drawSprites();

	textSize(25);
	stroke(255, random(0, 255), random(0, 255));
	noFill();
	text("Fuel Remaining" + fueling, 100, car.y - 200);

	text("Score: " + score, 1200, car.y - 200);

	if(fueling <= 0){
		car.destroy();

		car.y = displayHeight / 2;
		if(keyIsDown(UP_ARROW)){
			return null;

			fueling = 0;
		}

		stroke(random(0, 255), random(0, 255), 255);
		text("Score: " + score, displayWidth / 2, displayHeight / 2);
	}
}

function createFuel(){
	if(frameCount % 100 === 0){

		fuel = createSprite(car.x, car.y - 500);
		fuel.addImage("petrol", fuel_image);
		fuel.scale = 0.1;

		fuelGroup.add(fuel);
	}
}
