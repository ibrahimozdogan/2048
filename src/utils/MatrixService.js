class MatrixService {
    /**
     * @param {object} [config]
     * @param {Array<Array<number>>} [config.matrix]
     * @param {number} [config.newElementValue]
     * @returns {MatrixService}
     */
    constructor ({ matrix = [[]], newElementValue = 2 } = {}) {
        this.newElementValue = newElementValue;
        this._matrix = MatrixService.clone(matrix);
        this.ROTATIONS = { up: 3, right: 2, down: 1, left: 0 };

        return this;
    }

    /**
     * @returns {Array<Array<number>>}
     */
    get () {
        return this._matrix;
    }

    /**
     * @param value
     * @return {boolean}
     */
    has (value) {
        return this._matrix.filter(row => row.map(column => column === value).includes(true)).length !== 0
    }

    /**
     * @param {number} size
     * @returns {MatrixService}
     */
    create (size) {
        this._matrix = [];

        for (let i = 0; i < size; i++) {
            this._matrix[i] = [];

            for (let j = 0; j < size; j++) {
                this._matrix[i][j] = 0;
            }
        }

        return this;
    }

    /**
     * @params {number} count
     * @returns {MatrixService}
     */
    addRandomValue (count) {
        if (count === 0 || this.isMatrixFull()) {
            return this;
        }

        const size = this._matrix.length;

        let i = Math.floor(Math.random() * size);
        let j = Math.floor(Math.random() * size);

        if (this._matrix[i][j] === 0) {
            this._matrix[i][j] = this.newElementValue;

            return this.addRandomValue(count - 1);
        }

        return this.addRandomValue(count);
    }

    /**
     * @returns {boolean}
     */
    isMatrixFull () {
        return !this.has(0);
    }

    /**
     * Returns merged matrix and merged status, If matrix doesnt move, status will return false
     * @param {string} direction
     * @returns {{ matrix: Array<Array<number>>, status: boolean }}
     */
    merge (direction) {
        this.rotate(this.ROTATIONS[direction]);
        const { status, accumulatedValue } = this.shiftLeft();
        this.rotate(4 - this.ROTATIONS[direction]);

        return { matrix: this._matrix, status, accumulatedValue };
    }

    /**
     * Rotates matrix 90deg clockwise by using given times
     * @param {number} times
     */
    rotate (times) {
        let count = 0;

        while (count < times) {
            this._matrix = this._matrix.reverse();

            for (let i = 0; i < this._matrix.length; i++) {
                for (let j = 0; j < i; j++) {
                    let temp = this._matrix[i][j];

                    this._matrix[i][j] = this._matrix[j][i];
                    this._matrix[j][i] = temp;
                }
            }

            count++;
        }
    }

    /**
     * @return {{accumulatedValue: number, status: boolean}}
     */
    shiftLeft () {
        let moved = false;
        let accumulatedValue = 0;
        this._matrix = this.addProcessedProperty();

        for (let rowIndex = 0; rowIndex < this._matrix.length; rowIndex++) {
            let column = this._matrix[rowIndex];

            for (let columnIndex = 0; columnIndex < column.length - 1; columnIndex++) {
                let current = column[columnIndex];
                let next = column[columnIndex + 1];

                if (next.value === 0) {
                    continue;
                }

                if (current.value === 0) {
                    current.value = next.value;
                    next.value = 0;
                    columnIndex = -1;
                    moved = true;

                    continue;
                }

                if (current.value === next.value && !next.processed && !current.processed) {
                    current.value += next.value;
                    next.processed = true;
                    current.processed = true;
                    next.value = 0;
                    columnIndex = -1;
                    moved = true;
                    accumulatedValue += current.value;
                }
            }
        }

        this._matrix = this.removeProcessedProperty();

        return { status: moved, accumulatedValue };
    }

    /**
     * @return {Array<Array<{value: number, processed: boolean}>>}
     */
    addProcessedProperty () {
        return this._matrix.map(row => row.map(column => { return { value: column, processed: false } }));
    }

    /**
     * @return {Array<Array<number>>}
     */
    removeProcessedProperty () {
        return this._matrix.map(row => row.map(column => column.value));
    }

    /**
     * @param {object|Array} value
     * @returns {object|Array}
     */
    static clone (value) {
        return JSON.parse(JSON.stringify(value));
    }
}

export default MatrixService;
