//  문제요약
//  1. 길이가 1 ~ 100,000인 numbers 배열안의 원소 0 ~ 1,000 사이의 수다.
//  2. 모든 원소들을 붙여서 만들 수 있는 수 중 가장 큰 수를 리턴하라.
//  3. numbers = [6, 10, 2], return "6210" / numbers = [3, 30, 34, 5, 9], return "9534330"

//  코드
const combineLargestNum = (numbers) => {
    const result = numbers.sort((a, b) => `${b}${a}` - `${a}${b}`).join('');
    return Number(result[0]) ? result : '0';
}
    /*
    풀이
    1. 문자열로 붙였을 경우의 크기를 비교해야 한다.
    2. sort메소드를 활용해 파라미터 a와 b를 template literal로 `ba` - `ab`로 뒷 요소가 더 클 경우 내림차순 정렬한다.
    3. 완성된 배열을 문자열로 리턴해야하기 때문에 join('')으로 문자열을 만들어서 리턴한다.

    에러핸들링
    1. numbers 배열에 모든 원소가 0일 경우 '0000' 이 아닌 '0'으로 리턴하도록 테스트 케이스가 되어 있다.
    2. 따라서 정렬을 완료하고 가장 앞의 요소가 0일 경우를 확인하고 리턴한다.

    시간복잡도
    O(NlogN)
*/