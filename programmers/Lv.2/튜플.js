//  문제요약
//  1. s는 5~1,000,000 의 길이를 가지고 있으며, 문자열로 구성된 튜플이다.
//  2. 튜플이란, 순서나 구성이 다르면 중복된 원소가 존재할 수 있는 '{','}', ',', '자연수' 로 이뤄져 있다.
//  3. s는 다음과 같은 튜플 형태이다. s = "{{2},{2,1},{2,1,3},{2,1,3,4}}"
//  4. 튜플의 원소는 1~100,000사이이며 튜플의 원소를 나타내는 배열의 길이는 1~500일 때, 튜플의 원소를 배열에 담아 리턴하라.
//  5. s = "{{2},{2,1},{2,1,3},{2,1,3,4}}", return [2, 1, 3, 4]
//  6. s = "{{1,2,3},{2,1},{1,2,4,3},{2}}", return [2, 1, 3, 4]
//  7. s = "{{123}}", return [123]

//  코드#1
function solution(s) {
    const obj = {};
    s.slice(2, s.length-2).split('},{')
        .map(el => el.split(',')).flat()
        .forEach(el => {
            if(!obj[el]) obj[el] = 1;
            else obj[el] = obj[el] + 1;
        });
    return Object.entries(obj)
        .sort((a, b) => b[1] - a[1]).map(el => Number(el[0]));
}
/*
    풀이#1
    1. 튜플의 원소순서가 어떻든, 배열의 값은 동일하다.
    2. 부분원소 집합 중 가장 많은 빈도 수 대로 배열 순서가 결정된다.
    3. filter를 이용해 숫자문자열만 배열화
    4. 객체를 하나 생성해 해당 객체에 키, 값으로 해당 키의 수를 생성
    5. 값으로 정렬을 수행하고 정렬된 순서대로 키를 배열에 삽입한다.

    에러핸들링
    1. 위 코드 방식이면 두자리 수 이상도 전부 한자리수로 카운팅 되어 버린다.
    2. split을 활용해 배열형태로 만들어서 해결한다.

    시간복잡도#1
    리턴되는 값을 entries로 순회하면서 map으로 상수화 시키므로 최대 O(N^2)
*/

//  코드#2
const solution = s => getTupple(changeForm(s));

const changeForm = s => {    
    return s.slice(2, s.length-2).split('},{')
        .map(el => el.split(',').map(el => parseInt(el)))
        .sort((a, b) => a.length - b.length);
}

const getTupple = arr => {
    const tupple = [];
    arr.forEach(el => el.forEach(el => {
        if(!tupple.includes(el)) tupple.push(el);
    }));
    return tupple;
}
/*
    풀이#2
    1. flat을 사용하지 않고 tupple 배열에 포함되지 않은 경우만 이중반복
    2. 풀이#1보다 더 빠른 시간 복잡도

    시간복잡도#2
    튜플의 값을 순회하면서 배열에 포함되어 있는지 여부를 includes로 판단 O(N^2)
*/