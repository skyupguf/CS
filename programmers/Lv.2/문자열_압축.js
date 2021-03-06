//  문제요약
//  1. 입력인자 s는 알파벳 소문자이며 1~1,000의 길이를 갖는다. 그리고 이 문자열을 다음과 같이 압축한다.
//  2. 문자열 하나의 단위를 s1이라 한다면 "aabbaccc"의 경우 s1으로 압축하면 "2a2ba3c" 가 된다.
//  3. "ababcdcdababcdcd"의 경우는 s1으로 압축하면 비효율적이므로 s2로 하면 "2ab2cd2ab2cd"가 되며 s8로 하면 "2ababcdcd"가 된다.
//  4. 위 처럼 압축력이 더 높은 방법으로 최소한의 길이로 압축된 문자열의 길이를 리턴하라.
//  5. 유의사항으로 모든 문자열은 주어진 단위만큼 동일하게 나눠져야 한다.
//  6. "xababcdcdababcdcd"는 s8인 x/ababcdcd/ababcdcd 로 압축될 수 없다, 앞 문자부터 차례대로 압축해야 한다.

//  코드
const makeCompressedStr = (s) => {
    const comps = [s.length];
    for(let i=1; i<=s.length/2; i++) {
        let cnt = 1, str = '';
            
        for(let j=0; j<s.length; j+=i) {
            const str1 = s.substring(j, j+i);
            const str2 = s.substring(j+i, j+i*2);
            if(str1 === str2) cnt++;
            else {
                cnt > 1 ? str += (cnt+str1) : str += str1;
                cnt = 1;
            }
        } comps.push(str.length);   
    }
    return Math.min(...comps);
}
/*
    풀이
    1. 가능한 최대압축단위를 찾기 위해서 모든 문자열을 압축해서 만들고 비교해야 하므로 완전탐색이 필요하다.
    2. 압축할 단위를 설정하고 문자열을 압축한 뒤 압축이 가능하면 압축된 문자열을 저장할 배열에 삽입한다.
    3. 압축할 단위를 설정할 루프는 최대 문자열의 절반에 해당하므로 s.length/2 미만으로 순회한다.
    4. 두 번째루프에서 첫 루프에서 정한 단위만큼 문자열을 비교하기 때문에 첫i 만큼 j를 증가시킨다.
    5. 문자열을 비교하기전에 우선 문자열 길이가 해당 단위로 나누어 떨어지지 않으면 해당 루프를 종료시킨다.
    6. 문자열을 비교할 두 변수를 선언하고 문자열을 단위만큼 할당해서 비교하고 동일한 경우 cnt에 누적한다.
    7. 문자열이 서로 다르고 cnt>1이면 cnt+비교문자열을 str에 누적, 아니면 비교문자열만 누적, cnt=1로 초기화한다.
    8. 이중포문이 종료되면 완성된 문자열의 길이를 비교하기 위한 배열에 삽입한다.
    9. 루프 종료 후 가장 짧은 길이의 요소를 리턴한다.

    에러핸들링
    1. 모든 문자열이 정해진 단위로 잘라져야 하는줄 알고 이중for문 앞에 진입조건을 만들었다.
    2. comp배열에 push여부를 결정하는 check = flase 변수와 if(!(s.length&i)) 를 제거해서 해결

    시간복잡도
    단위루프 n/2와 비교루프 n이 이중루프 구조 => O(N^2/2)
*/