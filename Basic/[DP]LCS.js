//  문제요약
//  1. Longest Common Substring은 입력되는 두 개 이상의 문자열에서 연속부분 문자열 중 가장 긴 공통 부분 문자열을 찾는 것이다.
//  2. Longest Common Subsequence는 연속이 아니라도 공통으로 존재하는 가장 긴 부분 문자수열을 찾는 것이다.
//  3. substring => 입력 : s1 = "ABCDEF", s2 = "GBCDFE", 출력 : "BCD"
//  4. subsequence => 입력 : s1 = "ABCDEF", s2 = "GBCDFE", 출력 : "BCDE", "BCDF"
//  5. 위 조건에 맞춰 두 값을 구하는 함수를 각각 작성하라.

//  LCS(substring)코드
const LongestCommonSubstring = (str1, str2) => {
    const table = 
        Array.from({length: str1.length+1}, () => new Array(str2.length+1).fill(0));
    
    let index, len = 0;
    for (let i=0; i<str1.length; i++)
    for (let j=0; j<str2.length; j++) {

        if (str1[i] === str2[j]) {
            table[i+1][j+1] = table[i][j] + 1;   
            if (len < table[i+1][j+1]) len = table[i+1][j+1], index = i;
        }
    }
    let subStr = [];
    while (len > 0) subStr.push(str1[index]), index--, len--;
    return subStr.reverse().join('');
}
/*
    풀이
    이 문제에서 주의할 점은 두 인자의 중복체크를 위해 모든 가능한 부분 문자열조합을 찾아야 하는 것이다.
    예를 들어, "ABCDEF"의 부분 문자열을 모두 찾으면 아래와 같다.
    [
        'A', 'B', 'C', 'D', 'E', 'F', 
        'AB', 'BC', 'CD', 'DE', 'EF',
        'ABC', 'BCD', 'CDE', 'DEF',
        'ABCD', 'BCDE', 'CDEF',
        'ABCDE', 'BCDEF'
    ]
    2개의 요소를 찾는 조합이 nC2 = 2^n임을 감안하면 두 개이상의 인자의 조합을 모두 찾는데 연산이 기하급수로 증가한다.
    따라서, 분할가능한 가장 작은 단위인 문자열 1개를 인덱스로하는 Tabulation을 활용하여 효율적인 연산을 해야 한다.

    우선 인자 두개의 길이로 행렬을 구성하는 matrix를 생성하고 모든 위치에 0을 할당한 후 두 문자열을 비교하면서  
    문자열이 동일하면 두 문자열을 나타내는 인덱스 위치에 1을 할당하고 이전 인덱스의 값이 1이상이면 1을 누적해서 할당한다.
    이러면 연속되는 인덱스의 문자열 중 가장 큰 값을 가진 문자열이 최장 공통 문자열이 된다.

    "ABCDEF" 와 "GBCDFE"를 행렬로 도표화 하면 아래와 같다.
    [      G  B  C  D  F  E
       [0, 0, 0, 0, 0, 0, 0]
    A  [0, 0, 0, 0, 0, 0, 0]
    B  [0, 0, 1, 0, 0, 0, 0]
    C  [0, 0, 0, 2, 0, 0, 0]
    D  [0, 0, 0, 0, 3, 0, 0]
    E  [0, 0, 0, 0, 0, 0, 1]
    F  [0, 0, 0, 0, 0, 1, 0]
    ]

    1. str1과 str2 두 문자열의 길이로 2차원 배열을 Array.from을 활용해 생성하고 table변수에 할당한다.
        1-1. 이전 값을 기준으로 연속될 경우 누적을 해야하기 때문에 0번째 인덱스를 비우기 위해 길이1을 추가해서 생성한다.

    2. 이제 이중루프를 이용해 두 문자를 비교해 table의 해당 좌표 값을 갱신해 나간다.
        2-1. 우선 최장 연속 문자열의 길이가 할당될 값을 찾기 위해 index, len를 각각 선언하고 len에 0을 할당한다.
        2-2. 이중루프로 i, j의 두 문자열이 같으면 i+1, j+1에 이전 값인 i, j에 1을 누적해 할당한다.
        2-3. len보다 중복문자열 값이 크면 len을 해당 값으로 갱신하고 index에 해당 인덱스 i를 할당한다.
    
    3. 최장 길이를 구하려면 len을 그대로 리턴하면 되고 문자열 자체를 구하려면 추가작업이 필요하다.
        3-1. subStr = []을 선언하고 len의 길이만큼 index부터 str1을 역으로 찾아서 삽입한다.
        3-2. 역순으로 찾았으므로 reverse로 뒤집고 join으로 문자화하여 리턴한다.

    시간복잡도
    모든 조합을 구할 경우 지수로 상승하는 시간복잡도를 Tabulation을 통해 O(N^2)으로 해결할 수 있다.
*/

//  LCS(subsequence)코드
const LongestCommonSubsequence = (str1, str2) => {

}
/*
    풀이
    최장 공통 부분수열은 연속 부분문자열과 다르게 문자열이 떨어져 있어도 오름차순으로 정렬이 되면 수열로 간주해야 한다.
    예를 들어 "ABCDEF", "GBCDFE"의 경우 두 번째 문자열에서 E가 떨어져 있어도 BCDE도 부분수열에 속하게 된다.

    즉 문자열 중복이 연속되지 않더라도 오름차순 정렬에 맞다면 부분수열의 길이로 체크되어야 하는 것이다.
    이를 matrix로 구현하면 이전에 찾은 부분수열의 값을 해당 인덱스에서만 체크해선 안되며 기억하고 있어야 한다.

    예를들어, 문자열 AB와 GBCDFE를 비교할 때 B가 중복되는 문자 수열임을 알 수 있으며 이후 C를 탐색하기 전까지 
    중복 문자수열은 B하나인 상태로 계속 기록되어 있어야 한다. 왜냐하면, AB뒤에 X가 나온 이후 C가 나와 ABXC라고 한다면 
    C가 중복되며 B보다 순서가 뒤이므로 수열을 만족하고 공통 문자수열은 BC 두개가 될 수 있기 때문이다.

    여기서 또 하나 고려해야 하는 점은 LIS에서도 마찬가지였지만 두 문자열의 순서가 다르게 중복될 때 이다.
    EF와 FE의 경우 공통 문자수열은 1이다. F가 E앞에 오게되면서 수열의 조건이 깨졌기 때문이다. 
    따라서, 1번은 수열이지만 2번은 수열이 아니므로 이를 matrix상에 값으로 표현할 경우 두 경우를 모두 상정해야 한다.

    matrix를 예시로 직접 구현해본다.
    [      G  B  C  D  F  E
       [0, 0, 0, 0, 0, 0, 0]
    A  [0, 0, 0, 0, 0, 0, 0]
    B  [0, 0, 1, 1, 1, 1, 1] B의 중복이 기록된 이후 AB와 비교되는 모든 문자열은 계속 값이 1인 상태를 유지한다.
    C  [0, 0, 0, 2, 0, 0, 0] ABC와 GB가 비교될 때 B가 겹쳐지는데 앞서 ABC와 G는 
    D  [0, 0, 1, 2, 3, 3, 3]
    E  [0, 0, 1, 2, 3, 3, 4]
    F  [0, 0, 1, 2, 3, 4, 4]
    ]
    [      G  C  B  D  F  E
       [0, 0, 0, 0, 0, 0, 0]
    A  [0, 0, 0, 0, 0, 0, 0]
    B  [0, 0, 0, 1, 1, 1, 1]
    C  [0, 0, 1, 1, 1, 1, 1]
    D  [0, 0, 1, 1, 2, 2, 2]
    E  [0, 0, 1, 1, 2, 2, 3]
    F  [0, 0, 1, 1, 2, 3, 3]
    ]

const reverseStr = (str) => {
    let word = ''
    let array = [];
    for (let i=0; i<str.length; i++) {
        if (str[i] !== ' ') {
            word += str[i];
        
        } else if (str[i] === ' ' || i === str.length-1) {
            array.push(word), word = '';
        }
    }
    while (array.length) word += array.pop();
    return word;
}


*/