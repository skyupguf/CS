//  문제요약
//  1. Longest increasing subsequence는 수열의 요소들이 오름차순 정렬되는 가장 긴 부분수열을 찾는 문제이다.
//  2. 입력된 arr을 정렬을 사용하지 않고 오름차순으로 만들 수 있는 최장 증가 부분수열을 리턴하라.
//  3. 입력 : arr = [10, 22, 9, 33, 21, 50, 41, 60, 80], 출력 : [10, 22, 33, 50, 60, 80]
//  4. 입력 : arr = [1, 2, 6, 8, 14, 5, 9, 11, 13], 출력 : [1, 2, 6, 8, 9, 11, 13]
//  5. 입력 : arr = [3, 10, 2, 1, 20], 출력 : [30, 10, 20]
//  6. 입력 : arr = [3, 2], 출력: [3] or [2]
//  7. 입력 : arr = [50, 3, 10, 7, 40, 80], 출력: [3, 10, 40, 80]

//  코드
const getLIS = (arr) => {
    if (arr.length === 1) return arr;

    let LIS = []
    let a = [arr[0]];
    let copy = arr.slice(1);

    while (copy.length) {
        if (a[a.length-1] <= copy[0]) a.push(copy.shift());
        else {
            let temp = copy.slice();
            let b = a.slice(0, -1), check = b.pop();

            if (check) temp.unshift(check);
            b = [...b, ...getLIS(temp)], copy.shift();
            if (LIS.length < b.length) LIS = b;
        }
        if (LIS.length <= a.length) LIS = a;
    }
    return LIS;
}
/*
    풀이
    1. 만들 수 있는 오름차순 부분수열의 모든 경우의 수를 구해 비교해야 한다.
        1-1. 부분수열의 경우가 분할되는 분기지점은 현재 탐색중인 값이 다음 인덱스의 값보다 클 경우이다.
        1-2. 테스트 케이스에서 [50, 3, 10, 7, 40, 80]의 경우 [50, 80]으로 탐색하지만 최장 수열을 만족하지 못한다.
        1-3. 대신 50을 제외하고 3부터 탐색하면 [3, 10, 40, 80]을 도출할 수 있다.
        1-4. 여기서 또 10과 7에서 3뒤에 7이 올 경우를 또 상정해야 하므로 오름차순이 끊기는 지점이 분기지점이다.
        1-5. 분기점에서 재귀호출을 이용해 완성된 LIS의 길이를 비교해 갱신할 수 있어야 한다.
            [50]               [80]
                [3, 10]    [40, 80]
                        [7, 40, 80]

    2. 배열을 재귀호출의 인자로 전달해야 하므로 중복되지 않게 복사를 활용해야 한다.
        2-1. 우선 입력되는 arr의 길이가 1이하의 경우 arr를 리턴시키는 탈출조건을 만든다.
        2-2. 모든 완성된 부분수열의 대소비교를 통해 갱신하기 위한 LIS = []를 선언한다.
        2-3. 오름차순으로 전체 탐색할 배열과 재귀호출될 배열로 나눠야 하므로 a = [arr[0]]를 선언한다.
        2-4. 원본배열을 유지해야 하므로 copy변수에 arr.slice(1)으로 복사한다.

    3. 루프를 통해 부분수열을 만들면서 분기점에서 재귀호출을 해야한다.
        3-1. 복사된 배열 copy가 빈 배열이 될 때 까지 while문으로 루프한다.
        3-2. a의 마지막 요소가 copy[0]보다 작으면 a에 copy[0]를 추출해 삽입해 나간다.
        3-3. a의 마지막 요소보다 copy[0]가 크면 현재 copy배열을 temp에 복사한다.
        3-4. a도 b변수에 마지막 요소를 제외하고 복사한 뒤 b의 마지막 값을 temp앞에 unshift한다.
        3-5. 그리고 b뒤에 getLIS(temp)로 재귀호출로 리턴된 배열을 병합시킨다.
        3-6. copy[0]는 재귀호출에서 탐색하므로 a에서 다음 값을 탐색하도록 copy.shift()를 해준다.
        3-7. 이제 부분수열 b와 LIS를 비교해 더 긴 경우 갱신해준다.
        3-8. a도 마찬가지로 LIS와 비교해 갱신한다.
    
    4. copy가 빈배열이 되면 루프가 종료되고 갱신된 LIS를 리턴한다.
    
    시간복잡도
    오름차순이 종료되는 부분부터 재귀호출 되어 다시 루프를 하므로 최악의 경우 O(n^2)이 소요된다.
*/

//  리팩토링
const getLIS = (arr) => {
    let LIS = [];
    const sub = [[arr[0]]];

    for (let end=1; end<arr.length; end++) {
        let fixed = arr[end];
        
        for (let now=1; now<=end; now++) {
            
            if (LIS.length > 0 && LIS[LIS.length-1] < fixed) {
                LIS.push(fixed), sub[end] = LIS;
                break;
            }
            if (sub[now][sub.length-1] < fixed) {
                sub[now][sub.length-1] === 0 ? 
                sub[now][sub.length-1] = fixed : sub.push(fixed);
            }
        }
        if (LIS.length < sub.length) LIS = sub;
    }
    return LIS;
}
/*
    풀이
    1. 오름차순이 종료된 위치에서 배열을 복사해 재탐색을 할 경우 루프연산을 남용하게 된다.
    
    2. 각 인덱스의 값으로 만들 수 있는 부분수열을 배열로 만들고 LIS와 비교해 갱신한다.
        2-1. 우선 최종 부분 수열을 할당할 LIS = []를 전역해 선언해 놓는다.
        2-2. 첫 for문으로 고정해 비교할 값을 할당할 fixed = arr[i]와 부분수열을 저장할 sub = []를 선언한다.
    
    3. 이중루프를 현재 fixed의 앞의 인덱스까지만 탐색하고 부분수열을 완성해 sub에 할당한다.
        3-1. 

*/
