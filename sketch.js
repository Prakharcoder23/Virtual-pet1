//Create variables here
var dog, happyDog;
var database, foodS, foodStock; 
var dogImg,happydogImg;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happydogImg = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dog = createSprite(250,250,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46, 139, 87);
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogImg);
  }
    drawSprites();

    textSize(30);
    fill("blue");
    text("Remaining Bottles: "+ foodS,80,95);
    textSize(15);
    fill(0);
    text("Note: Press UP_ARROW key to feed drago milk",100,480);
  
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    Food:x
  })
}


