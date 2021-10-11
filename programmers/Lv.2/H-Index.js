//  문제요약
//  1. H-Index는 과학자의 생산성과 영향력을 나타내는 지표로 아래와 같이 구한다.
//  2. 발표한 논문을 인용된 수 대로 내림차순 정렬을 하여 인용횟수 보다 순번이 커지기 시작한 논문 수가 h다.
//  3. 기준 h를 만족하는 논문의 개수가 H-Index가 된다. 
//  4. 길이가 1~1000 사이인 논문이 든 배열 citations의 논문당 인용 횟수는 0~10,000 사이라면 H-Index를 구하라.
//  5. citations = [3, 0, 6, 1, 5], return 3

//  코드
const calHIndex = (citations) => {
    citations.sort((a, b) => b - a);
    
    let i = 0;
    while(citations[i] >= i+1) i++;
    return i;
}
/*
    풀이
    1. citations를 내림차순 정렬하기 위해 sort메소드로 정렬한다.
    2. [0, 0, 0, 0] 이면 논문 4개에 인용 0개 이므로 H-Index는 0이므로 citations[0] = 0 이면 0을 리턴해야 한다.
    3. 배열의 인덱스보다 요소가 클 경우 까지 count를 하고 나서 count를 리턴한다.
    4. [5, 5, 5, 5]의 경우 h = 3 인데 모든 요소가 3보다 크기 때문에 4가 리턴되어야 한다.
    5. 따라서, 조건이 만족하면 탈출이 되거나 끝까지 전부 탐색이 가능하기도 해야 하므로 while문으로 조건설정
    6. citations[i] >= i 일 경우 i >= h를 만족한다.
    7. 인덱스 i가 count 역할을 하기 때문에 count 변수는 삭제한다.

    에러핸들링
    1. [1, 1, 1, 1]의 경우 h = 2인데 루프종료조건이 citations[i] >= i 면 i가 2인 상태로 리턴되므로 citations[i] >= i+1 변경

    시간복잡도
    sort메소드 : 최대 O(NlogN), while문 : 최대 O(N) / => O(NlogN)
*/                                                                                          