const createMatrix = (village) => {
    const matrix = [];
    village.forEach((line) => {
        const row = [];
        for (let i = 0; i < line.length; i++) row.push(line[i]);
            matrix.push(row);
        });
    return matrix;
}
  
const gossipProtocol = function (village, row, col) {
    const MOVES = [[-1, 0], [1, 0], [0, 1], [0, -1]]
    const matrix = createMatrix(village);
    const queue = Array(village.length * village[0].length)
    let front = 0;
    let rear = 0;
    const isValid = (row, col) => row >= 0 && row < village.length && col >= 0 && col < village[0].length;
    const isEmpty = (queue) => front === rear;
  
    const enqueue = (queue, position) => {
        queue[rear] = position;
        rear = rear + 1;
    }
    const dequeue = (queue) => {
        let position = queue[front];
        front = front + 1;
        return position;
    }
  
    let cnt = 0;
    enqueue(queue, [row, col]);
    matrix[row][col] = 0;
  
    while(isEmpty(queue) === false) {
        const [row, col] = dequeue(queue);
        cnt = matrix[row][col];
  
        MOVES.forEach((move) => {
            const [rDiff, cDiff] = move;
            const nextRow = row + rDiff;
            const nextCol = col + cDiff;
            if(isValid(nextRow, nextCol) && matrix[nextRow][nextCol] === '1') {
                enqueue(queue, [nextRow, nextCol]);
                matrix[nextRow][nextCol] = matrix[row][col] + 1;
            }
        });
    }
    return cnt;
}