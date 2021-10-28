//  문제요약
//  1. n은 2~30 자연수, lost는 1~n길이배열 중복되는 원소 없음, reserve는 1~n길이 배열 중복되는 원소 없음
//  2. reserve의 원소가 lost에 있을 수 있다, reserve배열의 원소의 번호 앞 뒤로 체육복을 빌려 줄 수 있다.
//  3. lost에 해당 번호가 있으면 빌려 줄 수 있는 것, 모두 빌려주는게 완료됐을 때 체육복이 있는 원소 수 리턴
//  4. n = 5, lost = [2, 4], reserve = [1, 3, 5], return 5
//  5. n = 3, lost = [3], reserve = [1], return 2

//  코드
const rentGymSuit = (n, lost, reserve) => {
    return n - lost.sort((a, b) => a - b).map(e => {
        let i = reserve.indexOf(e);
        if(i !== -1) reserve.splice(i, 1);
        else return e;
    }).filter(e => {
        let check1 = reserve.indexOf(e-1);
        let check2 = reserve.indexOf(e+1), j;
        check1 !== -1 ? j = check1 : check2 !== -1 ? j = check2 : j = -1;
        
        if(j !== -1) reserve.splice(j, 1);
        else return e;
    }).length;
}
/*
    풀이
    1. 전체 n에서 lost와 reserve에 포함되어 있지 않은 번호는 무조건 포함된다.
    2. lost와 reserve에 동일한 원소가 있을 경우 reserve는 빌려 줄 수 없으므로 reserve에서 제외해야 한다.
    3. lost를 map으로 루프하면서 reserve.indexOf(e) 로 찾고 -1이 아닐 경우 reserve에서 제거 그 외 e 리턴
    4. 남은 원소들을 filter로 루프, e+1, e-1을 reserve.indexOf 로 탐색, j를 선언하고 할당
    5. j가 -1이 아니면 reserve에서 해당 원소를 제거, 그외 return e
    6. n - lost.length 를 하고 리턴

    에러핸들링
    1. Greedy가 적용되기 위해서 앞, 뒤 단계가 영향 받아선 안되므로 sort로 한방향으로 정렬해야 한다.
    2. reserve와 lost를 각각 오름차순 정렬한다.

    시간복잡도
    정렬 메소드가 사용되 최대 O(NlogN) 이 소요된다.

    리팩토링
    1. sort로 오름차순 정렬은 루프하는 배열만 하면된다, 다른 배열은 indexOf로 탐색하기 때문에 두번 정렬을 할 필요가 없다.

*/