var game; // contains game


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

var boot = function(game){}
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
    }
//preload state
var preload = function(game){}
    preload.prototype = {
        preload: function () {
            console.log("==preload state. Preload method");
            var loadingBar = this.add.sprite(game.width/2, game.height/2, "loading");
            //change the registration point to the center of graphic
 /*           loadingBar.anchor.setTo(0.5, 0.5);
            game.load.setPreloadSprite(loadingBar);

            game.load.image("title", "assets/sprites/title.png");
            game.load.image("playbutton", "assets/sprites/playbutton.png");
            game.load.image("backsplash", "assets/sprites/backsplash.png");
            
*/
        },
        create: function () {
            console.log("==preload state. Create method");
         //   this.game.state.start("TitleScreen");
        }
    }
var titleScreen = function(game){}



var playGame = function (game){}
    playGame.prototype={
        
    }

var gameOverScreen = function (game){}