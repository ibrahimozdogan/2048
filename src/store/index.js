import Vue from 'vue';
import Vuex from 'vuex';

import BLOCKS_STORE from './modules/game-store/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    BLOCKS_STORE,
  }
});
