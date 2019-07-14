import { mount } from '@vue/test-utils'
import Index from '@/components/block-row/Index';
import Block from '@/components/block-row/Block';

describe('@components/block-row/Index.vue', () => {
    let blocks = [0, 0, 0, 0];
    let wrapper;

    beforeEach(() => {
        blocks = [0, 0, 0, 0];
        wrapper = mount(Index, {
            propsData: { rowIndex: 0, blocks }
        });
    });

    describe('render', () => {
        it('should has `block-row` class', () => {
            expect(wrapper.classes('block-row')).toBe(true);
        });

        it('should set row index prop as 0', () => {
            expect(wrapper.props('rowIndex')).toBe(0);
        });

        it('should set blocks prop as `[0, 0, 0, 0]`', () => {
            expect(wrapper.props('blocks')).toBe(blocks);
        });

        it('should set blocks prop as empty array if there is no set blocks', () => {
            wrapper = mount(Index, { propsData: { rowIndex: 0 } });

            expect(wrapper.props('blocks')).toEqual([]);
        });

        it('should has `Block` component', () => {
            expect(wrapper.find(Block).exists()).toBe(true);
            expect(wrapper.vm.$el.children.length).toBe(4);
        });
    });
});
