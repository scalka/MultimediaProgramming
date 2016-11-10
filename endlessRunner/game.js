// TODO finished on slide 15th, with tile 

var game; // contains game
var bgColors = [0xF1645, 0xFFC65D, 0x7BC8A4, 0x4CC3D9, 0x93648D, 0x7C786A, 0x588C73, 0x2A5B84];

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
            console.log("titleBg.tint");
            
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



var playGame = function (game){};
    playGame.prototype={
        
    };

var gameOverScreen = function (game){};