// 문제요약
// 1. lottos는 길이가 6인 정수배열로 0~45의 요소들로 이루어져 있으며, 정렬되어있지 않다.
// 2. 0은 알아 볼 수 없는 숫자이며, 0을 제외하고 나머지 숫자들은 중복되지 않는다.
// 3. win_nums는 길이 6인 정수 배열로 1~45의 요소들로 이루어져 있으며, 중복과 정렬이 없다.
// 4. lottos와 win_nums의 동일한 요소의 수로 랭크를 정할 때 0의 숫자 변경으로 최대, 최소순위 [max, min]를 구하라.
// 5. 1위 6개, 2위 5개, 3위 4개, 4위 3개, 5위 2개, 6위 1개이하
// 6. lottos = [44, 1, 0, 0, 31, 25], win_nums = [31, 10, 45, 1, 6, 19], return [3, 5]

// 코드
const predictRank = (lottos, win_nums) => {
    const rank = {6: 1, 5: 2, 4: 3, 3: 4, 2: 5, 1: 6, 0: 6};
    const parts = lottos.filter(e => e !== 0);
    let min = 0, max = lottos.length - parts.length;
    parts.forEach(a => {
        for(let b of win_nums) if(a === b) {
            min++, max++;
            break;
        }
    });
    return [rank[`${max}`], rank[`${min}`]];
}
/*
    풀이
    1. lottos와 win_nums의 요소들이 동일한 경우를 카운트하고 0의 개수를 추가하면 최대, 아니면 최소가 된다.
    2. 양 배열은 정렬한다고 해도 동일하게 정렬될 수 없으므로 lottos로 win_nums를 확인하는 이중루프를 쓴다.
    3. 우선 rank를 반환할 객체를 테이블로 만들고 lottos배열에서 0을 제외하고 복사한다.
    4. max변수에 0의 개수를 할당하고 min에는 0을 할당한다.
    5. 복사된 배열을 루프하면서 이중루프로 win_nums의 요소와 비교하여 동일할 경우 max, min에 누적후 break
    6. rank객체에서 max와 min에 해당하는 순위 값을 매핑해 리턴한다.

    시간복잡도
    복사된 배열 parts와 win_nums를 이중루프로 순회하기 때문에 O(N^2)이다.
    다만 parts는 0을 제외하며 동일한 수를 찾으면 바로 탈출하도록 되어있다. 
*/