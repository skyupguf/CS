// 문제요약
// 1. 1~100,000 길이를 가진 participant 배열과 participant의 요소 하나가 제거된 completion 배열이 존재한다.
// 2. 요소들은 알파벳소문자이며 양쪽 배열의 짝을 하나씩 맞출 경우 남는 하나의 요소를 리턴하라.
// 3. participant = ["mislav", "stanko", "mislav", "ana"], completion = ["stanko", "ana", "mislav"], return "mislav"

//  코드
const findRemainderEl = (participant, completion) => {
    participant.sort();
    completion.sort();
    for(let i=0; i<participant.length; i++) {
        if(participant[i] !== completion[i]) return participant[i];
    }
}
/*
    풀이
    1. 알파벳이 소문자로 구성되어 있으므로 양 배열을 정렬하면 동일하게 정렬된다.
    2. 순회를 하면서 특정 인덱스에 서로 다른 요소가 있는 경우는 한가지이므로 일치하지 않을 때 리턴하면 된다.

    시간복잡도
    sort메소드는 루프보다 크지 않으므로 O(N)의 시간복잡도를 가진다.
*/