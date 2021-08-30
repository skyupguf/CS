// 문제요약
// 1. 2차원 배열 board의 길이는 "5 x 5" 이상 "30 x 30" 이하이다.
// 2. board의 요소배열의 각 요소들은 0~100 이며, 0은 빈 칸을 의미한다.
// 3. moves배열의 길이는 1~1000이며 요소들은 1~board.length 이다.
// 4. moves의 요소는 각각 board의 요소배열 인덱스를 가리키며 해당 배열의 마지막 요소를 뽑는다.
// 5. 뽑은 요소를 임의의 바구니에 담을 때 뽑은 요소가 연속으로 중복되면 사라지며 각 요소를 count한다.
// 6. board = [[0,0,0,0,0],[0,0,1,0,3],[0,2,5,0,1],[4,2,4,4,2],[3,5,1,3,1]], moves = [1,5,3,5,1,2,1,4]
// 7. 1 => [], 5 => [1], 3 => [1, 1], 5 => [3], 1 => [3], 2 => [3, 3], 1 => [], 4 => [2] return 4

//  코드
const countOverlapEl = (board, moves) => {
    let count = 0;
    const bucket = [];
    moves.forEach(e => {
        let pick = board[e-1].pop();
        if(bucket[bucket.length-1] === pick) {
            bucket.pop();
            count += 2;
        } else bucket.push(pick);
    });
    return count;
}
/*
풀이
1. 바구니 배열에서 2개가 연속 중복되어야 제거되고 count+2가 되는데, 무조건 1개씩 삽입된다.
2. 따라서, 애니팡같이 연쇄제거에 대한 경우의 수를 따질 필요가 없다.
3. moves의 요소에 맞춰 board 2중배열에서 마지막 요소를 하나씩 pop하고 해당 요소를 bucket에 push한다.
4. bucket에 push될 때 앞의 요소와 비교하고 동일하면 앞 요소를 배열에서 pop, 그리고 count+2로 누적한다.
*/
