import Ship from '../sprites/ship.js';

class GameState extends Phaser.State {
    preload() {
        this.game.time.advancedTiming = true;
        this.game.load.spritesheet('ship', '/assets/gfx/BlueShip.png', 1188, 700);
    };

    create() {
        // Set stage background color
        this.game.stage.backgroundColor = 0x333333;
        // Add the ship to the stage
        this.ships = [];
        for (var i = 0; i < 1; i++) {
            this.ships.push(new Ship(this.game,(Math.random() * this.game.width),(Math.random() * this.game.height)));
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
    for (var i = 0; i < this.ships.length; i++) {
        this.ships[i].update();
    }
    this.game.debug.text('FPS:' + this.game.time.fps || 'FPS:--', 2, 14, "#00ff00");
//        this.ship.update();
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

export default GameState;