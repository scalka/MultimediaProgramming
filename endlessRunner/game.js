// TODO finished on slide 15th, with tile 

var game; // contains game
var bgColors = [0xF1645, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7C786A, 0x588C73, 0x2A5B84];
var tunnelWidth = 256;
var shipHorizontalSpeed = 100;
var shipMoveDelay = 0;

window.onload = function () {
    console.log("==onload event");
    //populates game 3rd argument handles resizing auto-streched
    game = new Phaser.Game(640, 960, Phaser.AUTO, "");
    //adding states
    game.state.add("Boot", boot);
    game.state.add("Preload", preload);

    game.state.add("TitleScreen", titleScreen);
    game.state.add("PlayGame", playGame);
    game.state.add("GameOverScreen", gameOverScreen);
    
    //kickstart the game with Boot state
    game.state.start("Boot");
};

var boot = function(game){};
    boot.prototype = { // methods are run automatically by phaser -preload, create etc
        preload: function () {
            console.log("==boot state. Preload method");
            this.game.load.image("loading", "assets/sprites/loading.png"); 
        },
        create: function () {
            console.log("==boot state. Create method");
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            // keep original aspect ratio while maximising size in browser
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.state.start("Preload");
        }
    };
//preload state
var preload = function(game){};
    preload.prototype = {
        preload: function () {
            console.log("==preload state. Preload method");
            var loadingBar = this.add.sprite(game.width/2, game.height/2, "loading");
            //change the registration point to the center of graphic
            loadingBar.anchor.setTo(0.5, 0.5);
            game.load.setPreloadSprite(loadingBar);
            game.load.image("title", "assets/sprites/title.png");
            game.load.image("playbutton", "assets/sprites/playbutton.png");
            game.load.image("backsplash", "assets/sprites/backsplash.png");
            game.load.image("tunnelbg", "assets/sprites/tunnelbg.png");
            game.load.image("wall", "assets/sprites/wall.png");
            game.load.image("ship", "assets/sprites/ship.png");
            game.load.image("smoke", "assets/sprites/smoke.png");

        },
        create: function () {
            console.log("==preload state. Create method");
            this.game.state.start("TitleScreen");
        }
    };
var titleScreen = function(game){};
    titleScreen.prototype = {
        create: function(){
            console.log("==title Screen state. Create method");
            //creating a tiled background from backslash title, repeat grayscale tile: “backsplash” in the Y direction
            var titleBg = game.add.tileSprite(0, 0, game.width, game.height, "backsplash");
            titleBg.tint = bgColors[game.rnd.between(0, bgColors.length-1)]; // phaser's random function    
            game.stage.backgroundColor = bgColors[game.rnd.between(0, bgColors.length - 1)];
            //title
            var title = game.add.image(game.width/2, 210, "title");
            title.anchor.set(0.5);
            
            
            //playbutton
            var playButton = game.add.button(game.width/2, game.height-150, "playbutton", this.startGame);
            playButton.anchor.set(0.5);
            //adding tween to the button
            var tween = game.add.tween(playButton).to({
                width: 220,
                height: 220
            }, 1500, "Linear", true, 0, -1);
            tween.yoyo(true);
        },
        startGame: function(){
            console.log("==title Screen state. startGame method");
            game.state.start("PlayGame");
        }
    };



//playGame State
var playGame = function(game){};
playGame.prototype = {  
  	create: function(){
          console.log("==playGame state. Create method");

         var tintColor = bgColors[game.rnd.between(0, bgColors.length - 1)]
         //tunnel
         var tunnelBG = game.add.tileSprite(0, 0, game.width, game.height, "tunnelbg");
         tunnelBG.tint = tintColor;
         //leftWall
         var leftWallBG = game.add.tileSprite(- tunnelWidth / 2, 0, game.width /2, game.height, "wall");
         leftWallBG.tint = tintColor;
         //right Wall
         var rightWallBG = game.add.tileSprite((game.width + tunnelWidth) / 2, 0, game.width / 2, game.height, "wall");
         rightWallBG.tint = tintColor;
         rightWallBG.tileScale.x = -1;

        // array of shipPosition, 2 members   
        this.shipPositions = [(game.width - tunnelWidth) / 2 + 32, (game.width + tunnelWidth) / 2 - 32];
        this.ship = game.add.sprite(this.shipPositions[0], 860, "ship");
        this.ship.side = 0;
        this.ship.anchor.set(0.5);
         //enable physice
        this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
         //boolean to check that ship can Move
        this.ship.canMove = true;
        //react to tap or click
        game.input.onDown.add(this.moveShip, this);
        
        //smoke emitter
        this.smokeEmitter = game.add.emitter(this.ship.x, this.ship.y +10, 20);
        this.smokeEmitter.makeParticles("smoke");
        this.smokeEmitter.setXSpeed(-30,30);
        this.smokeEmitter.setYSpeed(50,100);
        this.smokeEmitter.setAlpha(0.5, 1);
        //1 particle last for 1s and new one is genereated every 4ms
        this.smokeEmitter.start(false, 1000,40);
			
	},
    update: function(){
            this.smokeEmitter.x = this.ship.x;
            this.smokeEmitter.y = this.ship.y;
        },
	
	moveShip: function(){
               
        if(this.ship.canMove){
            this.ship.canMove = false;
            this.ship.side = 1 - this.ship.side; //toggles between 0 and 1.
            //add a tween to this.ship.side
            var horizontalTween = game.add.tween(this.ship).to({
            x: this.shipPositions[this.ship.side]
            }, shipHorizontalSpeed, Phaser.Easing.Linear.None, true);
            //on complete event
            horizontalTween.onComplete.add(function(){
                //add a delay
                game.time.events.add(shipMoveDelay, function(){
                    this.ship.canMove = true;
                }, this);
            }, this);
		}
        // ghost ship effect
        var ghostShip = game.add.sprite(this.ship.x, this.ship.y, "ship");
        ghostShip.alpha = 0.5;
        ghostShip.anchor.set(0.5);
        //tween transparency to 0 over 350ms
        var ghostTween = game.add.tween(ghostShip).to({
            alpha: 0
        }, 350, Phaser.Easing.Linear.None, true);
        //destroy ghostShip sprite
        ghostTween.onComplete.add(function(){
            ghostShip.destroy();
        });
	}		
};
var gameOverScreen = function (game){};








