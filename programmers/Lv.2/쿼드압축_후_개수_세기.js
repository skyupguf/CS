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
    각 구간들 재귀호출 하기전 전체 배열의 중복 요소체크를 하기 때문에 O(2N)이 소요된다.
    이후 네 개의 구간을 splice로 나누는데 O(N) 이 소요되고 각 구간들을 재귀호출하면서 4logN번 연산한다.

    리팩토링
    flat()으로 중복배열을 펼치는 과정에서 행렬의 크기가 클 수록 연산이 크게 증가한다.
*/

//  코드#2
const countCompressedArr = (arr) => {
    const count = {0: 0, 1: 0};
    
    const checkEl = (arr, l, i) => {
        const check = [...new Set(arr[i])];
        return l === i ? true : check.length === 1 && check[0] === arr[0][0]
            ? checkEl(arr, l, i+1) : false;
    }
    const compressArr = (arr, l) => {
        const a = arr.splice(0, l), b = a.map(e => e.splice(l));
        const c = arr, d = c.map(e => e.splice(l));
        return [a, b, c, d];
    }
    const countZip = (arr, l) => checkEl(arr, l, 0) ? count[arr[0][0]] += 1
        : compressArr(arr, l/2).forEach(e => countZip(e, l/2));

    countZip(arr, arr.length);
    return Object.values(count);
}
/*
    풀이#2
    1. flat으로 전체배열을 펼쳐서 중복체크를 하면 중복검사를 할 때 마다 호출되는 행렬을 끝까지 루프해야 된다.
    2. 각 행을 하나 씩 체크해 만일 끝까지 모든 요소가 동일하면 count가 되고 아니면 도중에 중단되어야 한다.
    3. 함수를 기능별로 재 구분한다, 요소체크함수 = checkEl, 압축함수 = compressArr, 카운터함수 = countZip으로 분리한다.
    4. countZip이 중복체크 함수를 호출하고 true면 count를 하고 false면 압축함수를 호출하는 사이클 로직으로 만든다.
    5. 중복체크함수 checkEl은 flat대신 각 행을 순회하면서 요소가 모두 동일하거나 각 행의 동일값이 가장 첫 arr[0][0]와 같은지 비교한다.
    6. 모든 행을 체크하기 위해 인덱스를 늘려가며 함수를 재호출하고 인덱스가 배열의 길이와 같아지는 순간 압축이 가능하므로 true를 리턴한다.
    7. 이렇게 되면 요소가 동일하지 않을 때 루프를 끝까지 돌지않고 탈출해 압축함수로 바로 넘어갈 수 있다.

    시간복잡도
    기존 코드 보다 big(O)는 달라지지 않지만 실제 행렬을 모두 펼치지 않고 루프를 도중에 중단 하므로 더 효율적이다.
*/
