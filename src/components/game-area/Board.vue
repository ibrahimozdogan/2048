<template>
    <div class="block-table">
        <BlockRow
            v-for="(blocks, rowIndex) in blockRows"
            :row-index="rowIndex"
            :blocks="blocks"
            :key="rowIndex"
        />
        <div v-if="this.blockRows.length === 0" class="block-table-text">
            {{translations.blockTableText}}
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import CommonEnums from '../../enums/CommonEnums';
    import MatrixService from '../../utils/MatrixService';
    import StorageService from '../../utils/StorageService';
    import Swipe from '../../utils/Swipe';
    import BlockRow from '../block-row/Index';

    const storageService = new StorageService();

    export default {
        components: {
            BlockRow
        },

        mounted () {
            this.listenKeyUpEvents();
            new Swipe().listen(this.shift);

            this.setProperty({ key: 'bestScore', value: storageService.get('best-score') });
        },

        data () {
            return {
                translations: {
                    blockTableText: 'Click `New Game` button to start game'
                }
            }
        },

        computed: {
            ...mapGetters({
                blockRows: 'getBlockRows',
                currentScore: 'getCurrentScore',
            })
        },

        methods: {
            ...mapActions([
                'setProperty',
                'incrementScore'
            ]),

            /**
             * @param {string} direction
             */
            shift (direction) {
                const matrixService = new MatrixService({
                    matrix: this.blockRows,
                    newElementValue: CommonEnums.NEW_ELEMENT_VALUE
                });
                const { matrix, status, accumulatedValue } = matrixService.merge(direction);

                if (status) {
                    matrixService.addRandomValue(1);
                }

                this.setProperty({ key: 'blockRows', value: matrix });
                this.incrementScore(accumulatedValue);

                if (this.currentScore > (storageService.get('best-score') || 0)) {
                    storageService.set({ key: 'best-score', value: this.currentScore });
                    this.setProperty({ key: 'bestScore', value: this.currentScore });
                }
            },

            listenKeyUpEvents () {
                document.addEventListener('keyup', event => {
                    const key = event.key;
                    const direction = key.replace('Arrow', '').toLowerCase();

                    if (CommonEnums.ALLOWED_BUTTONS.includes(key)) {
                        this.shift(direction)
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    $dark: #253342;
    $background-color: #BEAD9E;
    $text-color: #FEFEFE;
    $table-size: 296px;
    $display: flex;
    $center: center;


    .block-table {
        border-radius: 3px;
        background: $background-color;
        min-width: $table-size;
        min-height: $table-size;
        position: relative;
        padding: 5px;

        .block-table-text {
            color: $text-color;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>
