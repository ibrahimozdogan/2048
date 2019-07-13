import * as types from './types';

const state = {
    blockRows: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ]
};

const getters = {
    getBlockRows: state => state.blockRows,
};

/**
 * @typedef {function} VuexAction
 * @type {object}
 */
const actions = {
    /**
     * @name setBlockRows
     * @param {function} [commit]
     * @param {Array<Array<number>>} blockRows
     */
    async [types.SET_BLOCK_ROWS] ({ commit }, blockRows) {
        commit(types.SET_BLOCK_ROWS, blockRows);
    },
};

const mutations = {
    /**
     * @param {object} state
     * @param {Array<Array<number>>} blockRows
     */
    [types.SET_BLOCK_ROWS] (state, blockRows) {
        state.blockRows = blockRows;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};
