class BadGuy extends Phaser.Sprite {
    constructor(game,x,y) {
        super(game,x,y,'badguy');
        this.game = game;
        this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;
        this.anchor.set(0.5);
        this.setupShip();
    }
    setupShip() {
        this.ROTATION_SPEED = 180; // degrees/second
        this.ACCELERATION = Math.floor(Math.random() * 200); // pixels/second/second
        this.MAX_SPEED = Math.floor(Math.random() * 250); // pixels/second
        this.DRAG = 50; // pixels/second
        this.angle = this.game.rnd.angle();
        this.game.physics.enable(this, Phaser.Physics.ARCADE);
        this.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED); // x, y

        // Add drag to the ship that slows it down when it is not accelerating
        this.body.drag.setTo(this.DRAG, this.DRAG); // x, y

    }

    update() {
        if (this.x > this.game.width) this.x = 0;
        if (this.x < 0) this.x = this.game.width;
        if (this.y > this.game.height) this.y = 0;
        if (this.y < 0) this.y = this.game.height;
        this.body.acceleration.x = Math.cos(this.rotation) * this.ACCELERATION;
        this.body.acceleration.y = Math.sin(this.rotation) * this.ACCELERATION;

        // Show the frame from the spritesheet with the engine on
        this.frame = 1;
    }
}

export default BadGuy;