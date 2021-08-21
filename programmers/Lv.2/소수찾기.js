const isPrime = (number) => {
    const sqrt = Math.sqrt(number);
    for(let i=2; i<=sqrt; i++) {
        if(number % i === 0) return false;
    }
    return true;
}

const solution = (numbers) => {
    let count = 0;
    const setPermutation = (arr, fixed) => {
        if(arr.length >= 1) {
            for (let i=0; i<arr.length; i++) {
                const tail = arr.slice();
                const head = fixed + arr[i];
                tail.splice(i, 1);
                if(isPrime(parseInt(head))) count++;
                setPermutation(tail, head);
            }
        }
    }
    setPermutation(numbers, '');
    return count;
}


/*
문제요약
1. numbers배열의 모든 요소를 이용해 만들어 질 수 있는 소수의 개수 리턴

풀이
[1, 7]으로는 소수 [7, 17, 71]
1. numbers의 배열에 순서가 중요하지 않으면서 모든 요소를 완전탐색해야 하므로 순열을 이용한다.
2. 
*/