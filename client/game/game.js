import GameState from './states/default.js';

class Game extends Phaser.Game {

    constructor(id) {
        super('99%', '97%', Phaser.AUTO, id, null,false,false);
        this.state.add('GameState', GameState, false);
        this.state.start('GameState');
    }

}

export default Game;

