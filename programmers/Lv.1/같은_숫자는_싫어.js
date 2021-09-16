// 문제요약
// 1. 0~9의 요소들로 이루어진 배열 arr에서 연속으로 중복된 수를 하나만 남기고 리턴

// 풀이
// 1. 주의할 점은 연속된 중복 수이지 그냥 중복 수가 아니다, 즉 [1,1,3,1] 이면 [1,3,1]이 리턴된다.
// 2. 따라서 앞과 뒤 수를 비교하는 방식으로 루프를 해야 하므로 reduce 메소드를 활용한다.
// 3. filter를 활용해 비교할 수도 있다.
const deleteConnectedDuplicateNum = (arr) => {
    return arr.reduce((a, c) => {
        if(a[a.length-1] !== c) a.push(c);
        return a;
    }, []);
    // return arr.filter((e, i) => e !== arr[i+1])
}
// 시간복잡도
// reduce나 filter 모두 O(n)이며 유의미한 성능차이는 없다, 간결하게 사용하려면 filter도 좋다.