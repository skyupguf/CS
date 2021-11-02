//  문제요약
//  1. [의상의 이름, 의상의 종류]의 형태의 원소를 가진 1~30사이의 길이인 clothes 배열이 존재한다.
//  2. 모든 원소는 알파벳 소문자와 _ 인 문자열로 이루어져 있으며 1~20사이의 길이를 가진다.
//  3. 의상의 종류에 여러개의 의상들이 있을 수 있으며, 같은 의상 종류는 동시에 입지 못한다.
//  4. 한 개를 입는 경우가 1가지 경우이며 서로 다른 종류의 의상을 조합해 입어도 1가지 경우이다.
//  4. 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합의 수를 구하는 함수를 작성하라.
//  5. clothes = [["yellowhat", "headgear"], ["bluesunglasses", "eyewear"], ["green_turban", "headgear"]], return 5
//  6. clothes = [["crowmask", "face"], ["bluesunglasses", "face"], ["smoky_makeup", "face"]], return 3

//  코드
const countCombinedType = (clothes) => {
    let tog = new Map(), sum = 1;
    
    clothes.forEach(e => {
        tog.has(e[1]) ? tog.set(e[1], tog.get(e[1])+1) : tog.set(e[1], 1); 
    });
    for(let type of tog.values()) sum *= (type+1)
    return sum-1;
}
/*
    풀이
    1. clothes를 루프하면서 원소배열[1]을 키로 하고 키가 존재할 경우 1씩 누적해서 객체에 값을 할당한다.
    2. 객체가 완성되면 각 키에 할당 된 값을 모두 더해서 각자의 경우를 먼저 구한다.
    3. face: f1, f2 head: h1, h2 top: t1, t2를 조합하면 f1, f2, h1, h2, t1, t2, f1h1, f1h2, f1t1, f1t2, f2h1, f2h2, f2t1, f2t2, 
    4. h1t1, h1t2, h2t1, h2t2, f1h1t1, f1h1t2, f1h2t1, f1h2t2, f2h1t1, f2h1t2, f2h2t1, f2h2t2 총 26개의 조합이 나온다.
    5. 우선 각자 독립 조합 2개씩이 존재한다 2 + 2 + 2 = 6, 그리고 f1은 f2와 같이 조합될 수 없다, 일반 조합이 아니다.
    6. f1은 나머지 h1, h2, t1, t2 와만 조합이 가능하다, f2도 마찬가지, 자기자신 포함해서 f1에서만 총 9가지 f2까지 총 18가지
    7. 그럼 3개짜리 조합은 끝났고 h와 t의 조합 h는 6가지 그럼 남은 t는 자기 자신만 2가지 총 26가지
    8. face: f1, f2, 안입음, head: h1, h2, 안입음, top: t1, t2, 안입음
    9. 즉 f1이면 f1안안, f1h1안, f1h2안, f1안t1, f1안t2, f1h1t1, f1h1t2, f1h2t1, f1h2t2 위와 같이 f1조합이 9가지 동일

    에러핸들링
    1. 3 x 3 x 3 = 27가지인데 [안입음, 안입음, 안입음] 이 경우는 존재하지 않는다.

    시간복잡도
    clothes를 전부 루프해야 하므로 O(N)
*/
