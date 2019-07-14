class Swipe {
    constructor () {
        this.xDown = null;
        this.yDown = null;
        this.callback = null;
    }

    /**
     * @param {function} callback
     */
    listen (callback) {
        this.callback = callback;

        document.addEventListener('touchstart', this.handleTouchStart.bind(this), false);
        document.addEventListener('touchmove', this.handleTouchMove.bind(this), false);
    }

    /**
     * @param {object} event
     */
    handleTouchStart (event) {
        this.xDown = event.touches[0].clientX;
        this.yDown = event.touches[0].clientY;
    }

    /**
     * @param {object} event
     */
    handleTouchMove (event) {
        if (!this.xDown || !this.yDown) {
            return;
        }

        let xUp = event.touches[0].clientX;
        let yUp = event.touches[0].clientY;

        let xAxisDifference = this.xDown - xUp;
        let yAxisDifference = this.yDown - yUp;

        if (Math.abs(xAxisDifference) > Math.abs(yAxisDifference)) {
            if (xAxisDifference < 0) {
                this.callback('right');
            } else {
                this.callback('left');
            }
        } else {
            if (yAxisDifference < 0) {
                this.callback('down');
            } else {
                this.callback('up')
            }
        }

        this.xDown = null;
        this.yDown = null;
    }
}

export default Swipe;