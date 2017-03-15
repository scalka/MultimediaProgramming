var game = new Phaser.Game(640, 640, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.tilemap('myTilemap', 'assets/tilemaps/maps/spaceShip.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('myTileSet', 'assets/tilemaps/tiles/scifi_platformTiles_32x32.png');
	game.load.image('bg', 'assets/img/scifi_platform_BG1.jpg');
}

var map;
var backgroundLayer;
var blockLayer;
var cursors;
var bg;

function create() {

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('myTilemap');
    map.addTilesetImage('scifi_platformTiles_32x32', 'myTileSet');
    
	bg = this.add.tileSprite(0,0, 640,640, 'bg');
   backgroundLayer = map.createLayer('background');
//	blockLayer = map.createLayer('blocklayer');
   
   //backgroundLayer.resizeWorld();

    //backgroundLayer.wrap = true;

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    if (cursors.left.isDown)
    {
        game.camera.x -= 8;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 8;
    }

    if (cursors.up.isDown)
    {
        game.camera.y -= 8;
    }
    else if (cursors.down.isDown)
    {
        game.camera.y += 8;
    }

}