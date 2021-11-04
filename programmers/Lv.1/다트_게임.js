//  문제요약
//  1. 입력으로 들어오는 총 3라운드의 다트 게임 점수를 아래 계산 로직에 맞춰 반환하는 함수를 작성하라.
//  2. 점수 계산 로직 : 숫자 0 ~ 10 은 점수, S는 1제곱, D는 2제곱, T는 3제곱
//  3. 점수 계산 로직2 : *는 해당 점수 2배이며 2라운드 적용, 처음에 오면 1라운드 째만 적용된다.
//  4. 점수 계산 로직3 : #은 해당 점수를 -로 만들며, 해당 점수에만 적용된다.
//  5. 점수 계산 로직4 : *가 중첩되면 4배가 된다, *#이 중첩되면 -2배가 된다.
//  6. 점수 계산 로직5 : *, #은 1라운드에 동시에 올 수 없다.
//  7. 1S2D*3T => (1^1 * 2) + (2^2 * 2) + (3^3), return 37 / 1S*2T*3S => (1^1 * 4) + (2^3 * 2) + (3^1), return 23
//  8. 1D#2S*3S => (1^2 * -2) + (2^1 * 2) + (3^1), return 5 / 1D2S#10S => (1^2) + (2^1 * -1) + (10^1), return 9

//  코드#1
const calDartScore = (dartResult) => {
    let round = -1;
    const dartRound = new Array(3).fill(0);
    const score = {
        'D': () => dartRound[round]**= 2,
        'T': () => dartRound[round]**= 3,
        '#': () => dartRound[round]*= -1,
        '*': () => {dartRound[round]*= 2, dartRound[round-1] *= 2}
    }

    for(let i=0; i<dartResult.length; i++) {
        let dart = dartResult[i];
        if(!isNaN(dart) && !isNaN(dartResult[i+1])) dart += dartResult[i+1], i++;
        if(!isNaN(dart)) round++, dartRound[round] += Number(dart);
        else if(dart !== 'S') score[dart]();
    }
    return dartRound.reduce((a, c) => a + c);
}
/*
    풀이
    1. 숫자와 S, D, T, # 은 바로 그자리에서 계산이 되면 된다.
    2. *가 나오는 라운드에 따라 적용되는 범위가 달라진다, 1번째면 1번째 점수에만 2번째면 1, 2번째, 3번째면 2, 3번째다.
    3. 각 라운드를 분리해야 하므로 길이가 3인 배열을 만들어 각 라운드의 값들을 해당 인덱스에 할당하는 방식을 사용한다.
    5. for 루프로 입력을 루프하면서 number타입이 나오는 경우 isNaN으로 체크하고 인덱스 역할의 round+1을 하고 수를 할당한다.
    6. 수가 아닐 경우 룩업으로 score객체를 만들어 각 기호에 해당 수식 메소드를 키, 값으로 할당한다.
    7. 이 때, 'S'는 굳이 포함할 필요가 없으므로 function에러가 나지 않기 위해 분기로 예외처리 한다.
    8. 완성된 dartRound배열의 값들을 전부 합해 리턴한다.

    에러 핸들링
    1. 10과 같이 문자열일 경우 1과 0이면 붙여서 다뤄야 하므로 조건문으로 붙이고 인덱스를 하나 증가시킨다.

    시간복잡도
    O(N)
*/

//  코드#2
const calDartScore = (dartResult) => {
    let round = -1;
    const dartRound = new Array(3).fill(0);
    
    for(let i=0; i<dartResult.length; i++) {
        let dart = dartResult[i];
        
        if(dart === 'S') continue;
        if(!isNaN(dart) && !isNaN(dartResult[i+1])) dart += dartResult[i+1], i++;
        if(!isNaN(dart)) round++, dartRound[round] += Number(dart);
        
        else if(dart === '*') dartRound[round] *= 2, dartRound[round-1] *= 2;
        else if(dart === '#') dartRound[round] *= -1;
        else dart === 'D' ? dartRound[round]**=2 : dartRound[round]**=3;
    }
    return dartRound.reduce((a, c) => a + c);
}
/*
    풀이#2
    1. 배열로 라운드를 나누고 숫자 처리를 하는 방식은 1번 코드와 동일하다.
    2. 루프문 안에서 S는 바로 건너뛰고 *, #을 위의 메소드와 같은 수식을 사용한다.
    3. 마지막으로 알파벳의 경우 else문에서 처리한다.

    시간복잡도
    메소드 호출과 동일한 코드지만 for 루프 안에서 조건문으로 처리하는게 속도가 더 빠르다.
*/