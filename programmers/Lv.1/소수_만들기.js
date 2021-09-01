// 문제요약
// 1. 길이가 3~50이고 중복이 없는 1~1,000의 자연수를 요소로 가진 배열 nums를 입력으로 받는다.
// 2. nums의 서로 다른 요소 3개를 조합해 소수가 되는 모든 경우를 구하라.

//  코드
const countPrime = (arr) => {
    let count = 0;
    arr.forEach(e => {
        let check = true;
        for(let i=3; i<=Math.sqrt(e); i+=2) {
            if(e % i === 0) {
                check = false;
                break;
            }
        } if(check) count++;
    });
    return count;
}

const makePrimeNum = (nums) => {
    const odds = [], evens = [], input = []
    nums.forEach(e => e%2 === 0 ? evens.push(e) : odds.push(e));
    for(let i=0; i<odds.length; i++) {
        for(let j=i+1; j<odds.length; j++) {
            for(let k=j+1; k<odds.length; k++) {
                input.push(odds[i]+odds[j]+odds[k]);
            }
        }
        for(let l=0; l<evens.length; l++) {
            for(let m=l+1; m<evens.length; m++) {
                input.push(odds[i]+evens[l]+evens[m]);
            }
        }
    }
    return countPrime(input);
}
/*
    풀이
    1. 소수가 만들어질때 누적할 count를 선언하고 nums배열에서 요소를 하나씩 추출해 소수를 만들 묶음을 구한다.
    2. 소수는 2를 제외하고 모두 홀수고 nums의 최소 길이는 3이며 중복없는 자연수 이기 때문에 홀수만 구하면 된다.
    3. 홀수 + 짝수 + 짝수 = 홀수 / 홀수 + 홀수 + 홀수 = 홀수
    4. nums에서 짝수와 홀수를 분리하고 3중 루프를 통해 3번과 같이 두개로 분리해 홀수만 생성해서 새배열에 삽입한다.
    5. 두 방법 모두 홀수배열을 포함하고 있으니 홀수 배열을 고정하고 나머지 이중포문을 통해 홀수 값을 구한다.
    6. 구해진 홀수배열을 제곱근을 활용한 소수찾기로 연산을 단축하여 소수일 경우 카운트를 하고 반환한다.

    시간복잡도
    nums배열의 요소가 무작위로 존재하기 때문에 짝수와 홀수로 나누는 경우 nums의 모든 N을 연산하진 않기 때문에
    실제 O(N^3)보다 더 적은 연산이 발생할 것이다.
*/