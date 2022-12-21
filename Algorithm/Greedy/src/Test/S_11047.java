package Test;
//  동전0 (https://www.acmicpc.net/problem/11047)
/*
*   동전은 총 N 종류이고, 각각의 동전을 매우 많이 가지고 있다.
*   동전을 적절히 사용해서 그 가치의 합을 K로 만들려고 한다.
*   이때 필요한 동전 개수의 최솟값을 구하는 프로그램을 작성하시오.
*
*   입력 1. 첫째 줄에 N과 K가 주어진다. (1 ≤ N ≤ 10, 1 ≤ K ≤ 100,000,000)
*       2. 둘째 줄부터 N개의 줄에 동전의 가치 Ai가 오름차순으로 주어진다. (1 ≤ Ai ≤ 1,000,000, A1 = 1, i ≥ 2인 경우에 Ai는 Ai-1의 배수)
*
*   출력 1. 첫째 줄에 K원을 만드는데 필요한 동전 개수의 최솟값을 출력한다.
*
*   풀이과정
*   입력받은 N만큼 배열에 동전들을 우선 내림차순 정렬한다.
*   그래야 가장 큰 동전을 먼저 계산할 수 있으므로 동전 개수를 줄일 수 있다.
*
* */

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;


public class S_11047 {
    static Integer[] coins;

    public static String solution (int target) {
        int total = 0;

        for (Integer coin : coins) {
            if (target < coin) { continue; }
            int count = target / (int)coin;
            total += count;
            target %= coin;
        }
        return total + "";
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        int N = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());

        coins = new Integer[N];
        for (int i = 0; i < N; i++) {
            coins[i] = Integer.parseInt(br.readLine());
        }
        Arrays.sort(coins, (x, y) -> y - x);

        bw.write(solution(K));
        bw.flush();
        bw.close();
    }
}
