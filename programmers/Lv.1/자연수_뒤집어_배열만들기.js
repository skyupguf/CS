// 풀이#1
const makeToReverseArr = (n) => {
    return `${n}`.split('').reverse().map(Number);
}
// 풀이#2
const makeToReverseArr = (n) => {
    return `${n}`.split('').reduce((a, c) => {
        a.unshift(Number(c));
        return a;
    }, []);
}
/*
문제요약
1. 자연수 n을 뒤집어서 배열화
2. ex) 12345 [5, 4, 3, 2, 1]

풀이1
1. 정렬이 아닌 완전히 역순으로 뒤집어야 하므로 reverse 메소드를 활용한다.
2. 숫자는 각 요소를 배열로 나눌 수 없으므로 문자화 이후 배열화하고 reverse 이후 map으로 숫자화

풀이2
1. 시간 복잡도가 실제로 많이 차이 나지 않지만 한번의 순회로 종료하고자 하면 reduce를 활용한다.

시간복잡도
두 풀이 다 O(n) 이지만 풀이2가 한번의 순회로 끝난다.
*/