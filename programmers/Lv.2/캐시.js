//  문제요약
//  1. 캐시 크기(cacheSize)는 정수이며, 범위는 0 ≦ cacheSize ≦ 30
//  2. 도시이름 배열(cities)은 문자열 배열로, 최대 도시 수는 100,000개, 공백, 숫자, 특수문자 등이 없는 대소 영문자로 구성된 20자
//  3. 입력된 도시이름 배열을 순서대로 처리할 때, "총 실행시간"을 출력
//  4. 캐시 교체 알고리즘은 LRU(Least Recently Used)를 사용, cache hit일 경우 실행시간은 1, cache miss일 경우 실행시간은 5
//  5. cacheSize = 3, cities = ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "Jeju", "Pangyo", "Seoul", "NewYork", "LA"], return 50
//  6. cacheSize = 3, cities = ["Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul", "Jeju", "Pangyo", "Seoul"], return 21
//  7. cacheSize = 2, cities = ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"], return 60
//  8. cacheSize = 5, cities = ["Jeju", "Pangyo", "Seoul", "NewYork", "LA", "SanFrancisco", "Seoul", "Rome", "Paris", "Jeju", "NewYork", "Rome"], return 52
//  9. cacheSize = 2, cities = ["Jeju", "Pangyo", "NewYork", "newyork"], return 16
//  10. cacheSize = 0, cities = ["Jeju", "Pangyo", "Seoul", "NewYork", "LA"], return 25

//  코드
const calLRU = (size, arr) => {
    let idx, cache = [];
    return arr.reduce((t, e) => {
        e = e.toLowerCase(), idx = cache.indexOf(e); 

        if(idx === -1) t+=5;
        if(idx !== -1) t++, cache.splice(idx, 1);
        else if(cache.length === size) cache.shift();

        cache.push(e);
        return t;
    }, 0);
}
const calTime = (cacheSize, cities) => cacheSize ? calLRU(cacheSize, cities) : cities.length*5;
/*
    풀이
    1. LRU는 캐시크기가 꽉 차있는 경우 가장 사용한지 오래된 캐시를 지우고 새 값을 넣는 알고리즘이다.
    2. cache hit: 캐시안에 현재 값이 들어있기 때문에 +1, cache miss: 캐시안에 현재 값이 없기 때문에 +5
    3. cacheSize가 0인 경우 cache hit가 발생하지 않기 때문에 cities길이에 miss의 연산시간인 x5를 해 리턴한다.
    4. cacheSize가 0보다 클 경우 cache를 확인하기 위해 cache배열을 선언하고 cache에 삽입된 원소를 찾기 위해 idx변수도 선언한다.
    5. cities를 루프하면서 LRU를 적용하기 위해 다음과 같은 조건들이 따른다.
    6. cache배열안에 cities[i]가 존재하는 경우 cache hit가 되며, cache안에 해당 원소를 idx와 splice로 제거한다.
    7. cache배열안에 cities[i]가 존재하지 않는 경우 cache miss가 되며, cache가 cacheSize와 같으면 가장 앞의 원소를 shitf한다.
    8. 해당원소를 cache에 push한다, 루프가 끝나면 hit와 miss의 누적을 리턴한다.

    에러핸들링
    1. 대소문자 구별이 안되어 있기 때문에 원소를 탐색할 때 마다 소문자로 변경한다.

    시간복잡도
    indexOf와 toLowerCase가 있어도 cities를 n^2으로 순회하진 않기 때문에 O(N) 이다.
*/