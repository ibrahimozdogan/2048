<template>
    <div class="block-row">
        <Block
            v-for="(block, blockIndex) in blocks"
            :key="`${rowIndex}-${blockIndex}`"
            :value="block"
        />
    </div>
</template>

<script>
    import Block from './Block';

    export default {
        props: {
            /**
             * @property {string} rowIndex
             */
            rowIndex: {
                type: Number,
                required: true,
            },
            /**
             * @property {Array<Number>} blocks
             */
            blocks: {
                type: Array,
                default: [],
            },
        },

        components: { Block }
    }
</script>

<style lang="scss" scoped>
    .block-row {
        display: flex;
        position: relative;
    }
</style>