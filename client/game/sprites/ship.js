class Ship {
    constructor(game,x, y) {
        this.game = game;
        this.sprite = this.game.add.sprite(x, y,'ship');
        this.setupShip();
    }
    setupShip() {
        this.ROTATION_SPEED = 180; // degrees/second
        this.ACCELERATION = 200; // pixels/second/second
        this.MAX_SPEED = 250; // pixels/second
        this.DRAG = 50; // pixels/second

        this.sprite.scale.setTo(0.25,0.25);
        this.sprite.anchor.setTo(0.5, 0.5);
        this.sprite.angle = -90; // Point the ship up
        this.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);

        // Enable physics on the ship

        // Set maximum velocity
        this.sprite.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y

        // Add drag to the ship that slows it down when it is not accelerating
        this.sprite.body.drag.setTo(this.DRAG, this.DRAG); // x, y
    }
    update() {
        // Keep the ship on the screen
        if (this.sprite.x > this.game.width) this.sprite.x = 0;
        if (this.sprite.x < 0) this.sprite.x = this.game.width;
        if (this.sprite.y > this.game.height) this.sprite.y = 0;
        if (this.sprite.y < 0) this.sprite.y = this.game.height;

        var gameState = this.game.state.states[this.game.state.current];


        if (gameState.leftInputIsActive()) {
            // If the LEFT key is down, rotate left
            this.sprite.body.angularVelocity = -this.ROTATION_SPEED;
        } else if (gameState.rightInputIsActive()) {
            // If the RIGHT key is down, rotate right
            this.sprite.body.angularVelocity = this.ROTATION_SPEED;
        } else {
            // Stop rotating
            this.sprite.body.angularVelocity = 0;
        }

        if (gameState.upInputIsActive()) {
            // If the UP key is down, thrust
            // Calculate acceleration vector based on this.angle and this.ACCELERATION
            this.sprite.body.acceleration.x = Math.cos(this.sprite.rotation) * this.ACCELERATION;
            this.sprite.body.acceleration.y = Math.sin(this.sprite.rotation) * this.ACCELERATION;

            // Show the frame from the spritesheet with the engine on
            this.sprite.frame = 1;
        } else {
            // Otherwise, stop thrusting
            this.sprite.body.acceleration.setTo(0, 0);

            // Show the frame from the spritesheet with the engine off
            this.sprite.frame = 0;
        }



    }
}

export default Ship;