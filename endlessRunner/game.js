var game; // contains game
var bgColors = [0xF1645, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7C786A, 0x588C73, 0x2A5B84];
var tunnelWidth = 256; //width of the tunnel
var shipHorizontalSpeed = 100;
var shipVerticalSpeed = 15000;
var shipMoveDelay = 0;
var swipeDistance = 10;
//barriers
var barrierSpeed = 280;
var barrierGap = 120;
//Invulnerability
var shipInvisibilityTime = 1000;
//increasing difficulty
var barrierIncreaseSpeed = 1.1;
var shipInvisiblityTime = 1000;
//Scoring
var scoreHeight = 100;
var scoreSegments = [100,50,25,10,5,2,1];
var score;

window.onload = function () {
    console.log("==onload event");
    //populates game 3rd argument handles resizing auto-streched
    game = new Phaser.Game(640, 960, Phaser.AUTO, "");
    //adding states to the phaser game
    game.state.add("Boot", boot);
    game.state.add("Preload", preload);
    game.state.add("TitleScreen", titleScreen);
    game.state.add("PlayGame", playGame);
    game.state.add("GameOverScreen", gameOverScreen);
    //kickstart the game with Boot state
    game.state.start("Boot");
};
// the boot state is an object with a prototype method and it accepts the game object as an argument
var boot = function(game){};
    boot.prototype = { // methods are run automatically by phaser -preload, create etc
        //preload function runs before the create function
        preload: function () {
            console.log("==boot state. Preload method");
            //preloading an asset that will be a preloading bar
            this.game.load.image("loading", "assets/sprites/loading.png"); 
        },
        //create function sets up how the gamescreen is positioned
        create: function () {
            console.log("==boot state. Create method");
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            // keep original aspect ratio while maximising size in browser
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            //triggering the next state
            this.game.state.start("Preload");
        }
    };
//Preload state: loads assets, dipsays a loadingbar. 
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
            game.load.image("barrier", "assets/sprites/barrier.png");
            game.load.image("separator", "assets/sprites/separator.png");
            game.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");

        },
        create: function () {
            console.log("==preload state. Create method");
            this.game.state.start("TitleScreen");
        }
    };
//title state    
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
        //will be triggered by button interaction
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
            score = 0;
             var tintColor = bgColors[game.rnd.between(0, bgColors.length - 1)];
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

             //scoring
             for (var i=1;i <= scoreSegments.length; i++) {        
                 var leftSeperator = game.add.sprite((game.width - tunnelWidth)/2, scoreHeight* i, "separator");
				 leftSeperator.tint = tintColor;
				 leftSeperator.anchor.set(1,0);
				 var rightSeperator = game.add.sprite((game.width + tunnelWidth)/2, scoreHeight* i, "separator");
				 rightSeperator.tint = tintColor;
				 //rightSeparator.anchor.set(1,0);
				 var posX = (game.width - tunnelWidth)/2 - leftSeperator.width/2;
				 if(i%2 == 0) {
					posX = (game.width + tunnelWidth)/2 + leftSeperator.width/2;
				 }
				 game.add.bitmapText(posX, scoreHeight * (i-1) + scoreHeight/2 - 18, "font", scoreSegments[i-1].toString(), 36).anchor.x = 0.5;
			}
            //showing score
            this.scoreText = game.add.bitmapText(20, game.height -90, "font", "0", 40);
            
            // array of shipPosition, 2 members   
            this.shipPositions = [(game.width - tunnelWidth) / 2 + 32, (game.width + tunnelWidth) / 2 - 32];
            this.ship = game.add.sprite(this.shipPositions[0], 860, "ship");
            this.ship.destroyed = false;
            this.ship.side = 0;
            this.ship.anchor.set(0.5);
             //enable physice
            this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);
            this.ship.canMove = true;  //boolean to check that ship can Move
            this.ship.canSwipe = false; //swipe to move ship back
            game.input.onDown.add(this.moveShip, this); //react to tap or click
            //swipe sets the flag to false -  Spaceship Swipe
            game.input.onUp.add(function(){
                this.ship.canSwipe = false;
            }, this);
            //smoke emitter
            this.smokeEmitter = game.add.emitter(this.ship.x, this.ship.y +10, 20);
            this.smokeEmitter.makeParticles("smoke");
            this.smokeEmitter.setXSpeed(-30,30);
            this.smokeEmitter.setYSpeed(50,100);
            this.smokeEmitter.setAlpha(0.5, 1);
            //1 particle last for 1s and new one is genereated every 4ms
            this.smokeEmitter.start(false, 1000,40);
            //ship rises over 15 seconds
            this.verticalTween = game.add.tween(this.ship).to({
                y:0
            }, shipVerticalSpeed, Phaser.Easing.Linear.None, true);		
            //add barrier creation to create function to playGame
            this.barrierGroup = game.add.group(); //adds group to game
            this.addBarrier(this.barrierGroup, tintColor);
            //Highlighting scoring sector
            this.highlightBar = game.add.tileSprite(game.width/2, 0, tunnelWidth, scoreHeight, "smoke");
            this.highlightBar.anchor.set(0.5, 0);
            this.highlightBar.alpha = 0.1;
            this.highlightBar.visible = false;
            //game24.js: Showing score - runs a function every 250 ms
			game.time.events.loop(250, this.updateScore, this);
        },
        updateScore: function() {
			if(this.ship.alpha == 1 && !this.ship.destroyed){
				if(this.ship.y < scoreHeight * scoreSegments.length){
					var row = Math.floor(this.ship.y / scoreHeight);
					score += scoreSegments[row];
					this.scoreText.text = score.toString();
				}
			} 
	},
        moveShip: function(){
            // onDown triggers moveShip. Here we set the canSwipe flag to true
            this.ship.canSwipe = true;
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
        },
        update: function(){
            this.smokeEmitter.x = this.ship.x;
            this.smokeEmitter.y = this.ship.y;
            //check for swipe event 
            if (this.ship.canSwipe){
                if(Phaser.Point.distance(game.input.activePointer.positionDown, game.input.activePointer.position) > swipeDistance){
                    this.restartShip();
                }
            }
             //dying with style & invulnerability 
            if (!this.ship.destroyed && this.ship.alpha == 1) {
                    //game23.js: Highlighting scoring sector
                    if (this.ship.y < scoreHeight * scoreSegments.length) {
                        this.highlightBar.visible = true;
                        var row = Math.floor(this.ship.y / scoreHeight);
                        this.highlightBar.y = row* scoreHeight;
                    }
                    //game17.js: Checking Collisions
                    game.physics.arcade.collide(this.ship, this.barrierGroup, function(s,b) {
                        this.ship.destroyed = true;
                        this.smokeEmitter.destroy();
                        var destroyTween = game.add.tween(this.ship).to({
                            x: this.ship.x + game.rnd.between(100, -100),
                            y: this.ship.y - 100,
                            rotation:  10    

                        }, 1000, Phaser.Easing.Linear.None, true);
                        destroyTween.onComplete.add(function() {
                            var explosionEmitter = game.add.emitter(this.ship.x, this.ship.y, 200);
                            explosionEmitter.makeParticles("smoke");
                            explosionEmitter.setAlpha(0.5,1);
                            explosionEmitter.minParticleScale = 0.5;
                            explosionEmitter.maxParticleScale = 2;
                            explosionEmitter.start(true, 2000, null, 200);
                            this.ship.destroy();
                            game.time.events.add(Phaser.Timer.SECOND*2, function() {
                                game.state.start("GameOverScreen");
                            });
                        }, this);
                }, null, this)
            } 
           

            
        },
        //spaceship swipe	
        restartShip: function(){
            if (!this.ship.destroyed && this.ship.alpha ==1) {
            //game21.js: Increasing difficulty
            
            barrierSpeed *= barrierIncreaseSpeed;
            //console.log(barrierSpeed);
            for (var i=0;i< this.barrierGroup.length; i++){
                this.barrierGroup.getChildAt(i).body.velocity.y = barrierSpeed;
            }
            this.ship.canSwipe = false;
            //game19.js: Invulnerability
            this.ship.alpha = 0.5;
            this.verticalTween.stop();
            this.verticalTween = game.add.tween(this.ship).to({
                y: 860
            }, 100, Phaser.Easing.Linear.None, true);
            this.verticalTween.onComplete.add(function() {
                this.verticalTween = game.add.tween(this.ship).to({
                  y:0
                }, shipVerticalSpeed, Phaser.Easing.Linear.None, true);
                //game19.js: Invulnerability
                var alphaTween = game.add.tween(this.ship).to({
                    alpha: 1
                }, shipInvisiblityTime, Phaser.Easing.Bounce.in, true);
            }, this)
        }
    } ,
        //Continuously adding Barriers 
        addBarrier: function(group, tintColor){
            var barrier = new Barrier(game, barrierSpeed, tintColor);
            game.add.existing(barrier);
            //add it to the barrier group
            group.add(barrier);
        }
};
var gameOverScreen = function (game){};
    gameOverScreen.prototype = {
        //Checking Collisions
        create: function(){
            console.log("==gameOverScreen state. Create method");
        }
};
//barrier class that the spaceship has to avoid
Barrier = function(game, speed, tintColor){
    var positions = [(game.width - tunnelWidth)/2, (game.width + tunnelWidth)/2];
    var position = game.rnd.between(0,1);
    //invokes creation of sprite object
    Phaser.Sprite.call(this, game, positions[position], -100, "barrier");
    //crop the barrier sprite according to the size of tunnelwidth 
    //1st create a crop Rectangle
    var cropRect = new Phaser.Rectangle(0,0,tunnelWidth/2,24);
    //2nd enable crop the sprite with the rectangle 
    this.crop(cropRect);
    //enable ARCADE physics.
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(position, 0.5);
    this.tint = tintColor;
    //assign a velocity to ARCADE bodies 
    this.body.velocity.y = speed;
    //Fixes  - stops barrier losing velocity after a collision.
    this.body.immovable = true;
    //switch to check if a new barrier should be placed
    this.placeBarrier = true;
};
    Barrier.prototype = Object.create(Phaser.Sprite.prototype);
    Barrier.prototype.constructor = Barrier;
    Barrier.prototype.update = function(){
        if (this.placeBarrier && this.y > barrierGap){
            this.placeBarrier = false;
            //run addBarrier function, pass the parent 
            playGame.prototype.addBarrier(this.parent, this.tint);
        }
        if(this.y > game.height){
            this.destroy();
        }
    };






