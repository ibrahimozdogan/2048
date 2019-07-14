import * as types from './types';

const state = {
    blockRows: [],
    bestScore: 0,
    currentScore: 0,
};

const getters = {
    getBlockRows: state => state.blockRows,
    getBestScore: state => state.bestScore,
    getCurrentScore: state => state.currentScore,
};

/**
 * @typedef {function} VuexAction
 * @type {object}
 */
const actions = {
    /**
     * @name setProperty
     * @param {function} [commit]
     * @param {object} property
     */
    [types.SET_PROPERTY] ({ commit }, property) {
        commit(types.SET_PROPERTY, property);
    },
    /**
     * @name incrementScore
     * @param {function} [commit]
     * @param {number} value
     */
    [types.INCREMENT_SCORE] ({ commit }, value) {
        commit(types.INCREMENT_SCORE, value);
    },
};

const mutations = {
    /**
     * @param {object} state
     * @param {object} property
     */
    [types.SET_PROPERTY] (state, { key, value }) {
        state[key] = value;
    },
    /**
     * @param {object} state
     * @param {number} value
     */
    [types.INCREMENT_SCORE] (state, value) {
        state.currentScore += value;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
