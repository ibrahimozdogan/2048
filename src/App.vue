<template>
  <div id="app">
    <game-area></game-area>
  </div>
</template>

<script>
import GameArea from './components/game-area/Index.vue'

export default {
  name: 'app',

  components: {
    GameArea
  }
}
</script>

<style lang="scss">
  $background-color: #FAF8EE;

  body {
    background: $background-color;
    height: 100%;
    overflow: hidden;
    width: 100%;
    position: fixed;
    margin: 0;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
