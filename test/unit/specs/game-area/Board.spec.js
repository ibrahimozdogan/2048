import { shallowMount, createLocalVue } from '@vue/test-utils'
import Board from '@/components/game-area/Board'
import Vuex from 'vuex';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('@components/game-area/Board.vue', () => {
    let gameStore;
    let store;
    let wrapper;
    let data;
    let currentScore = 10;
    let bestScore = 20;
    let blockRows = [[0, 2, 2048, 4], [0, 2, 0, 4], [0, 2, 0, 4], [0, 2, 0, 4]];

    beforeEach(() => {
        gameStore = {
            actions: {
                setProperty: jest.fn(),
            },
            getters: {
                getCurrentScore: () => currentScore,
                getBestScore: () => bestScore,
                getBlockRows: () => blockRows,
            },
            state: { currentScore, bestScore, blockRows },
        };
        store = new Vuex.Store({ modules: { gameStore } });
        data = {
            translations: {
                blockTableText: 'Click `New Game` button to start game'
            }
        };
        wrapper = shallowMount(Board, {
            store,
            localVue,
            propsData: { data }
        });
    });

    describe('render', () => {
        it('renders correctly', () => {
            expect(wrapper.element).toMatchSnapshot();
        });
    });
});
