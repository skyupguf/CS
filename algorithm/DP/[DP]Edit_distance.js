//  문제요약
//  1. 입력으로 주어지는 문자열 str1을 str2로 변환하는데 들어가는 최소 작업의 수를 찾아라.
//  2. 작업의 방법은 총 3가지이며 모든 비용은 동일하다.
//      2-1. insert : str1 = "ca", str2 = "cat" 문자't'를 삽입
//      2-2. replace : str1 = "cat", str2 = "cut" 문자 'a'를 'u'로 변환
//      2-3. remove : str1 = "caty", str2 = "cut" 문자 'y'를 삭제
//  3. str1 = "sunday", str2 = "saturday"가 변환되는 과정은 다음과 같다.
//      3-1. 'un'에서 'n'을 'r'로 replace한다.
//      3-2. 't'와 'a'를 앞쪽에 insert한다.
//      3-3. 총 3번의 최소한의 작업으로 str2를 완성할 수 있다.

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
    
    길이가 다른 경우도 따져보자 ten nine
    insert      replace     remove      cost
    n, i, n, e  0           t, e, n     7   // nineten => nineten => nine
    n, i, n     0           t, n        5   // ninten => ninten => nine
    n, i        n           n           4   // niten => ninen => nine
    e           n, i        0           3   // tene => nine => nine

    위의 예시로 보면 결과적으로 str1에서 최소한의 변경회수로 str2와 동일해지는 경우를 찾아야 한다.
    
    수도코드
    1. 분할의 최소단위는 한 쪽 문자열의 길이가 0인 경우이다. 어느 쪽이 0이던 insert와 remove가 동일한 비용으로 발생한다.
        1-1. str1과 str2의 길이가 다르기 때문에 str1.length가 0이면 str2.length만큼 insert가 되어야 한다.
        1-2. 반대의 경우 str1.length 만큼 remove가 되어야 하므로 탈출 조건을 두 개로 분기해야 한다.
        1-3. 두 문자열의 길이를 i, j라 하면 0인 경우 탈출조건이 되므로 뒤 요소부터 분할해 나가면서 비교해야 한다.
    
    2. 우선 두 문자열의 마지막 인덱스부터 동일성 여부를 판단한다.
        2-1. 문자가 동일할 경우 추가, 삭제, 변경을 할 필요가 없다.
        2-2. 따라서 현재 비교하는 문자가 동일하면 i와 j를 1차감해 재귀호출한다. 
    
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
    const table = [];
    for (let i=0; i<str1.length; i++) {
        let arr = [0];
        for (let j=0; j<str2.length; j++) {
            if (!i && j > 0) arr[j] = arr[j-1] + 1;
        }
        table[i] = arr;
    }

}
/*
    접근방법
    하나의 최소 분할 단위로 나뉘었을 때 추가, 삭제, 변경에 필요한 비용을 계산해 각 인덱스에 저장할 수 있다.
    즉 DP를 활용할 수 있으며, 위 재귀에서 한번 계산된 비용을 i와 j를 이용한 행렬을 통해 저장하여 활용할 수 있다.

    tabulation을 활용하면 bottom up을 활용하므로 최소단위인 str1의 0번째 부터 str2와 조합하여 비용을 할당한다.
    한 쪽 문자열이 0일 경우인 최소단위를 구성하기 위해 table을 str1과 str2의 길이 +1을 해서 만든다.
    이제 문자열을 추가, 삭제, 변경하는 3가지 방법으로 테이블에 비용을 직접 할당해 본다.

    [  ''  s  u  n  d  a  y
    '' [0, 1, 2, 3, 4, 5, 6]  // 동일한 문자가 없으면 비용이 i나 j중 더 작은 값에서 1씩 증가한다.
    s  [1, 0, 1, 2, 3, 4, 5]  // 동일한 문자가 있으면 i와 j의 이전 인덱스의 비용을 상태전이한다. 
    a  [2, 1, 1, 2, 3, 3, 4]  
    t  [3, 2, 2, 2, 3, 4, 4]
    u  [4, 3, 2, 3, 3, 4, 5]
    r  [5, 4, 3, 3, 4, 4, 5]
    d  [6, 5, 4, 4, 3, 4, 5]
    a  [7, 6, 5, 5, 4, 3, 4]
    y  [8, 7, 6, 5, 5, 4, 3]
    ]
    
    수도코드
    1. i+1, j+1의 행렬을 생성한다.
        1-1. i와 j 인덱스가 0인 경우를 제외하고 전부 0값을 할당한다.
        1-2. 인덱스 0번째에 값을 할당해 놓으면 차후 table을 확인할 때 이전 인덱스의 존재여부를 체크할 필요가 없어진다.
        1-3. 우선 i가 0인 행은 j의 길이만큼 수를 누적해서 기록한다.
        1-4. 모든 행의 j가 0인 경우도 이전 i의 0번째에 1을 더해 행렬을 생성한다.
    
    2. str1과 str2를 이중루프로 비교하면서 i와 j의 인덱스에 값을 할당한다.
        2-1. 두 문자가 동일할 경우 이전 인덱스의 값을 그대로 전이한다. [i+1][j+1] = [i][j]
        
    3. 두 문자가 다를 경우 이전의 i와 j의 인덱스가 있는지 판단해야 한다.
        3-1. 한 쪽만 존재할 경우 

    값의 할당 규칙을 찾아보자
    [i][j+1] = [i][j] + 1 or [i+1][j] = [i][j] + 1
    [i+1][j+1] = [i][j]
    1. 문자가 다를 경우
       i를 고정으로 j를 하나 씩 탐색하는데 비교하는 문자열이 다르면서 추가되기 때문에 비용이 1씩 누적된다.
       

    1. 두 문자가 같은 경우 
       문자 s가 만나는 위치 [1][1]은 [0][0]의 값과 같다. 즉 [i+1][j+1] = [i][j]가 된다.
       이전 문자를 변환하는 비용에서 동일한 문자가 추가되어 비용이 증가되지 않으므로 같은 값이 할당되는 것이다.
    
    2. 두 문자가 같은 경우 
       문자 하나가 추가되면서 
    
    

    
*/