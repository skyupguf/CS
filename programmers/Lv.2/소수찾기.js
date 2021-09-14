const isPrime = (num) => {
    const sqrt = Math.sqrt(num);
    for(let i=2; i<=sqrt; i++) {
        if(num % i === 0) return false;
    }
    return true;
}

const solution = (numbers) => {
    let count = 0;
    numbers = numbers.split('');
    const check = {};
    const setPermutation = (arr, fixed) => {
        if(arr.length === 0) return;
        for(let i=0; i<arr.length; i++) {
            const cur = fixed + arr[i];
            const num = parseInt(cur);
            const parts = arr.slice();
            parts.splice(i, 1);
            if(check[num]===undefined && num>1 && isPrime(num)) count++;
            check[num] = num;
            setPermutation(parts, cur);
        }
    }
    setPermutation(numbers, '');
    return count;
}

/* 
문제요약
1. numbers에 들어오는 인자는 숫자 문자열 ex)'17'
2. 숫자 문자열의 각 요소를 동일한 요소의 중복없이 개수 상관없이 조합할 수 있음 ex)'1', '7', '17', '71'
3. 이 조합중 소수의 개수를 구하라.

풀이
1. 나올 수 있는 모든 조합을 탐색해야 하므로 완전탐색이 필요하다.
2. 숫자 문자열의 순서에 따라 수가 달라지기 때문에 순열을 사용해야 하며, 특정 r개가 주어지지 않았으므로 변형이 필요하다.
3. 각 요소를 추출하기 쉽게 split으로 배열화 하고 순열을 구하기 위해 함수를 선언한다.
4. 재귀호출을 위해 arr의 길이만큼 탈출조건을 설정하고 arr 전체요소를 순회 시킨다.
5. r개가 특정되어 있지 않아, 탈출조건이 아닌 fixed 값이 하나의 경우가 되므로, fixed를 바로 소수체크 한다.
6. fixed를 제외한 배열의 요소들이 다음 재귀호출되면서 fixed에 더해가면서 1가지의 경우를 완성하고 바로 소수체크 한다.

에러핸들링
1. '011' 과 같은 숫자 문자열이 오면 11과 101등의 소수가 중복 발생한다.
2. 한번 생성된 수인지 확인하기 위한 check 객체를 생성한다.

시간복잡도
순열을 통한 완전탐색이므로 O(n!)의 시간복잡도를 가진다.
*/