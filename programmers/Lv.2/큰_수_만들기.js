//  문제요약
//  1. 1 ~ 1,000,000길이를 가진 숫자문자열 number, 1 ~ number사이의 자연수 k가 주어진다.
//  2. number 문자열에서 k개를 제거했을 때 순서를 지키면서 가능한 큰 수를 만들어서 문자열로 리턴하라.
//  3. "1924"의 경우 k가 2일 때 [19, 12, 14, 92, 94, 24] 의 수들을 만들 수 있다, 91과 같이 순서가 뒤집히면 안된다.
//  4. number = "1231234", k = 3, return "3234"

//  코드#1
const possibleLagrgeNum = (number, k) => {
    let result = '', fixIdx = 0;
    let totalLength = number.length - k;

    while(result.length < totalLength) {
        let prevNum = '0';
        let fixNum = number.length - (totalLength - (result.length+1));

        for(let i=fixIdx; i<fixNum; i++) {
            if(prevNum < number[i]) prevNum = number[i], fixIdx = i+1;
        }
        result += prevNum;
    }
    return result;
}
/*
    풀이#1
    1. 전체 문자열을 누적할 result = ''를 선언하고, 완성할 문자열길이를 totalLength = number.length - k 로 구한다.
    2. result를 완성시키는 동안 루프를 해야 하므로 result.length < totalLength 동안 순회 시킨다.
    3. 이 문제는 문자열을 모두 탐색하는 것이 아닌 정해진 자리 수 한도 내에서 큰 수를 만드는 것
    4. 전체 문자열 number에서 result를 기본적으로 완성할 수 있는 문자를 제외하고 탐색해야 한다.
    5. 예를 들어 number = 10, k = 4 면 l = 6이 되고 6개의 문자열을 만들어야 한다. 
    6. 따라서, 첫번째자리 탐색은 number[0 ~ 4] 를 탐색하고 나머지 문자열 5개를 남겨 놓아야 한다.
    7. 문자열을 재탐색할 경우 고정해 놓을 fixIdx를 선언하고 숫자문자를 비교할 prevNum 변수를 선언한다.
    8. for문은 나머지 문자열을 제외한 fixNum까지 반복하고 prevNum에 가장 큰 숫자문자와 해당 원소의 인덱스를 fixIdx에 할당한다.
    9. 루프가 종료되면 result에 prevNum을 누적하고 number 문자열을 fixIdx+1 부터 재 루프하도록 자른다.
    10. 문자열을 찾는 방식은 아래와 같다.
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
    
    에러핸들링
    1. 10만의 길이를 가지고 있기 때문에, number를 이중루프로 탐색하면 특정 길이일 경우 런타임 에러가 발생해 버린다. 
*/

//  코드#2
const possibleLagrgeNum = (number, k) => {
    const result = [];

    number.split('').forEach(e => {
        while(k !== 0 && result[result.length-1] < e) result.pop(), k--;
        result.push(e);
    });
    return result.slice(0, result.length-k).join('');
}
/*
    풀이#2
    1. 이 문제의 핵심은 k가 제거 되는 동안 큰 수를 유지하고 작은 수들을 제거하는 것에 있다.
    2. 어차피 k개를 제거한 number.length - k 의 문자열 길이를 리턴해야 가장 큰 수가 되기 때문이다.
    3. number = "45634234254342" 이고 k = 2 일 경우 6보다 작은 앞의 4, 5가 제거되고 "634234254342" 리턴되면 된다.
    4. 문제의 요구는 순서를 바꿔서 조합할 수 없기에 "634234254342" 보다 "643234254342"이 더 크지만 후자는 만들 수 없는 수이다.
    5. 따라서, k가 0이 되는 동안 큰 수들을 유지하고 가장 큰 수가 앞에 오면 두 번째 큰수가 오도록 k가 0이 되는 동안 탐색하면 된다.
    6. number에서 크기 비교를 위해 이중루프 하면 복잡도가 N^2 연산이 되기 때문에 수를 비교하기 위해 stack을 활용한다.
    7. stack역할을 할 result배열을 만들고 number문자열을 기본적으로 순회하면서 파악해야 하므로 number를 루프한다.
    8. k가 0이 될 때까지 result 배열 안의 마지막 인덱스 수와 현재 수를 비교해 현재 수 보다 작을 경우 전부 pop
    9. while로 루프하면서 pop이 일어날 때 마다 k-- 누적해서 빼준다.
    10. k가 0이 되면 더 이상 while문은 발동되지 않고 result가 완성되면 리턴한다. 

    에러핸들링
    1. k가 남아 있는 체로 number루프가 종료될 수 있다, ex) '1010' k = 2
    2. k가 남아 있는 경우는 기본적으로 앞의 수들이 큰 수로 모두 정렬이 된 경우고 마지막에 작은 수들이 있는 경우다.
    3. 따라서, result.length에서 남아있는 k개수를 제거해서 리턴하면 된다.

    시간복잡도
    result는 k가 제거되는 만큼만 루프하면 종료되므로 O(N)의 연산을 넘어가지 않는다.
*/
