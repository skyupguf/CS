package Test;
//  쉬운 계단 수 (https://www.acmicpc.net/problem/10844)
/*
*   45656과 같이 인접한 모든 자리의 차이가 1인 수를 계단 수라고 한다.
*   N이 주어질 때, 길이가 N인 계단 수가 총 몇 개 있는지 구해보자. 0으로 시작하는 수는 계단수가 아니다.

    조건
    - 첫째 줄에 N이 입력된다. (1 <= N <= 100)
    - 첫째 줄에 1,000,000,000으로 나눈 나머지를 정수로 출력한다.

    입출력 예시
    1. Input : 1, Output : 9
    2. Input : 2, Output : 17
    3. Input : 3, Output : 32
    4. Input : 4, Output : 61
    5. Input : 5, Output : 116

*   풀이
*   N = 1 부터 증가할 때 마다 다음과 같이 수를 만들 수 있다.
*   0   1   2   3   4   5   6   7   8   9
*
*   N = 2
*   10  12  21  32  43  54  65  76  87  98
*           23  34  45  56  67  78  89
*
*   N = 3
*   101 210 121 232 343 454 565 676 787 898
*           123 234 345 456 567 678 789 987
*           321 323 432 543 654 765 876 989
*                   434 545 656 767 878

        0   1   2   3   4   5   6   7   8   9   10
    0   0   0   0   0   0   0   0   0   0   0   0
    1   0   1   1   1   1   1   1   1   1   1   0
    2   1   1   2   2   2   2   2   2   2   1   0
    3   1   1   3   4   4   4   4   4   4   3   0
    4   1   1   5   7   8   8   8   8   8   8
    5   1   1   7  13  15  16  16  16  16  16

*   점화식을 세워보면
*   i가 2일 때부터 j가 1에서 시작해 dp[i][j] = dp[i-1][j-1] + dp[i-1][j]가 된다.
*
* */

import java.io.*;

public class S_10844 {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//        int N = Integer.parseInt(br.readLine());
        int n = 5;
//        int[][] dp = new int[N+1][10];

//        for (int i = 0; i < 10; i++) {
//            dp[1][i] = i;
//        }
//
//        for (int i = 2; i <= N; i++) {
//            for (int j = 1; j < 10; j++) {
//                dp[i][j] = (dp[i-1][j-1] + dp[i-1][j]) % 1000000000;
//            }
//        }
//        System.out.println(dp[N][9]);
        long[][] dp = new long[n+1][11];
        for (int i = 1; i <= 9; i++) {
            dp[1][i] = 1;
        }

        for (int i = 2; i <= n; i++) {
            dp[i][0] = dp[i - 1][1];
            for (int j = 1; j < 10; j++) {
                dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % 1000000000;
            }
        }

        long sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += dp[n][i];
        }
        System.out.println(sum % 1000000000);
    }
}
