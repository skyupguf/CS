//  문제요약
//  1. 길이가 동일한 arr1과 arr2의 각 요소를 주어진 정수 n의 길이만큼 이진수로 변환한다.
//  2. 길이가 n인 이진수로 변환한 요소가 길이가 부족하면 0으로 채운다. ex)n = 5, 9(10) = 01001(2)
//  3. 각 이진수에서 0은 ' '로 1은 '#'으로 치환하고 arr1과 arr2를 비교한다. 
//  4. 각 이진수에서 둘다 ' '면 ' ', 하나라도 '#'면 '#'로 변환해서 하나의 배열로 리턴하라.
//  5. arr1 = [9, 20, 28, 18, 11], arr2 = [30, 1, 21, 17, 28], return ["#####","# # #", "### #", "# ##", "#####"]

//  코드
const mergeSubstitutedArr = (n, arr1, arr2) => {
    const result = [];
    for(let i=0; i<n; i++) {
        let e1 = arr1[i].toString(2);
        let e2 = arr2[i].toString(2);
        if(e1.length < n) e1 = '0'.repeat(n - e1.length) + e1;
        if(e2.length < n) e2 = '0'.repeat(n - e2.length) + e2;
        
        let code = '';
        for(let j=0; j<n; j++) {
            code += (e1[j] === '0' && e2[j] === '0') ? ' ' : '#';
        }
        result.push(code);
    }
    return result;
}
/*
    풀이
    1. 두 배열의 모든 요소를 이진수로 변환하기 위해서 메소드 보다 일반 for문으로 루프한다.
    2. 두 배열의 각 요소를 toString(2)로 문자열로 이진수로 변환시킨다.
    3. 두 이진 문자열이 n의 길이보다 짧으면 repeat메소드로 0을 앞쪽부터 누적한다.
    4. 완성된 두 2진수 문자를 이중루프로 비교하면서 ' '과 '#'로 치환하고 새로운 배열에 삽입한다.

    시간복잡도
    배열안의 문자열 요소를 이중 루프 하므로 O(n^2)의 시간복잡도를 가진다.
*/
