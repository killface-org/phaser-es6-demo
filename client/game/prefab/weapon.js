import Bullet from './bullet.js';

class WeaponSingleBullet extends Phaser.Group {
    constructor(game) {
        super(game, game.world, 'Single Bullet', false, true, Phaser.Physics.ARCADE);
        this.game = game;
        this.nextFire = 0;
        this.bulletSpeed = 600;
        this.fireRate = 10;

        for (var i = 0; i < 64; i++)
        {
            this.add(new Bullet(game, 'bullet10'), true);
        }

        return this;
    }

    fire(source) {
        var x = source.x + (Math.cos(Phaser.Math.degToRad(source.angle)) * 75);
        var y = source.y + (Math.sin(Phaser.Math.degToRad(source.angle)) * 75);
        if (this.nextFire >= this.fireRate) {
            this.getFirstExists(false).fire(x, y, source.angle, this.bulletSpeed, 0, 0);
            this.nextFire = 0;
        } else {
            this.nextFire++;
        }
    }
}

export default WeaponSingleBullet;
