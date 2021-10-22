//  문제요약
//  1. 입력받은 두 수 n과 m의 최대공약수(GCF)와 최소공배수(GCM)을 [GCF, GCM] 형태로 리턴하라.
//  2. n = 3, m = 12, return [3, 12] / n = 2, m = 5, return [1, 10]

//  코드#1
const calGcfAndGcm = (n, m) => {
    let GCF, GCM;
    const min = Math.min(n, m), max = Math.max(n, m);

    for(let i=min; i>=1; i--) if(min%i===0 && max%i===0) {
        GCF = i;
        break;
    }
    for(let j=max; j<=min*max; j++) if(i%min===0 && i%max===0) {
        GCM = i;
        break;
    }
    return [GCF, GCM];
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
const calGcfAndGcm = (n, m) => {
    
}
/*
풀이#2
1. 
*/