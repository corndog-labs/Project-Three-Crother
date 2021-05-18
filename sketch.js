/***********************************************************************************
 Project three by Courtney Crother 

code by  Scott Kildall

  Uses the p5.2DAdventure.js class 
  
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
const cl_Charaters = 1;
const cl_Option1 = 2;
const cl_Option2 = 3; 
const cl_Option3 = 4;
const cl_Super = 5;
const cl_Very = 6;
const cl_Opt = 7;
const cl_Both = 8;
const cl_Opt1 = 9;
const cl_Both1 = 10;
const cl_Opt2 = 11;
const cl_Back = 12;
const cl_Nothing = 13;
const cl_Ignore = 14;
const cl_Upgrade = 15;
const cl_Call = 16;
const cl_Give = 17;
const cl_Stay = 18;
const cl_Fridge = 19
const cl_Uninstall = 20;
const cl_Lenny = 21;
const cl_Question = 22; 
const cl_Nothing2 = 23;
const cl_Listen = 24; 
const cl_Money = 25; 
const cl_StartOver1 = 26;
const cl_StartOver2 = 27;
const cl_StartOver3 = 28; 
const cl_StartOver4 = 29;
const cl_StartOver5 = 30; 

// room indices - look at adventureManager
const Splash = 0;
const Charaters = 1;
const Page1 = 2;
const Page2 = 3;
const Page3 = 4;
const Page4 = 5;
const Page5 = 6;
const Page6 = 7;
const Page7 = 8;
const Page8 = 9;
const Page9 = 10;
const Page10 = 11;
const Page11 = 12;
const Ending1 = 13;
const Ending2 = 14;
const Ending3 = 15;
const Ending4 = 16;
const Ending5 = 17;

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
      adventureManager.getStateName() === "charaters.png" ||
      adventureManager.getStateName() === "page1.png" 
            ) {
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
  clickables[30].onPress = clickableButtonPressed;
}

// tint when mouse is over
clickableButtonHover = function () {
  this.color = "#01BAD7";
  this.noTint = false;
  this.tint = "#FF0000";
  this.width = 250;
  this.height = 50;
  this.textSize = 20;
  this.textColor = "#FFFFFF";
  this.stroke = "FFFFFF";
}

// color an orange if off
clickableButtonOnOutside = function () {
  // backto our gray color
  this.color = "#FF1515";
  this.width = 250;
  this.height = 50;
  this.textSize = 22;
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
