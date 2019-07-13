class MatrixService {
    /**
     * @param {object} [config]
     * @param {Array<Array<number>>} [config.matrix]
     * @param {number} [config.minimumValue]
     * @returns {MatrixService}
     */
    constructor ({ matrix = [[]], minimumValue = 2 } = {}) {
        this.minimumValue = minimumValue;
        this.matrix = MatrixService.clone(matrix);
        this.ROTATIONS = { up: 3, right: 2, down: 1, left: 0 };

        return this;
    }

    /**
     * @param {number} size
     * @returns {Array<Array<number>>}
     * @return {MatrixService}
     */
    create (size) {
        this.matrix = [];

        for (let i = 0; i < size; i++) {
            this.matrix[i] = [];

            for (let j = 0; j < size; j++) {
                this.matrix[i][j] = 0;
            }
        }

        return this;
    }

    /**
     * @params {number} count
     * @returns {Array<Array<number>>}
     */
    addRandomValue (count) {
        if (count === 0 || this.isMatrixFull()) {
            return this.matrix;
        }

        const size = this.matrix.length;

        let i = Math.floor(Math.random() * size);
        let j = Math.floor(Math.random() * size);

        if (this.matrix[i][j] === 0) {
            this.matrix[i][j] = this.minimumValue;

            return this.addRandomValue(count - 1);
        }

        return this.addRandomValue(count);
    }

    /**
     * @returns {boolean}
     */
    isMatrixFull () {
        return this.matrix.filter(row => row.filter(column => column === 0).includes(false)).length !== 0;
    }

    /**
     * Returns merged matrix and merged status, If matrix doesnt move, status will return false
     * @param {string} direction
     * @returns {boolean}
     */
    merge (direction) {
        this.rotate(this.ROTATIONS[direction]);
        const status = this.shiftLeft();
        this.rotate(4 - this.ROTATIONS[direction]);

        return { matrix: this.matrix, status };
    }

    /**
     * Rotates matrix 90deg clockwise by using given times
     * @param {number} times
     * @returns {Array<Array<number>>}
     */
    rotate (times) {
        var count = 0;

        while (count < times) {
            this.matrix = this.matrix.reverse();

            for (let i = 0; i < this.matrix.length; i++) {
                for (let j = 0; j < i; j++) {
                    let temp = this.matrix[i][j];

                    this.matrix[i][j] = this.matrix[j][i];
                    this.matrix[j][i] = temp;
                }
            }

            count++;
        }
    }

    /**
     * @return {boolean}
     */
    shiftLeft () {
        var moved = false;
        this.matrix = this.addProcessedProperty();

        for (let rowIndex = 0; rowIndex < this.matrix.length; rowIndex++) {
            let column = this.matrix[rowIndex];

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
                }
            }
        }

        this.matrix = this.removeProcessedProperty();

        return moved;
    }

    /**
     * @return {Array<Array<{value: number, processed: boolean}>>}
     */
    addProcessedProperty () {
        return this.matrix.map(row => row.map(column => { return { value: column, processed: false } }));
    }

    /**
     * @return {Array<Array<number>>}
     */
    removeProcessedProperty () {
        return this.matrix.map(row => row.map(column => column.value));
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