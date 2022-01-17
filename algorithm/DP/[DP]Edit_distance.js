/*
    문제요약
    1. 입력으로 주어지는 문자열 str1을 str2로 변환하는데 들어가는 최소 작업의 수를 찾아라.

    2. 작업의 방법은 총 3가지이며 모든 비용은 동일하다.
        2-1. insert : str1 = "ca", str2 = "cat" 문자't'를 삽입
        2-2. replace : str1 = "cat", str2 = "cut" 문자 'a'를 'u'로 변환
        2-3. remove : str1 = "caty", str2 = "cut" 문자 'y'를 삭제
    
    3. str1 = "sunday", str2 = "saturday"가 변환되는 과정은 다음과 같다.
        3-1. 'un'에서 'n'을 'r'로 replace한다.
        3-2. 't'와 'a'를 앞쪽에 insert한다.
        3-3. 총 3번의 최소한의 작업으로 str2를 완성할 수 있다.
*/

//  코드
const costOfEditedDistance = (str1, str2, i, j) => {
    if (i === 0) return j;
    if (j === 0) return i;
    if (str1[i-1] === str2[j-1]) return costOfEditedDistance(str1, str2, i-1, j-1);
    
    return 1 + Math.min(
        costOfEditedDistance(str1, str2, i-1, j), 
        costOfEditedDistance(str1, str2, i, j-1), 
        costOfEditedDistance(str1, str2, i-1, j-1));
}
/*
    접근방법
    str1을 str2로 전부 바꾼다고 생각하면 된다. 중간에 값을 확인해 변경하는 방법은 경우의 수가 다양해 조건을 만들기 복잡하다. 
    sunday를 monday로 변경할 경우 su를 replace를 하면 된다. 반면에 ondaym 를 monday로 변경할 경우 가장 뒤의 m을 remove하고 
    가장 앞에 m을 insert를 해야 최소비용이 된다.
    
    즉 문자 하나하나를 insert, remove, replace 모든 경우를 따져보고 최소비용이 되는 경우를 선택해야 한다.
    극단적인 경우로 str1.length가 0이면 str2.length만큼 insert가 발생해야 한다. 반대의 경우 remove를 해야한다.
    
    abc를 def으로 변경하는 3가지 방법을 모두 고려해본다.
    insert      replace     remove      cost
    d, e, f     0           a, b, c     6   // defabc => defabc => def
    d, e        f           b, c        5   // deabc => defbc => def
    d           e, f        c           4   // dabc => defc => def
    0           d, e, f     0           3   // abc => def => def

    atc를 cat으로 변경하는 방법도 구해본다.
    insert      replace     remove      cost
    c, a, t     0           a, t, c     6   // catatc => catatc => cat
    c, a        0           a, c        4   // caatc => caatc => cat
    c           0           c           2   // catc => catc => cat
    0           c, a, t     0           3   // atc => cat => cat

    위의 예시로 보면 결과적으로 str1에서 최소한의 변경회수로 str2와 동일해지는 경우를 찾아야 한다.
    
    수도코드
    1. 분할의 최소단위는 한 쪽 문자열의 길이가 0인 경우이다. 어느 쪽이 0이던 insert와 remove가 동일한 비용으로 발생한다.
        1-1. str1과 str2의 길이가 다르기 때문에 str1.length가 0이면 str2.length만큼 insert가 되어야 한다.
        1-2. 반대의 경우 str1.length 만큼 remove가 되어야 하므로 탈출 조건을 두 개로 분기해야 한다.
        1-3. 두 문자열의 길이를 i, j라 하면 0인 경우 탈출조건이 되므로 뒤 요소부터 분할해 나가면서 비교해야 한다.
    
    2. 우선 편의를 위해 두 문자열의 마지막 인덱스부터 동일성 여부를 판단한다.
        2-1. 문자가 동일할 경우 추가, 삭제, 변경을 할 필요가 없다.
        2-2. 따라서 현재 비교하는 문자가 동일하면 두 문자열의 길이인 i와 j를 길이를 1차감해 재귀호출한다.
    
    3. 추가, 삭제, 변경이 되는 경우를 각각 구해야 한다.
        3-1. 추가의 경우 i가 0이 되었을 때 남아있는 j만큼의 길이가 추가되어야 한다. 따라서 i-1으로 재귀호출해야 한다.
        3-2. 삭제의 경우 반대로 j가 0이 되었을 때 i만큼 길이가 삭제되어야 한다. 따라서 j-1로 재귀호출한다.
        3-3. 변경의 경우 문자가 동일한 경우와 같이 해당 문자가 동시에 추가, 삭제에서 빠지도록 i-1, j-1로 재귀호출한다.
        3-4. 이제 이 중 가장 작은 비용을 선택해야 하므로 Math.min으로 최소값을 선택한다.
        3-5. 각 작업이 발생할 때 비용은 1로 모두 동일하므로 return할 때 1을 누적해서 리턴시킨다.
    
    f(ab,cbe)를 재귀호출로 표현하면 아래와 같은 트리로 구성된다.
              /               |               \
          f(a,cbe)         f(ab,cb)           f(a,cb)
        /    |    \           |             /    |    \
    f(cbe) f(a,cb) f(cb)    f(a,c)       f(cb) f(a,c) f(c)
          /   |   \        /   |   \          /  |  \
      f(cb) f(a,c) f(c)  f(c) f(a) f()     f(c) f(a) f()
           /  |  \
        f(c) f(a) f()
    
    시간복잡도
    str1의 길이인 i를 총 3개의 루트로 i가 지수만큼 분할돼서 탐색하게 된다. 중복값이 존재하지 않을 경우 모든 문자를 탐색하므로
    최악의 경우 O(3^i)의 시간복잡도로 증가한다.
*/                                        

//  Tabulation 코드
const costOfEditedDistance = (str1, str2, i, j) => {
    const table = Array.from({length: i+1}, (_, index) => {
        return index 
        ? new Array(j+1).fill(0).fill(index, 0, 1) 
        : Array.from({length: j+1}, (_, cost) => cost);
    });

    for (let i=0; i<str1.length; i++)
        for (let j=0; j<str2.length; j++) {
            
            if (str1[i] === str2[j]) {
                table[i+1][j+1] = table[i][j];
                
            } else table[i+1][j+1] = 
                Math.min(table[i+1][j], table[i][j+1], table[i][j]) + 1;
        }
    return table[i][j];
}
/*
    접근방법
    하나의 최소 분할 단위로 나뉘었을 때 추가, 삭제, 변경에 필요한 비용을 계산해 행렬의 인덱스에 저장할 수 있다.
    tabulation을 활용하면 bottom up을 활용하므로 최소단위인 str1의 0번째 부터 str2와 조합하여 비용을 할당한다.

    한 쪽 문자열이 0일 경우인 최소단위를 구성하기 위해 table을 str1과 str2의 길이 +1을 해서 만든다.
    이제 문자열을 추가, 삭제, 변경하는 3가지 방법으로 테이블에 비용을 직접 할당해 본다.

    [  ''  s  u  n  d  a  y
    '' [0, 1, 2, 3, 4, 5, 6]    // 중복 문자가 없으면 이전 인덱스에서 1씩 증가한다.
    s  [1, 0, 1, 2, 3, 4, 5]    // 중복이 존재하면 문자가 추가되기전 [i-1][j-1]에서 값을 상태이전 한다.
    a  [2, 1, 1, 2, 3, 3, 4]    // 추가, 삭제, 변경 중 가장 비용이 작은 방법을 선택하므로 3가지 루트에서 값을 선택한다.
    t  [3, 2, 2, 2, 3, 4, 4]
    u  [4, 3, 2, 3, 3, 4, 5]
    r  [5, 4, 3, 3, 4, 4, 5]
    d  [6, 5, 4, 4, 3, 4, 5]
    a  [7, 6, 5, 5, 4, 3, 4]
    y  [8, 7, 6, 6, 5, 4, 3]
    ]
    
    수도코드
    1. i+1, j+1의 행렬을 생성한다.
        1-1. i와 j 인덱스가 0인 경우를 제외하고 전부 0값을 할당한다.
        1-2. 인덱스 0번째에 값을 할당해 놓으면 차후 table을 확인할 때 이전 인덱스의 존재여부를 체크할 필요가 없어진다.
        1-3. 우선 i가 0인 행은 j의 길이만큼 수를 누적해서 기록한다.
        1-4. 모든 행의 j가 0인 경우도 이전 i의 0번째에 1을 더해 행렬을 생성한다.
    
    2. 구현된 행렬의 규칙을 찾아 값 할당 점화식을 찾는다. 우선 문자가 동일해 비용이 들지않는 경우이다.
        2-1. i와 j인덱스 각각 문자가 추가되기 이전 비용과 동일하기 때문에 table[i+1][j+1] = table[i][j]가 된다.

    3. 문자가 동일하지 않으면 문자가 추가, 삭제, 변경되는 3가지 방식중 가장 비용이 적게드는 방법을 선택해야 한다.
        3-1. i < j 경우 i가 j만큼 문자를 추가해야 하므로 table[i+1][j+1] = table[i+1][j] + 1
        3-2. i > j 경우 i가 j만큼 문자를 삭제해야 하므로 table[i+1][j+1] = table[i][j+1] + 1
        3-3. 삭제와 추가 두 작업이 필요한 위치에 변경이 가능하면 비용이 1로 처리된다. table[i+1][j+1] = table[i][j] + 1
        3-4. 즉 가장 작은 비용이 계산되도록 가장 최소비용에서 1을 누적한다.

    4. str1과 str2를 이중루프로 비교하면서 i와 j의 인덱스에 값을 할당하고 루프가 종료되고 table[i][j]를 리턴한다.
        
    시간복잡도
    i와 j만큼의 저장공간과 연산회수가 사용되므로 O(i * j)의 시간복잡도를 가진다.
*/

//  공간을 축소한 Tabulation 코드
const costOfEditedDistance = (str1, str2, i, j) => {
    const table = Array.from({length: 2}, (_, index) => {
        return index
        ? new Array(j+1).fill(0)
        : Array.from({length: j+1}, (_, cost) => cost);
    });

    for (let i=0; i<str1.length; i++) {
        let ni = (i+1) % 2, pi = i % 2;

        for (let j=0; j<str2.length; j++) {
            table[ni][0] = i + 1;

            if (str1[i] === str2[j]) {
                table[ni][j+1] = table[pi][j];
                
            } else table[ni][j+1] = 
                Math.min(table[ni][j], table[pi][j+1], table[pi][j]) + 1;
        }
    }
    return table[i%2][j];
}
/*
    접근방법
    비용연산은 최대 두 행의 범위안에서만 발생하므로 전체 행렬이 필요없다.
    
    [  ''  s  u  n  d  a  y
    '' [0, 1, 2, 3, 4, 5, 6] 1번row
    s  [1, 0, 1, 2, 3, 4, 5] 2번row
    ]   
    [  ''  s  u  n  d  a  y
    a  [2, 1, 1, 2, 3, 3, 4] 3번row
    s  [1, 0, 1, 2, 3, 4, 5] 2번row
    ]

    ....

    ]
    [  ''  s  u  n  d  a  y
    d  [6, 5, 4, 4, 3, 4, 5] 7번row
    a  [7, 6, 5, 5, 4, 3, 4] 8번row
    ]
    [  ''  s  u  n  d  a  y
    y  [8, 7, 6, 6, 5, 4, 3] 9번row
    a  [7, 6, 5, 5, 4, 3, 4] 8번row
    ]

    수도코드
    1. 위 아래, 두 행을 번갈아가면서 전, 후 행으로 사용하면 되므로 2행의 행렬을 만들면 된다.
        1-1. 열의 길이 j는 유지하고 첫 행은 빈 문자일 경우의 비용을 계산한다.
        1-2. 두 번째 행부터 전부 0으로 값을 채워서 행렬을 완성한다.
    
    2. 이중루프에서 인덱스 i를 0과 1로 번갈아가면서 전, 후로 사용해야 한다.
        2-1. 현재 인덱스 ni와 이전 인덱스 pi에 각각 (i+1)%2, i%2를 할당한다.
        2-2. j=0일 경우 이전 인덱스를 참고할 수 없으므로 i+1을 할당 시키면 된다.
        2-3. 나머지 로직은 ni와 pi를 각각 [i+1]과 [i]에 활용하면 모든 로직은 이전 코드와 동일하다.
    
    3. 리턴위치는 i%2행의 인덱스에 위치한 값을 리턴하면 된다.

    시간복잡도는 동일하지만 행렬의 크기를 2행만 사용하므로 O(i)의 공간만 사용한다.
*/

//  Memoization 코드
const Matrix = (i, j) => {
    return Array.from({length: i+1}, (_, index) => {
        return index
        ? new Array(j+1).fill(-1).fill(index, 0, 1)
        : Array.from({length: j+1}, (_, cost) => cost);
    });
}
const costOfEditedDistance = (str1, str2, i, j, m = Matrix(i, j)) => {
    if (m[i][j] !== -1) return m[i][j];
    
    if (str1[i-1] === str2[j-1]) {
        return m[i][j] = costOfEditedDistance(str1, str2, i-1, j-1, m);
    
    } else {
        let insert = costOfEditedDistance(str1, str2, i, j-1, m);
        let remove = costOfEditedDistance(str1, str2, i-1, j, m);
        let replace = costOfEditedDistance(str1, str2, i-1, j-1, m);
        return m[i][j] = 1 + Math.min(insert, remove, replace);
    }
}
/*
    접근방법
    기존 재귀코드에서 솔루션을 메모할 행렬을 파라미터로 추가한다.
    재귀호출로 분할될 경우 i와 j의 길이에 해당하는 인덱스에 하위 솔루션이 존재하면 분할할 필요없이 바로 리턴시켜야 한다.
    따라서, 분할되어 리턴될 위치에 값을 메모이제이션 해야 한다.

    행렬과 재귀호출 과정을 도식화 해본다.
    [  ''  c  b  e
    '' [0, 1, 2, 3]    
    a  [1, 1, 2, 3]
    b  [2,-1, 1, 2]
    ]
    f(ab,cbe)가 재귀로 분할되어 m에 저장되는 과정
    m[b][e] = 1 + f(a,cbe), m[a][e] = 1 + f('',cbe), m[''][e] = 3
                                    = 1 + f('',cb), m[''][b] = 2
                                    = 1 + f(a,cb), m[a][b] = 1 + f('',cb) = 2
                                                           = 1 + f('',c), m[''][c] = 1
                                                           = 1 + f(a,c), m[a][c] = 1 + f('',c), m[''][c] = 1
                                                                                 = 1 + f(a,''), m[a][''] = 1
                                                                                 = 1 + f('',''), m[''][''] = 0                                                                      
            = 1 + f(ab, cb), m[b][b] = f(a,c) = 1
            = 1 + f(a, cb) = 2
    
    수도코드
    1. 파라미터로 memoization을 수행할 m에 행렬을 생성해 할당한다.
        1-1. i+1, j+1 길이로 첫 행과 첫열에 각각 길이만큼 수를 누적해 생성하고 나머지 값들은 -1로 채운다.
    
    2. 탈출조건은 i나 j가 0인 경우이므로 행렬에서 해당 값이 -1인지 체크하고 값을 리턴한다.
        2-1. 앞서 첫행과 첫열에 값을 할당해 생성했기 때문에 i, j의 길이에 해당하는 위치의 인덱스값을 리턴하면 된다.
    
    3. 재귀과정은 기존 재귀호출과 같으며 행렬에 결과를 저장하고 리턴시키며, 이 때 재귀호출시 인자로 m(행렬)을 추가한다.

    tabulation과의 차이
    Memoization은 필요한 위치의 값만 연산한다. 예를 들어, m[b][c]의 경우 연산하지 않아 값이 -1 그대로이다.
    Tabultation으로 구현했으면 연산에 필요없는 부분인 m[b][c]도 연산된다.
*/