import { shallowMount } from '@vue/test-utils'
import Index from '@/components/game-area/Index'

describe('@components/game-area/Index.vue', () => {
    describe('render', () => {
        it('renders correctly', () => {
            let wrapper = shallowMount(Index, {});
            expect(wrapper.element).toMatchSnapshot();
        });
    });
});
