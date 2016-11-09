var game; // contains game


window.onload = function () {
    console.log("onload event");
    //populates game 3rd argument handles resizing auto-streched
    game = new Phaser.Game(640, 960, Phaser.AUTO, "");
    //adding states
    game.state.add("Boot", boot);
    game.state.add("Preload", preload);
/*    game.state.add("TitleScreen", titleScreen);
    game.state.add("PlayGame", playGame);
    game.state.add("GameOverScreen", gameOverScreen);
    */
    //kickstart the game with Boot state
    game.state.start("Boot");
};

var boot = function(game){
    boot.prototype = {
        preload: function () {
            console.log("==boot state. Preload method");
        },
        create: function () {
            console.log("==boot state. Create method");
        }
    }
};
var preload = function(game){
    preload.prototype = {
        preload: function () {
            console.log("==preload state. Preload method");
        },
        create: function () {
            console.log("==preload state. Create method");
        }
    }
};