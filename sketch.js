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

const cl_Enter = 0;
const cl_Option1 = 1;
const cl_Option2 = 2; 
const cl_Option3 = 3;
const cl_Super = 4;
const cl_Very = 5;
const cl_Opt = 6;
const cl_Both = 7;
const cl_Opt1 = 8;
const cl_Both1 = 9;
const cl_Opt2 = 10;
const cl_Back = 11;
const cl_Nothing = 12;
const cl_Ignore = 13;
const cl_Upgrade = 14;
const cl_Call = 15;
const cl_Give = 16;
const cl_Stay = 17;
const cl_Fridge = 18
const cl_Uninstall = 19;
const cl_Lenny = 20;
const cl_Question = 21; 
const cl_Nothing2 = 22;
const cl_Listen = 23; 
const cl_Money = 24; 
const cl_StartOver1 = 25;
const cl_StartOver2 = 26;
const cl_StartOver3 = 27; 
const cl_StartOver4 = 28;
const cl_StartOver5 = 29; 


// room indices - look at adventureManager
const Splash = 0;
const Page1 = 1;
const Page2 = 2;
const Page3 = 3;
const Page4 = 4;
const Page5 = 5;
const Page6 = 6;
const Page7 = 7;
const Page8 = 8;
const Page9 = 9;
const Page10 = 10;
const Page11 = 11;
const Ending1 = 12;
const Ending2 = 13;
const Ending3 = 14;
const Ending4 = 15;
const Ending5 = 16;


let headlineFont;
let bodyFont;


// Allocate Adventure Manager with states table and interaction tables
function preload() {

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
  clickables[27].onPress = clickableButtonPressed;
  clickables[28].onPress = clickableButtonPressed;
  clickables[29].onPress = clickableButtonPressed;
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
