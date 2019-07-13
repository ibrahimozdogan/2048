<template>
    <div class="block">
        {{value || ''}}
    </div>
</template>

<script>
    export default {
        props: {
            /**
             * @property {number} value
             */
            value: {
                type: Number,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    $black: #2b2b2b;
    $size: 64px;

    .block {
        border: 1px solid $black;
        width: $size;
        height: $size;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>