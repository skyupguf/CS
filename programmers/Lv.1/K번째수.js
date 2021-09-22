// 문제요약
// 1. 길이와 원소가 1~100인 배열 array가 존재하고 i, j, k의 자연수배열이 담긴 이차원 배열 commands가 있다.
// 2. i부터 j번째 까지 array를 복사하고 오름차순 정렬 후 그 중 k번째의 수를 찾아 새 배열에 담아 반환하라.
// 3. array = [1, 5, 2, 6, 3, 7, 4], commands = [[2, 5, 3], [4, 4, 1], [1, 7, 3]] return [5, 6, 3]

//  코드
const findElementK = (array, commands) => {
    const result = [];
    commands.forEach(e => {
        let copied = array.slice(e[0]-1, e[1]).sort((a, b) => a - b);
        result.push(copied[e[2]-1]);
    });
    return result;
}
/*
    풀이
    1. commands를 순회하면서 array의 인덱스 i-1 부터 j까지 복사하고 복사한 배열을 오름차순 정렬한다.
    2. 정렬된 배열에서 K-1을 result배열을 선언해 삽입하고 순회를 종료하고 result를 리턴한다.

    시간복잡도
    같은 배열을 이중루프 하지않고 배열 전체를 복사하지도 않기 때문에 O(N^2)이 될 수 없다. 
    시간복잡도는 O(N)
*/