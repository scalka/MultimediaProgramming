var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.tilemap('mario', 'assets/tilemaps/maps/superMarioTiled3.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/tilemaps/tiles/super_mario.png');
  
}

var map;
var foreground, background;
var p;
var cursors;

function create() {

    game.stage.backgroundColor = '#787878';

    map = game.add.tilemap('mario');
	console.log(map)
    map.addTilesetImage('superMario', 'tiles');
    
	
	background = map.createLayer('Background');
	background.resizeWorld();
	background.warp = false;
    
	foreground = map.createLayer('Foreground');
    foreground.resizeWorld();
    foreground.wrap = false;

	
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