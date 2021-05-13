/***********************************************************************************
 Project three by Courtney Crother 

code by  Scott Kildall

  Uses the p5.2DAdventure.js class 
  
------------------------------------------------------------------------------------
	To use:
	Add this line to the index.html

  <script src="p5.2DAdventure.js"></script>
***********************************************************************************/

// adventure manager global  
var adventureManager;

// p5.play
var playerSprite;
var playerAnimation;

// Clickables: the manager class
var clickablesManager;    // the manager class
var clickables;           // an array of clickable objects


// indexes into the clickable array (constants) 
const cl_startScenario = 0;
const cl_Start_GoomazonPays = 1;
const cl_Start_CityPays = 2;
const cl_Start_RaiseTaxes = 3;
const cl_GoomazonMoves_CityPays = 4;
const cl_GoomazonMoves_RaiseTaxes = 5;
const cl_GoomazonMoves_BuildRival = 6;
const cl_GoomazonMoves_IgnoreThem = 7;
const cl_CityPays_CutTheArts = 8;
const cl_CityPays_CutTransportation = 9;
const cl_CityPays_CutCityWages = 10;
const cl_CityPays_CutParks = 11;


// anger emojis
var angerImage;   // anger emoji
var maxAnger = 5;

// character arrays
var characterImages = [];   // array of character images, keep global for future expansion
var characters = [];        // array of charactes

// characters
const goomazon = 0;
const mayor = 1;
const bigLabor = 2;
const nimby = 3;
const treeHugger = 4;
const consumer = 5;

// room indices - look at adventureManager
const splash = 0;
const page1 = 1;
const page2 = 2;
const page3 = 3;
const page4 = 4;
const page5 = 5;
const page6 = 6;
const page7 = 7;
const page8 = 8;
const page9 = 9;
const page10 = 10;
const page11 = 11;
const page12 = 12;
const page13 = 13;
const page14 = 14;
const page15 = 15;
const page16 = 16;




// Allocate Adventure Manager with states table and interaction tables
function preload() {

  // load all images  
  allocateCharacters();

  clickablesManager = new ClickableManager('data/clickableLayout.csv');
  adventureManager = new AdventureManager('data/adventureStates.csv', 'data/interactionTable.csv', 'data/clickableLayout.csv');
}

// Setup the adventure manager
function setup() {
  createCanvas(1280, 720);

  // setup the clickables = this will allocate the array
  clickables = clickablesManager.setup();

  // this is optional but will manage turning visibility of buttons on/off
  // based on the state name in the clickableLayout
  adventureManager.setClickableManager(clickablesManager);

  // This will load the images, go through state and interation tables, etc
  adventureManager.setup();

  // load all text screens
  loadAllText();

  // call OUR function to setup additional information about the p5.clickables
  // that are not in the array 
  setupClickables(); 

  fs = fullscreen();
}

// Adventure manager handles it all!
function draw() {
  // draws background rooms and handles movement from one to another
  adventureManager.draw();

 // drawCharacters();

  // don't draw them on first few screens
  if( adventureManager.getStateName() === "splash.png" ||
      adventureManager.getStateName() === "page1.png" ||
      adventureManager.getStateName() === "page2.png" ) {
    ;
  }
  else {
    drawCharacters();
  }
  
  // draw the p5.clickables, in front of the mazes but behind the sprites 
  clickablesManager.draw();
}

// pass to adventure manager, this do the draw / undraw events
function keyPressed() {
  // toggle fullscreen mode
  if( key === 'f') {
    fs = fullscreen();
    fullscreen(!fs);
    return;
  }

  // dispatch all keys to adventure manager
  adventureManager.keyPressed(key); 
}

function mouseReleased() {
  // dispatch all mouse events to adventure manager
  adventureManager.mouseReleased();
}

function drawCharacters() {
  for( let i = 0; i < characters.length; i++ ) {
    characters[i].draw();
  }
}

//-------------- CLICKABLE CODE  ---------------//

function setupClickables() {
  // All clickables to have same effects
  for( let i = 0; i < clickables.length; i++ ) {
    clickables[i].onHover = clickableButtonHover;
    clickables[i].onOutside = clickableButtonOnOutside;    
  }

  // we do specific callbacks for each clickable
  clickables[0].onPress = clickableButtonPressed;
  clickables[1].onPress = clickableButtonPressed;
  clickables[2].onPress = clickableButtonPressed;
  clickables[3].onPress = clickableButtonPressed;
  clickables[4].onPress = clickableButtonPressed;
  clickables[5].onPress = clickableButtonPressed;
  clickables[6].onPress = clickableButtonPressed;
  clickables[7].onPress = clickableButtonPressed;
  clickables[8].onPress = clickableButtonPressed;
  clickables[9].onPress = clickableButtonPressed;
  clickables[10].onPress = clickableButtonPressed;
  clickables[11].onPress = clickableButtonPressed;
  clickables[12].onPress = clickableButtonPressed;
  clickables[13].onPress = clickableButtonPressed;
  clickables[14].onPress = clickableButtonPressed;
  clickables[15].onPress = clickableButtonPressed;
  clickables[16].onPress = clickableButtonPressed;
  clickables[17].onPress = clickableButtonPressed;
  clickables[18].onPress = clickableButtonPressed;
  clickables[19].onPress = clickableButtonPressed;
  clickables[20].onPress = clickableButtonPressed;
  clickables[21].onPress = clickableButtonPressed;
  clickables[22].onPress = clickableButtonPressed;
  clickables[23].onPress = clickableButtonPressed;
  clickables[24].onPress = clickableButtonPressed;
  clickables[25].onPress = clickableButtonPressed;
  clickables[26].onPress = clickableButtonPressed;
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#01BAD7";
  this.noTint = false;
  this.tint = "#FF0000";
  this.width = 250;
  this.height = 50;
  this.textSize = 18;
  this.textColor = "#FFFFFF";
  this.stroke = "FFFFFF";
}

// color a light gray if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#AAAAAA";
  this.width = 250;
  this.height = 50;
  this.textSize = 18;
  this.textColor = "#FFFFFF";
  this.stroke = "FFFFFF";
}

clickableButtonPressed = function() {
  adventureManager.clickablePressed(this.name);
  this.width = 250;
  this.height = 50;
  this.textSize = 18;
  this.textColor = "#FFFFFF";
  this.stroke = "FFFFFF";
} 
