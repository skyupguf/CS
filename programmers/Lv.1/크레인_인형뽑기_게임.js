//  문제요약
//  1. 2차원 배열 board의 길이는 "5 x 5" 이상 "30 x 30" 이하이다.
//  2. board의 요소배열의 각 요소들은 0~100 이며, 0은 빈 칸을 의미한다.
//  3. moves배열의 길이는 1~1000이며 요소들은 1~board.length 이다.
//  4. moves의 요소는 board 배열의 board[i][moves요소]에 해당한다, 즉 0의 존재 여부에 따라 board[i]가 바뀐다.
//  5. 뽑은 요소를 임의의 배열에 담을 때 뽑은 요소가 연속으로 중복되면 사라지며 각 요소를 count한다.
//  6. moves = [1,5,3,5,1,2,1,4]
//     board = [[0,0,0,0,0],     =>    board = [[0,0,0,0,0],
//              [0,0,1,0,3],                    [0,0,0,0,0],
//              [0,2,5,0,1],                    [0,0,5,0,0],
//              [4,2,4,4,2],                    [0,2,4,0,2],
//              [3,5,1,3,1]]                    [0,5,1,3,1]]
//  7. 1 => [4], 5 => [4, 3], 3 => [4, 3, 1], 5 => [4, 3], 1 => [4], 2 => [4, 2], 1 => [4, 2], 4 => [4, 2, 4] return 4

//  코드
const reformMatrix = (matrix) => {
    return matrix.reduce((a, row) => row.map((e, i) => {
        if(row[i]) return [...(a[i]||[]), row[i]];
    }), []);
}

const countOverlapEl = (board, moves) => {
    board = reformMatrix(board);
    let pick, count = 0, stack = [];

    moves.forEach(e => {
        pick = board[e-1].shift();
        if(pick) { 
            if(pick === stack[stack.length-1]) {
                stack.pop();
                count += 2;
            } else stack.push(pick);
        }
    });
    return count;
}
/*
    풀이
    1. board의 길이가 30까지면 이중루프로 열행 탐색 후, 0이 아닐 경우 처리하고 break로 탈출해도 시간복잡도는 문제없다.
    2. 하지만, 이차원 배열을 매번 재탐색해야 하므로 배열의 길이가 길어질 수록 연산이 급증한다.
    3. 따라서, 2차원 배열의 행렬을 뒤집어서 moves요소에서 0을 제외한 가장 앞의 인덱스를 추출하는 방식을 사용한다.
    4. board.reduce를 활용해 행렬을 뒤집을 acc를 빈배열로 설정하고 행을 열로 바꾸기 위해 map메소드로 각 row를 순회한다.
    5. 이 때, row[i]가 0일 경우 빈칸과 같기 때문에 조건문을 통해 0인 경우 배열에 삽입되지 않게 설정한다.
    6. stack 배열을 선언하고 연속중복이 될 경우 누적을 하기 위해 pick과 count 변수를 선언한다.
    7. moves 배열을 순회하면서 e-1의 인덱스에 해당하는 board 요소를 shift로 추출하고 pick 변수에 할당한다.
    8. stack의 마지막 요소와 비교 후 동일하면 stack.pop()으로 요소를 제거하고 count+2를 누적, 아닐 경우 stack.push(pick)
    9. 순회를 종료하고 count를 리턴한다.

    에러핸들링
    1. 하나의 배열에서 계속 수를 추출하면 빈 배열일 경우 undefined가 pick변수에 할당될 수 있다.
    2. 따라서, undefined일 경우를 stack 배열에 접근하지 못하도록 조건을 추가설정 한다.

    시간복잡도
    행렬 재배치의 이중루프로 O(N^2)이 소요된다.
*/
