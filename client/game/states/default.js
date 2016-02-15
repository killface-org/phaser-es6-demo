import Ship from '../prefab/ship.js';
import BadGuy from '../prefab/badguy.js';

class GameState extends Phaser.State {
    preload() {
        this.game.time.advancedTiming = true;
        this.game.load.spritesheet('ship', '/assets/gfx/BlueShip.png', 1188, 700);
        this.game.load.spritesheet('badguy', '/assets/gfx/BasicShip.png', 32, 32);
        this.game.load.image('bullet10', 'assets/gfx/bullet10.png');
    };

    create() {
        // Set stage background color
        this.game.stage.backgroundColor = 0x333333;
        // Add the ship to the stage
        this.player = new Ship(this.game,this.game.width/2,this.game.height/2);
        this.enemies = this.game.add.group();

        for (var i = 0; i < 100; i++) {
            this.enemies.add(new BadGuy(this.game,this.game.world.randomX, this.game.world.randomY));
        }
        //this.ships.push(new Ship(this.game,this.game.width,this.game.height));

        // Capture certain keys to prevent their default actions in the browser.
        // This is only necessary because this is an HTML5 game. Games on other
        // platforms may not need code like this.
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ]);
    };
}
// The update() method is called every frame
GameState.prototype.update = function() {
    this.player.update();
    this.game.physics.arcade.overlap(this.player.bullets, this.enemies, this.collisionHandler, null, this);
    this.game.physics.arcade.overlap(this.player.sprite, this.enemies, this.collisionHandlerPlayer, null, this);
    this.game.debug.text('FPS:' + this.game.time.fps || 'FPS:--', 2, 14, "#00ff00");
//        this.ship.update();
};

GameState.prototype.collisionHandler = function(bullet,enemy) {
    bullet.kill();
    enemy.kill();
};

GameState.prototype.collisionHandlerPlayer = function(player,enemy) {
    enemy.kill();
};

GameState.prototype.spaceIsActive = function() {
    return this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
};

// This function should return true when the player activates the "go left" control
// In this case, either holding the right arrow or tapping or clicking on the left
// side of the screen.
GameState.prototype.leftInputIsActive = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
    return isActive;
};

// This function should return true when the player activates the "go right" control
// In this case, either holding the right arrow or tapping or clicking on the right
// side of the screen.
GameState.prototype.rightInputIsActive = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
    return isActive;
};

// This function should return true when the player activates the "jump" control
// In this case, either holding the up arrow or tapping or clicking on the center
// part of the screen.
GameState.prototype.upInputIsActive = function() {
    var isActive = false;

    isActive = this.input.keyboard.isDown(Phaser.Keyboard.UP);
    return isActive;
};

GameState.prototype.downInputIsActive = function() {
    return this.input.keyboard.isDown(Phaser.Keyboard.DOWN);
};

export default GameState;