<template>
    <div class="game-area">
        <Header></Header>
        <Board></Board>
    </div>
</template>

<script>
    import Board from './Board';
    import Header from './Header';

    export default {
        components: {
            Board,
            Header
        }
    };
</script>

<style lang="scss" scoped>
    $center: center;

    .game-area {
        display: flex;
        justify-content: $center;
        flex-direction: column;
        align-items: $center;
    }
</style>
