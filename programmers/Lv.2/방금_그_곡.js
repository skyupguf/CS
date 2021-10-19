//  문제요약
//  1. 멜로디인 m은 음 1~1439 사이로 구성되어 있다.
//  2. musicinfos는 100개 이하의 곡 정보를 담은 배열로 시작,끝,제목,음 정보가 들어 있다.
//  3. 멜로디와 악보에 사용되는 음은 C, C#, D, D#, E, F, F#, G, G#, A, A#, B 12개다.
//  4. 각 음은 1분에 1개씩 재생된다. 음악은 반드시 처음부터 재생되며 음악 길이보다 재생된 시간이 길 때는 음악이 끊김 없이 처음부터 반복해서 재생
//  5. 음악 길이보다 재생된 시간이 짧을 때는 처음부터 재생 시간만큼만 재생
//  6. 조건이 일치하는 음악이 여러 개일 때에는 라디오에서 재생된 시간이 제일 긴 음악 제목을 반환한다.
//  7. 재생된 시간도 같을 경우 먼저 입력된 음악 제목을 반환
//  9. m = "ABCDEFG", musicinfos = ["12:00,12:14,HELLO,CDEFGAB", "13:00,13:05,WORLD,ABCDEF"], return "HELLO"
//  10. m = "CC#BCC#BCC#BCC#B", musicinfos = ["03:00,03:30,FOO,CC#B", "04:00,04:08,BAR,CC#BCC#BCC#B"], return "FOO"
//  11. m = "ABC", musicinfos = ["12:00,12:14,HELLO,C#DEFGAB", "13:00,13:05,WORLD,ABCDEF"], return "WORLD"

//  코드
const findMusic = (m, musicinfos) => {
    let M = '', store = {name: '', time: 0};
    // #이 포함된 문자열 소문자로 치환
    for(let i=0; i<m.length; i++) {
        if(m[i] !== '#') m[i+1] !== '#' ? M += m[i] : M += m[i].toLowerCase();
    }
    musicinfos.forEach(el => {
        // 재생시간 구하기
        let arr = el.split(','), time1 = arr[0], time2 = arr[1];
        let time = Number(time2[0]+time2[1]) * 60 + Number(time2[3]+time2[4]);
        time -= Number(time1[0]+time1[1]) * 60 + Number(time1[3]+time1[4]);
        // #이 포함된 문자열 소문자로 치환
        let s = arr[3], mel = '', play = '';
        for(let i=0; i<s.length; i++) {
            if(s[i] !== '#') s[i+1] !== '#' ? mel += s[i] : mel += s[i].toLowerCase();
        }
        // 재생된 멜로디 구하기    
        while(play.length < time) play += mel;
        play = play.substring(0, time);
        // 음악비교
        if(play.indexOf(M) !== -1 && store.time < time) {
            store.name = arr[2], store.time = time;
        }
    });
    return store.name ? store.name : "(None)"
}
/*
풀이
1. musicinfos안의 ,로 구분된 각 요소를 구별해야 하므로 musicinfos[i].split(",")으로 4개의 길이를 가진 배열로 쪼갠다.
2. 음 재생은 00:00분을 넘길 수 없으므로 쪼갠 배열의 [0]번째와 [1]번째를 숫자화 한다, (el[1][0][1] * 60 + el[1][3][4]) - (el[0][0][1] * 60 + el[0][3][4])
3. 구해진 분까지 el[3]의 문자를 재 구성하고 m과 비교한다.
4. 여기서 중요한 건 완전탐색이 이뤄져야 한다는것, m이 여러개의 el의 재구성된 문자열과 동일할 경우 가장 긴 재생시간을 가진 음악 제목을 리턴해야 한다.
5. 따라서, m과 동일한 el[3]일 경우 재생시간과 제목을 새로운 객체에 저장해 놓고, 다음 m과 동일한 음악과 재생시간을 비교 교체하는 작업을 수행
6. 재생시간까지 동일할 경우 교체하지 않는다.

에러핸들링
1. #이 오는 경우 한문자 처럼 인식해야한다, C !== C# m과 arr[3]의 연속된 #문자를 묶어서 소문자로 변경 새로운 변수에 문자를 누적한다.

시간복잡도
이중루프가 구현되는 식 모두 특정 원소의 부분만 순회하므로 N^2이 될 수 없다, O(N)
*/