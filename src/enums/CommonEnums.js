/**
 * @class CommonEnums
 */
class CommonEnums {
    constructor () {
        this.ALLOWED_BUTTONS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft']; // key codes
        this.GAME_SIZE = 4; // It must be even number
        this.NEW_ELEMENT_VALUE = 2; // Created random block`s value like 2, 4, 6 etc...
        this.COLORS = {
            2: '#EEE4DA',
            4: '#ECE0C8',
            8: '#F1B077',
            16: '#EA8C54',
            32: '#F57C60',
            64: '#E75939',
            128: '#F3D96A',
            256: '#EDCC62',
            512: '#EDC850',
            1024: '#EDC53F',
            2048: '#EDC22E',
        }
    }
}

export default new CommonEnums();