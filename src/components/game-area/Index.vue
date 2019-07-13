<template>
    <div class="game-area">
        <div class="blocks">
            <BlockRow
                v-for="(blocks, rowIndex) in blockRows"
                :row-index="rowIndex"
                :blocks="blocks"
                :key="rowIndex"
            />
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import CommonEnums from '../../enums/CommonEnums';
    import MatrixService from '../../utils/MatrixService';
    import BlockRow from '../block-row/Index';

    export default {
        components: {
            BlockRow
        },

        mounted () {
            const blockRows = new MatrixService().create(CommonEnums.GAME_SIZE).addRandomValue(2);
            this.setBlockRows(blockRows);
            this.listenKeyUpEvents();
        },

        computed: {
            ...mapGetters({
                blockRows: 'getBlockRows'
            })
        },

        methods: {
            ...mapActions([
                'setBlockRows',
            ]),

            listenKeyUpEvents () {
                const matrixService = new MatrixService({ matrix: this.blockRows });

                document.addEventListener('keyup', event => {
                    const key = event.key;
                    const direction = key.replace('Arrow', '').toLowerCase();

                    if (CommonEnums.ALLOWED_BUTTONS.includes(key)) {
                        const { matrix, status } = matrixService.merge(direction);

                        if (status) {
                            matrixService.addRandomValue(1);
                        }

                        this.setBlockRows(matrix);
                    }
                });
            }
        }
    };
</script>

<style lang="scss" scoped>
    $dark: #253342;

    .game-area {
        display: flex;
        justify-content: center;
    }

    .blocks {
        border: 1px solid $dark;
    }
</style>