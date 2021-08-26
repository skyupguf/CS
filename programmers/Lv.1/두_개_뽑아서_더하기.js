// 문제요약
// 1. 길이가 2~10, 모든 수가 0~100 인 numbers배열이 있다.
// 2. 여기서 두 개의 수를 뽑아 더해서 만들 수 있는 모든 수를 배열에 담아 오름차순으로 반환하라.
// 3. numbers = [2,1,3,4,1]  return = [2,3,4,5,6,7]

//  코드
const plusTwoIntOfArr = (numbers) => {
    // const result = [];
    // numbers.forEach((a, ai) => numbers.forEach((b, bi) => {
    //     if(ai !== bi && !result.includes(a + b)) result.push(a + b);
    // }));
    // return result.sort((a, b) => a - b);
    const result = [];
    numbers.forEach((a, ai) => numbers.forEach((b, bi) => {
        if(ai !== bi) result.push(a + b);
    }));
    return [...new Set(result)].sort((a, b) => a - b);
}
/*
    풀이
    1. 하나의 요소를 선택해 다른요소와 하나 씩 더해 가면서 includes로 바로 중복을 찾는 이중루프
    2. 일단 모든 요소를 찾고 Set으로 객체로 복사해 중복을 제거하고 배열에 복사
    3. 이중루프안에서 includes로 배열 요소를 확인하는 것 보다 한번에 객체화 시키는 2번이 빠를것으로 예상

    시간복잡도
    1번의 경우 includes가 O(N)이지만, numbers가 아닌 result배열을 순회하기 때문 O(N^3)이 되진 않는다.
    2번은 모든 중복요소를 이중루프 이후 한번에 객체화로 제거하고 정렬하므로 O(N^2)에 더 가깝다.
*/