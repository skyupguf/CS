// 문제요약
// 1. 길이가 짝수이며 1~10,000사이인 nums배열의 요소들은 1~200,000 사이의 자연수이며 중복될 수 있다.
// 2. nums의 요소들 중 nums.length/2 개를 뽑는데, 중복되는 요소를 같이 뽑을 수 없다.
// 3. 이 때, 한번에 뽑을 수 있는 최대 요소의 개수는?
// 4. nums = [3,1,2,3] return 2 / nums = [3,3,3,2,2,4] return 3 / nums = [3,3,3,2,2,2] return 2

//  코드
const findPossibleMaxEl = (nums) => {
    const numsLeng = nums.length / 2;
    const dNums = [...new Set(nums)];
    return dNums.length > numsLeng ? numsLeng : dNums.length; 
}
/*
풀이
1. 배열길이 절반만큼의 요소를 뽑는데 경우의 수가 아닌 한번에 뽑을 수 있는 요소가 몇개인지 묻는것
2. 배열안의 요소가 어떻게 되든 한번에 뽑을 수 있는 최대는 배열길이/2를 넘지 못한다.
3. 즉, 배열안에 중복요소가 있어서 배열길이/2보다 뽑을 수 있는 요소의 수가 큰가 작은가를 묻는것
4. 분기를 통해'1.중복을 제거 배열길이'> '2.배열길이/2'면 2를 리턴 아니면 1을 리턴하면 된다.

시간복잡도
객체로 생성하고 spread syntax를 사용하면서 O(N)
*/