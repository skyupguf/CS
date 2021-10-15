//  문제요약
//  1. 0또는 1로 이루어진 2^n x 2^n 크기의 2차원 배열의 행의 개수가 1~1024인 arr을 입력받는다.
//  2. arr을 정사각형 4분할을 하고 각 사각형의 요소가 모두 동일하면 동일한 사각형은 해당요소 하나로 압축한다.
//  3. 압축이 되지 않은 영역은 다시 정사각형 4분할을 하고 위를 반복한다.
//  4. 배열에 최종적으로 남는 0의 개수와 1의 개수를 배열에 담아서 return 한다.
//  5. arr = [[1,1,0,0],[1,0,0,0],[1,0,0,1],[1,1,1,1]], return [4,9]

//  코드#1
const countCompressedArr = (arr) => {
    const count = {0: 0, 1: 0};
    
    const countNum = (arr, l) => new Set(arr.flat()).size === 1
        ? count[arr[0][0]] += 1 : compressArr(arr, l);

    const compressArr = (arr, l) => {
        const a = arr.splice(0, l/2), b = a.map(e => e.splice(l/2));
        const c = arr, d = c.map(e => e.splice(l/2));
        countNum(a, l/2), countNum(b, l/2);
        countNum(c, l/2), countNum(d, l/2);
    }
    countNum(arr, arr.length);
    return Object.values(count);
}
/*
    풀이#1
    1. 0과 1을 카운트하기 위한 객체를 선언한다.
    2. 압축을 실행하는 방법의 순서가 중요하다, 압축할 대상의 재귀호출을 하기 전에 우선 전체 배열 한 요소 인지 체크한다.
    3. 전체배열을 flat으로 펼치고 new Set으로 중복제거후 size로 객체크기가 1인 경우를 체크한다.
    4. size가 1이면 모든 요소가 동일하기 때문에 arr에서 요소 하나를 꺼내서 선언한 카운트 객체의 키에 1을 누적한다.
    5. size가 1이 아닐 경우 현재 배열을 압축하기 위해 현재 행렬배열과 전체 길이를 인자로 하는 함수를 생성하고 호출한다.
    6. 위 내용까지 하나의 배열을 카운트하고 아닐 경우 압축함수를 호출해야하기 때문에 카운트 모듈함수로 분리한다.
    7. 이제 압축할 함수를 선언하고 변수 4개에 각각 4등분한 구간 배열들을 할당한다.
    8. 각 구간 할당된 배열을 다시 카운트 모듈함수를 호출하는데 이 때, 행과 열의 길이가 절반으로 줄었기 때문에 l/2를 같이 인자로 전달한다.
    9. arr의 size가 1이 되거나 모든 요소가 동일해질 때 까지 재귀호출을 반복 수행하고 객체에 카운트가 누적된다.
    10. 완성된 count객체의 값만 배열화 하여 리턴한다.

    시간복잡도#1
    
*/

//  코드#2
// const countCompressedArr = (arr) => {
//     const count = {0: 0, 1: 0}

//     const isValid = (arr, l, i) => {
//         return l === i ? 'a' : new Set(arr[i]).size == 1 &&
//         [...new Set(arr[i])][0] == arr[0][0] ? isValid(arr, l, i + 1): false
//     }

//     const makePart = (arr, l) => [[0, 0], [0, l], [l, 0], [l, l]].map((v) => 
//         new Array(l).fill('b').map((_, i) => arr[v[0] + i].slice(v[1], v[1] + l))
//     );
    
//     const execute = (arr, l) => isValid(arr, l, 0) ? (count[arr[0][0]] += 1) 
//         : makePart(arr, l/2).forEach((particle) => execute(particle, l/2)
//     );
    
//     execute(arr, arr.length)
//     return Object.values(count);
// }
