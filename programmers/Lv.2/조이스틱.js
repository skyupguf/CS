//  문제요약
//  1. 입력되는 name은 알파벳 대문자로 이루어진 1~20 길이를 가진 문자열이다.
//  2. name과 같은 문자열을 만들기 위해 아래와 같이 조이스틱을 움직여 문자를 완성해야 한다.
//  3. ▲ - 다음 알파벳
//  4. ▼ - 이전 알파벳 (A에서 아래쪽으로 이동하면 Z로)
//  5. ◀ - 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)
//  6. ▶ - 커서를 오른쪽으로 이동
//  7. name = JAZ 면, default = 'AAA'이며 조이스틱을 다음과 같이 움직여야 한다.
//  8. 첫 번째 위치에서 조이스틱을 위로 9번 조작하여 J를 완성한다.
//  9. 조이스틱을 왼쪽으로 1번 조작하여 커서를 마지막 문자 위치로 이동시킨다.
//  10. 마지막 위치에서 조이스틱을 아래로 1번 조작하여 Z를 완성한다.
//  11. 11번 이동시켜 "JAZ"를 만들 수 있고, 이때가 최소 이동이 된다.
//  12. 최소의 조작으로 name을 완성하라.
//  13. name = "JEROEN", return	56 / name = "JAN", return 23

//  코드
const makeIdToJoyStick = (name) => {
    const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let cur, move = 0;

    for(let i=0; i<name.length; i++) {
        const goal = alpha.indexOf(name[i]);
        const dist = Math.abs(cur - goal);
        
        if(dist < 14) move += dist;
        else move += (26 - dist);
        cur = goal;
    }
    return move;
}
/*
풀이
1. 문자열 하나를 완성하고 다음 문자열을 완성하기 위해 커서를 움직여야 한다.
2. 맨, 앞과 맨 뒤로는 한번에 이동할 수 있다.
3. 알파벳 커서 인덱스를 파악하기 위해 대문자를 할당한 alpha 변수를 선언한다.
4. name[i]에 해당하는 문자열을 찾아야 하므로 기본 for문으로 루프를 사용한다.
5. indexOf(N)이면 13이며 A에서 정순, 역순 모두 이동거리가 같다.
*/