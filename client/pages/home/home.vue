<template>
    <div id="game">
        <div id="gameCanvas"></div>
    </div>
</template>

<style lang="sass" src="./home.scss"></style>

<script type="text/babel">
    import _ from 'lodash';
    import $http from 'axios';
    import stateSvc from '../../components/state/stateService.js';
    import Game from '../../game/game.js';

    new Game('gameCanvas');

    export default {
        data: function()
        {
            return {
                state: stateSvc.state
            };
        }
    }
</script>