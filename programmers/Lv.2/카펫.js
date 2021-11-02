//  문제요약
//  1. brown은 8 이상 5,000 이하인 자연수, yellow는 1 이상 2,000,000 이하인 자연수 이다.
//  2. 중앙에 사각형이 yellow를 감싸는 테두리 사각형은 brown이다.
//  3. 각각의 사각형의 개수는 알지만 크기를 알지 못 하지만 가로 길이가 세로이상이다.
//  4. 가로, 세로 크기를 순서대로 배열에 담아 리턴하는 함수를 작성하라.
//  5. brown = 10, yellow = 2, return [4, 3] / brown = 8, yellow = 1, return [3, 3] / brown = 24, yellow = 24, return [8, 6]

//  코드
const calWidthAndHeight = (brown, yellow) => {
    let w, h, total = brown + yellow;

    for(let i=3; i<=Math.sqrt(total); i++) {
        if(!(total%i)) {
            w = total/i, h = i;
            if((w-2)*(h-2) === yellow) break;
        }
    }
    return [w, h];
}
/*
    풀이
    1. 전체 사각형의 크기는 brown + yellow 다 10 + 2면 12고 yellow보다 작아지기 전까지 사각형을 탐색 해서 가로, 세로 길이를 얻어야 한다.
    2. 사각형 전체 수 total = brown + yellow 변수에 할당한다, for문으로 yellow+1부터 total까지 루프한다.
    3. total%i 가 가능한 경우여야 사각형이 된다. 이 때, i로 나눈 수 중 큰 수가 w가 되고 작은 수가 h가 된다.
    4. total까지 모두 루프할 필요 없이 total의 제곱근까지 돌고 나누면 반대편 값이 나오므로 i <= Math.sqrt(total) 조건을 준다.
    5. 사각형의 전체 가로와 세로 길이를 찾는 인덱스는 yellow가 최소 1이기 때문에 1을 감싸기 위한 최소 w는 3이므로 3부터 시작한다.
    6. 이제 w와 h의 길이를 정할 알고리즘이 필요하다.
    7. yellow가 total이 되려면 w2 h1 w가 +2 h가 +2  w4 h3 = 12
    8. total 9 yellow 1  => w1 h1 +2 w3 h3 = 9
    9. total 48 yellow 24 => 2는 최소 3이기 때문에 못 옴 w8 h3 X, w6 h4 +2 w8 h6 = 48
    10. 테스트 케이스의 경우 yellow에서 total의 개수가 되었을 경우 w와 h를 각각 +2를 해야 한다.
    11. total%i가 0이면 w는 total/i 로 큰 수를 h = i 로 작은 수를 할당하고 w와 h에 각각 -2를 하고 곱한 사각형 크기가 yellow면 break

    시간복잡도
    O(sqrt(N))
*/
