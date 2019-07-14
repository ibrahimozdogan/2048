<template>
    <div class="header">
        <div class="row">
            <div class="game-name bold">2048</div>
            <div class="score-area">
                <div class="score current-score bold">
                    <div class="title">{{translations.currentScore}}</div>
                    <div class="score">{{currentScore}}</div>
                </div>
                <div class="score best-score bold">
                    <div class="title">{{translations.bestScore}}</div>
                    <div class="score">{{bestScore}}</div>
                </div>
            </div>
        </div>
        <div class="row">
            <div>{{translations.description}}</div>
            <div class="button bold" @click="this.startGame">{{translations.newGame}}</div>
        </div>
        <div class="achievement-message" v-if="achievementCompleted">
            {{translations.achievement}}
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import CommonEnums from '../../enums/CommonEnums';
    import MatrixService from '../../utils/MatrixService';

    export default {
        computed: {
            ...mapGetters({
                currentScore: 'getCurrentScore',
                bestScore: 'getBestScore',
                blockRows: 'getBlockRows',
            }),


            achievementCompleted () {
                return new MatrixService({ matrix: this.blockRows }).has(2048);
            }
        },

        data () {
            return {
                translations: {
                    currentScore: 'Score',
                    bestScore: 'Best',
                    newGame: 'New Game',
                    description: 'Get to the 2048',
                    achievement: 'You have achieved 2048, Enjoy.'
                }
            };
        },

        methods: {
            ...mapActions([
                'setProperty'
            ]),

            startGame () {
                const blockRows = new MatrixService().create(CommonEnums.GAME_SIZE).addRandomValue(2).get();
                this.setProperty({ key: 'blockRows', value: blockRows });
            }
        }
    }
</script>

<style lang="scss" scoped>
    $huge-text: 40px;
    $big-text: 20px;
    $medium-text: 16px;
    $small-text: 12px;
    $display: flex;
    $primary-color: #FFFFFF;
    $secondary-color: #937963;
    $background-color: #937963;
    $radius: 2px;

    .header {
        width: 250px;
        margin-bottom: 30px;

        .row {
            display: $display;
            justify-content: space-between;
            align-items: center;

            .game-name {
                font-size: $huge-text;
                color: $secondary-color;
            }

            .score-area {
                display: $display;
                flex-direction: row;
                padding: 2px;
            }

            .score {
                background: $background-color;
                color: $primary-color;
                margin: 2px;
                font-size: $medium-text;
                padding: 2px 5px;
                min-width: 32px;
                border-radius: $radius;
            }

            .button {
                background: $background-color;
                color: $primary-color;
                padding: 3px 16px;
                border-radius: 2px;
                cursor: pointer;
                margin-right: 4px;
            }
        }
    }

    .bold {
        font-weight: bold;
    }

    .achievement-message {
        position: absolute;
        top: 10px;
        padding: 10px;
    }
</style>
