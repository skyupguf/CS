// 풀이#1
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

// 풀이#2
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
튜플의 원소를 표현하는 s는 '{', '}', ',', ','도 문자열로 포함
"{{2},{2,1},{2,1,3},{2,1,3,4}}"	
"{{1,2,3},{2,1},{1,2,4,3},{2}}"
=> 모두 동일한 [2, 1, 3, 4]

풀이#1
1. 튜플의 원소순서가 어떻든, 배열의 값은 동일하다.
2. 부분원소 집합 중 가장 많은 빈도 수 대로 배열 순서가 결정된다.
3. filter를 이용해 숫자문자열만 배열화
4. 객체를 하나 생성해 해당 객체에 키, 값으로 해당 키의 수를 생성
5. 값으로 정렬을 수행하고 정렬된 순서대로 키를 배열에 삽입한다.

에러핸들링
1. 위 코드 방식이면 두자리 수 이상도 전부 한자리수로 카운팅 되어 버린다.
2. split을 활용해 배열형태로 만들어서 해결한다.

풀이#2
1. flat을 사용하지 않고 tupple 배열에 포함되지 않은 경우만 이중반복
2. 풀이#1보다 더 빠른 시간 복잡도

보충사항
- 구체적인 시간복잡도 계산
- 정규표현식 학습으로 코드 이해 필요
*/