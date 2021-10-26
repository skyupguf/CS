//  문제요약
//  1. 입력받은 두 수 n과 m의 최대 공약수(GCD)와 최소 공배수(LCM)을 [GCD, LCM] 형태로 리턴하라.
//  2. n = 3, m = 12, return [3, 12] / n = 2, m = 5, return [1, 10]

//  코드#1
const calGcdAndLcm = (n, m) => {
    let GCD, LCM;
    const min = Math.min(n, m), max = Math.max(n, m);

    for(let i=min; i>=1; i--) if(min%i===0 && max%i===0) {
        GCD = i;
        break;
    }
    for(let j=max; j<=min*max; j++) if(i%min===0 && i%max===0) {
        LCM = i;
        break;
    }
    return [GCD, LCM];
}
/*
    풀이#1
    1. 두 수를 나눌 수 있는 최대 값이 최대 공약수, 두 수를 약수로 가지는 최소 값이 최소 공배수
    2. 즉 최대공약수는 두 수 중 작은 수도 나눌 수 있어야 하므로 최대 작은 수를 넘을 수 없다.
    3. 최소공배수는 두 수를 약수로 가져야 하므로 두 수의 곱을 넘지 못하고 큰 수 보다 작을 수 없다.
    4. min값과 max값으로 나누고 최대공약수는 i를 min부터 1까지 순회하면서 min과 max를 나눌 수 있는 수를 찾고 break
    5. 최소공배수는 i를 max부터 두수의 곲까지 순회하고 두 수로 i가 나눠지는 수를 찾고 break

    시간복잡도#1
    O(N)
*/

//  코드#2
const GCD = (n, m) => m ? GCD(m, n % m) : n;
const calGcdLcm = (n, m) => [GCD(n, m), n*m/GCD(n, m)];
/*
    풀이#2
    1. 최대공약수를 유클리드 호제법을 활용해 n % m 값이 0이 될 때 까지 재귀호출 한다.
    2. n과 m에서 더 큰 수를 가릴 필요 없이 n을 m인자로 호출하고 m을 n % m 인자로 호출한다.
    3. 따라서, m이 0에 도달할 경우 n이 최대 공약수가 된다.
    4. 최소 공배수는 두 수의 최대 공약수가 두 수의 곱의 약수가 되므로 두 수의 곱 / 최대공약수를 하면된다.
    
    시간복잡도#2
    m이 0이 될 때까지 호출되지만 상수연산이 되므로 O(1) 이다.
*/