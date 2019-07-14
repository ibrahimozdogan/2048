<template>
    <div class="block" :style="{ backgroundColor }">
        {{value || ''}}
    </div>
</template>

<script>
    import CommonEnums from '../../enums/CommonEnums';

    export default {
        props: {
            /**
             * @property {number} value
             */
            value: {
                type: Number,
                required: true
            }
        },

        computed: {
            /**
             * @return {string}
             */
            backgroundColor () {
                const color = CommonEnums.COLORS[this.value];

                return this.value === 0 ? '#CFC1B2' : (color || '#3E3933');
            }
        }
    }
</script>

<style lang="scss" scoped>
    $primary-background: #CFC1B2;
    $size: 64px;
    $medium-text: 24px;
    $text-color: #796E64;

    .block {
        background-color: $primary-background;
        margin: 5px;
        width: $size;
        height: $size;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 3px;
        font-size: $medium-text;
        font-weight: bold;
        color: $text-color;
    }
</style>
