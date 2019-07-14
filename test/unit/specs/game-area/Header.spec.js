import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils'
import Header from '@/components/game-area/Header'
import MatrixService from '@/utils/MatrixService'

const localVue = createLocalVue();
localVue.use(Vuex);

describe('@components/game-area/Header.vue', () => {
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
                currentScore: 'Score',
                    bestScore: 'Best',
                    newGame: 'New Game',
                    description: 'Get to the 2048',
                    achievement: 'You have achieved 2048, Enjoy.'
            }
        };
        wrapper = mount(Header, {
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

    describe('computed', () => {
        it('should return false when 2048 is not achieved', () => {
            var hasMock = jest.spyOn(MatrixService.prototype, 'has').mockImplementation(() => false);

            expect(Header.computed.achievementCompleted.apply({ blockRows: [[]] })).toBe(false);
            expect(hasMock).toBeCalledWith(2048);

            hasMock.mockRestore();
        });

        it('should return true when 2048 is achieved', () => {
            var hasMock = jest.spyOn(MatrixService.prototype, 'has').mockImplementation(() => true);

            expect(Header.computed.achievementCompleted.apply({ blockRows: [[]] })).toBe(true);
            expect(hasMock).toBeCalledWith(2048);

            hasMock.mockRestore();
        });
    });
});
