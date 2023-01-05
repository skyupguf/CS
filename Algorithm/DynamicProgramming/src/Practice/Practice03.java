package Practice;
// Practice3
// 수열 arr 이 주어졌을 때,
// 부분 수열 중 증가하는 부분이 가장 긴 길이를 출력하는 프로그램을 작성하세요.

// 입출력 예시
// arr: {10, 20, 30, 10, 50, 10}
// 출력: 4

/*
*   풀이
*   idx 0   1   2   3   4   5
*   arr 10  20  30  10  50  10
*   dp  1   2   3   1   4   1
*
*   최장 부분 수열을 dp로 구현하면 위와 같다.
*   dp 배열은 arr의 해당하는 위치가 증가하는 부분수열인지 기록해 두는 증가카운트 역할을 한다.
*
*   조건을 분석하면
*   1. arr[i-1] >= arr[i]라면 증가하지 않으므로 dp[i] = 1 이 된다.
*   2. arr[i-1] < arr[i]라면 증가하는 수열인데 이 때, 증가 카운트를 기록하는 조건은 2가지로 나뉜다.
*       2-1. dp에 가장 긴 증가카운트가 기록된 idx의 arr값이 현재 arr[i]보다 작으면 dp[i] = dp[idx] + 1이 된다.
*       2-2. 반대로 현재 arr[i]가 더 작으면 idx의 위치에 비해 증가하지 않으므로 dp[i] = dp[i-1] + 1이 된다.
*
*   dp의 가장 큰 증가카운트가 이전에 기로해둔 idx 인지 현재 i인지 비교해서 더 큰 경우로 idx를 갱신한다.
* */

public class Practice03 {

    public static int solution(int[] arr) {
        int[] dp = new int[arr.length];
        dp[0] = 1;

        int longIdx = 0;
        for (int i = 1; i < arr.length; i++) {

            if (arr[i-1] < arr[i]) {
                dp[i] = arr[longIdx] < arr[i] ? dp[longIdx] + 1 : dp[i-1] + 1;
            } else {
                dp[i] = 1;
            }
            longIdx = dp[longIdx] < dp[i] ? i : longIdx;
        }
        return dp[longIdx];
    }


    public static void main(String[] args) {
        // Test code
        int[] arr = {10, 20, 30, 10, 50, 10};       // 4
        System.out.println(solution(arr));

        arr = new int[]{70, 80, 10, 20, 30, 40};    // 4
        System.out.println(solution(arr));

        arr = new int[]{50, 60, 40, 30, 20, 10};    // 2
        System.out.println(solution(arr));

        arr = new int[]{60, 50, 40, 30, 20, 10};    // 1
        System.out.println(solution(arr));
    }
}
