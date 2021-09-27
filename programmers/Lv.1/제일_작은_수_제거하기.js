//  문제요약
//  1. 중복되지 않은 정수배열에서 제일 작은 요소값을 제거하고 리턴한다.
//  2. 배열의 길이는 1이며, 만일 빈배열이 될 경우 -1을 삽입해 리턴한다.

//  코드
const deleteMinNumber = (arr) => {
    const min = Math.min(...arr);
    return arr.length === 1 ? [-1] : arr.filter(el => el !== min);
}
/*
    풀이
    1. 배열에서 최소값을 찾고 분기를 이용해 빈 배열이면 [-1]을 아니면 최소값이 제거된 배열 리턴한다.

    시간복잡도
    spread syntax와 filter 메소드를 활용하여 각각 배열을 순회하고 복사하기 때문에 O(n)의 시간복잡도를 가진다.
*/
