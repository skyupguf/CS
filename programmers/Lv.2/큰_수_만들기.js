//  문제요약
//  1. 1 ~ 1,000,000길이를 가진 숫자문자열 number, 1 ~ number사이의 자연수 k가 주어진다.
//  2. number 문자열에서 k개를 제거했을 때 순서를 지키면서 가능한 큰 수를 만들어서 문자열로 리턴하라.
//  3. "1924"의 경우 k가 2일 때 [19, 12, 14, 92, 94, 24] 의 수들을 만들 수 있다, 91과 같이 순서가 뒤집히면 안된다.
//  4. number = "12312/345", k = 3, return "3234"

//  코드
const possibleLagrgeNum = (number, k) => {
    let result = '', L = number.length - k;

    while(result.length < L) {
        let fix = 0, temp = '0';
        let j = L - result.length;

        for(let i=0; i<j-1; i++) {
            if(temp < number[i]) temp = number[i], fix = i;
        }
        result += temp;
        number = number.slice(fix+1);
    }
    return result;
}
/*
    풀이
    1. 문자열 전체길이는 l = number.length - k 가 된다, 큰 수를 만들 문자열을 누적할 L = '' 변수를 선언한다.
    2. 문자열 l의 길이를 지키기 위해 기본 보존 문자열외에서 큰 수를 자리수 마다 배정해야 한다. 
    3. 예를 들어 number = 10, k = 4 면 l = 6이 되고 6개의 문자열을 만들어야 한다. 
    4. 따라서, 첫번째자리 탐색은 number[0 ~ 4] 를 탐색하고 나머지 문자열 5개를 남겨 놓아야 한다, number.length < l-1
    5. 문자열 하나가 배치되면 l--, number.slice(i+1) 로 초기화 하여 다음 자리 수를 탐색한다.
    6. 도식화하면 다음과 같다, 그리디 알고리즘 처럼 탐색이 완료된 i이전까지 문자열은 그냥 버리면 된다.
        41772/52841
        [7, , , , , ]
        725/2841
        [7, 7, , , , ]
        252/841
        [7, 7, 5, , , ]
        28/41
        [7, 7, 5, 8, , ]
        4/1
        [7, 7, 5, 8, 4, ]
        1
        [7, 7, 5, 8, 4, 1]
        
        192/4
        [9, ]
        24
*/
