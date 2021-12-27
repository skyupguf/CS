//  문제요약
//  1. 입력으로 주어지는 a, b는 b > a이며 a/b는 유리수이다.
//  2. a를 분자 b를 분모로하여 이집트 분수를 문자열로 변환하는 함수를 구현하라.
//  3. a = 2, b = 3, return '(1/2)+(1/6)'
//  4. a = 12, b = 13 return '(1/2)+(1/3)+(1/12)+(1/156)'

//  코드
const getEgyptFraction = (a, b) => {
    const result = [];
    
    while (a && b) {
        let fixed = Math.ceil(b / a);
        a = a * fixed - b;
        b *= fixed;

        result.push(`(1/${fixed})`);
    } 
    return result.join('+');
}
/*
    풀이
    1. 문자열 이집트분수를 담을 빈 배열을 선언한다.
    
    2. 루프를 통해 더 이상 나눌 수 없을 때 까지 분할 해야 하므로 분자a, 분모b가 0이 될 때까지 루프해야 한다.
        2-1. while문에 a, b가 0이 아닐 때 까지 루프를 계속 하도록 한다. b의 경우 설정을 안해주면 NaN이 나올 수 있다.
        2-2. b/a에서 나머지가 존재할 경우 최대 라운드는 무조건 올림한 경우이므로 올림한 몫을 변수 fixed에 할당한다.
        2-3. 분자a와 분모b를 구하면 분자1(a)*분모2(fixed) - 분자2(1)*분모1(b), 분모(b)*분모(fixed)
        2-4. 나눌 수 있는 최대 만큼을 매번 나눠가므로 그리디 알고리즘에 해당하며 fixed에 할당된 결과를 result에 push한다.
    
    3. 루프가 종료되면 균등분배가 완료되었으므로 result에 +를 더해 join으로 문자열로 리턴한다.

    시간복잡도
    b가 a로 나뉘어 떨어지는 값에 도달할 때 까지 루프 O(b/a)
*/

//  코드#2
const getEgyptFraction = (a, b) => {
    const denominator = Math.ceil(b / a);

    if (!a || !b) return '';
    if (!(b % a)) return `(1/${denominator})`;

    a = a * denominator - b;
    b *= denominator;

    return `(1/${denominator})+` + getEgyptFraction(a, b);
}
/*
    풀이
    1. 재귀연산을 이용해 배열을 사용하지 않고 문자열로 바로 리턴할 수 있도록 구현해 본다.

    2. 그리디를 통해 최대분배가능 계수를 Math.ceil(b/a)로 구해 denominator변수에 할당한다.

    3. 조건으로 우선 a, b에 둘 중 하나라도 0이 입력되었을 경우 빈 문자를 리턴하도록 설정한다.
    
    4. 재귀연산 로직을 구성한다.
        4-1. 우선 탈출 조건으로 b가 a로 나누어 떨어질 경우 '(1/denominator)'를 리턴한다.
        4-2. 분자 a와 분모 b를 구한 dnominator를 이용해 갱신한다.
        4-3. '(1/denominatr)+'를 리턴하면서 문자열로 리턴될 getEgyptFraction(a, b)를 재귀호출해 +를 해준다.
*/