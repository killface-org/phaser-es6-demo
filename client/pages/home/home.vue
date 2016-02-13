<template>
    <div class="container">
        <div id="home" class="row">
            <div class="col-md9">
                <div id="phaserCanvas" class="embed-responsive embed-responsive-16by9"></div>
            </div>
        </div>
    </div>
</template>

<style lang="sass" src="./home.scss"></style>

<script type="text/babel">
    import _ from 'lodash';
    import $http from 'axios';
    import stateSvc from '../../components/state/stateService.js';
    //import GameState from 'states/GameState';

    class GameState extends Phaser.State {
        preload() {
            this.game.load.spritesheet('ship', '/assets/gfx/pes2.png', 175, 100);
        };

        create() {
            // Set stage background color
            this.game.stage.backgroundColor = 0x333333;

            // Define motion constants
            this.ROTATION_SPEED = 180; // degrees/second
            this.ACCELERATION = 200; // pixels/second/second
            this.MAX_SPEED = 250; // pixels/second
            this.DRAG = 50; // pixels/second

            // Add the ship to the stage
            this.ship = this.game.add.sprite(this.game.width/2, this.game.height/2, 'ship');
            this.ship.scale.setTo(0.5,0.5);
            this.ship.anchor.setTo(0.5, 0.5);
            this.ship.angle = -90; // Point the ship up

            // Enable physics on the ship
            this.game.physics.enable(this.ship, Phaser.Physics.ARCADE);

            // Set maximum velocity
            this.ship.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y

            // Add drag to the ship that slows it down when it is not accelerating
            this.ship.body.drag.setTo(this.DRAG, this.DRAG); // x, y

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
        // Keep the ship on the screen
        if (this.ship.x > this.game.width) this.ship.x = 0;
        if (this.ship.x < 0) this.ship.x = this.game.width;
        if (this.ship.y > this.game.height) this.ship.y = 0;
        if (this.ship.y < 0) this.ship.y = this.game.height;

        if (this.leftInputIsActive()) {
            // If the LEFT key is down, rotate left
            this.ship.body.angularVelocity = -this.ROTATION_SPEED;
        } else if (this.rightInputIsActive()) {
            // If the RIGHT key is down, rotate right
            this.ship.body.angularVelocity = this.ROTATION_SPEED;
        } else {
            // Stop rotating
            this.ship.body.angularVelocity = 0;
        }

        if (this.upInputIsActive()) {
            // If the UP key is down, thrust
            // Calculate acceleration vector based on this.angle and this.ACCELERATION
            this.ship.body.acceleration.x = Math.cos(this.ship.rotation) * this.ACCELERATION;
            this.ship.body.acceleration.y = Math.sin(this.ship.rotation) * this.ACCELERATION;

            // Show the frame from the spritesheet with the engine on
            this.ship.frame = 1;
        } else {
            // Otherwise, stop thrusting
            this.ship.body.acceleration.setTo(0, 0);

            // Show the frame from the spritesheet with the engine off
            this.ship.frame = 0;
        }
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

    class Game extends Phaser.Game {

        constructor() {
            super(940, 528, Phaser.AUTO, 'phaserCanvas', null);
            this.state.add('GameState', new GameState(), false);
            this.state.start('GameState');
        }

    }



    new Game();

    export default {
        data: function()
        {
            return {
                state: stateSvc.state
            };
        }
    }
</script>