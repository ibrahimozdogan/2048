import { mount } from '@vue/test-utils'
import Block from '@/components/block-row/Block'

describe('@components/block-row/Block.vue', () => {
    let wrapper;
    let value = 0;

    beforeEach(() => {
        wrapper = mount(Block, { propsData: { value } });
    });

    describe('render', () => {
        it('should has `block` class', () => {
            expect(wrapper.classes('block')).toBe(true);
        });

        it('should set text content as a empty string when value is 0', () => {
            expect(wrapper.text()).toBe('');
        });

        it('should set given value to text content when value is not 0', () => {
            wrapper = mount(Block, { propsData: { value: 8 } });

            expect(wrapper.text()).toBe('8');
        });
    });

    describe('computed', () => {
        it('should set background color as `#CFC1B2` when component value property is 0', () => {
            const value = { value: 0 };
            expect(Block.computed.backgroundColor.apply(value)).toBe('#CFC1B2');
        });

        it('should set background color as `#EEE4DA` when component value property is 2', () => {
            const value = { value: 2 };
            expect(Block.computed.backgroundColor.apply(value)).toBe('#EEE4DA');
        });


        it('should set background color as `#3E3933` when component value property is not matched', () => {
            const value = { value: 999999 };
            expect(Block.computed.backgroundColor.apply(value)).toBe('#3E3933');
        });
    });
});
