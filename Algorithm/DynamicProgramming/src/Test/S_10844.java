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
    3. Input : 3, Output :

*   풀이
*   N = 1 일 경우 1, 2, 3, 4, 5, 6, 7, 8, 9
*   N = 2 일 경우 01은 불가능 10 / 12, 21 / 23, 32 / 34, 43 / 45, 54 / 56, 65 / 67, 76 / 78, 87 / 89, 98
*   N = 3 101 / 121, 210, 212 / 123, 232, 321, 323 / 234, 343, 432, 434 /..... 789, 898, 987, 989
*   N = 4 1010 / 1012, 1210, 1212, 2101, 2121 / 1232, 2123, 2321, 2323, 3210, 3212, 3232
*         1234, 2343, 3234, 3432, 3434, 4321, 4323, 4343....
        0   1   2   3   4   5   6   7   8   9
    0   0   0   0   0   0   0   0   0   0   0
    1   0   1   2   3   4   5   6   7   8   9
    2   0   1   3   5   7   9   11  13  15  17
    3   0   1   4   8   12  16  20  24  28  32
    4   0   1   6   13  21  29  37  45  53  61

*   점화식을 세워보면
*
* */

import java.io.*;

public class S_10844 {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        long[][] dp = new long[N+1][10];

        for (int i = 1; i < 10; i++) {
            dp[1][i] = 1;
        }

        for (int i = 2; i <= N; i++) {
            for (int j = 0; j < 10; j++) {

                if (j == 0) {
                    dp[i][j] = dp[i - 1][j + 1] % 1000000000;
                } else if (j == 9) {
                    dp[i][j] = dp[i - 1][j - 1] % 1000000000;
                } else {
                    dp[i][j] = (dp[i - 1][j - 1] + dp[i - 1][j + 1]) % 1000000000;
                }
            }
        }
        long result = 0;
        for (int i = 0; i < 10; i++) {
            result += dp[N][i];
        }
        System.out.println(result);
    }
}
