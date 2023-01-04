package Test;
//  알고리즘 수업 - 피보나치 수 1 (https://www.acmicpc.net/problem/24416)
/*
*   일반 재귀와 Tabulation 을 할용한 피보나치수를 구할 경우 해당 코드의 실행횟수를 출력

    입력
    - 첫째 줄에 n(5 ≤ n ≤ 40)이 주어진다.
    5

    출력
    - 코드1 코드2 실행 횟수를 한 줄에 출력한다.
    5 3

*   풀이
*   1. 코드1의 경우 2이하까지의 최소단위로 분화되므로 피보나치 최종 수 만큼 실행한다.
*   2. DP를 활용하면 첫 1번 2번을 제외하기 때문에 정확히 O(N-2)가 출력되면 된다.
* */

import java.io.*;


public class B_24416 {

    static void fibonacci(int n) {
        int[] fibonacci = new int[n+1];
        fibonacci[1] = 1;
        fibonacci[2] = 1;

        int count = 0;
        for (int i = 3; i <= n; i++) {
            fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
            count++;
        }

        System.out.printf("%d %d", fibonacci[n], count);
    }


    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        fibonacci(N);
    }
}
