package Test;
//  부분합 (https://www.acmicpc.net/problem/1806)
/*
*   10,000 이하의 자연수로 이루어진 길이 N짜리 수열이 주어진다.
*   이 수열에서 연속된 수들의 부분합 중에 그 합이 S 이상이 되는 것 중, 가장 짧은 것의 길이를 구하는 프로그램을 작성하시오.
*
*   입력 1. 첫째 줄에 N (10 ≤ N < 100,000)과 S (0 < S ≤ 100,000,000)가 주어진다.
*       2. 둘째 줄에는 수열이 주어진다. 수열의 각 원소는 공백으로 구분되어져 있으며, 10,000이하의 자연수이다.
*
*   출력 1. 첫째 줄에 구하고자 하는 최소의 길이를 출력한다. 만일 그러한 합을 만드는 것이 불가능하다면 0을 출력하면 된다.
*
*   풀이과정
*       인덱스처리를 잘못하면 계속 꼬인다.
*       1. 누적시에는 타겟인 S보다 커질 때 까지 계산 후 p2를 누적시킨다.
*       2. 차감시에는 타겟인 S보다 작아 지기전 까지 계산하고 p1을 차감시킨다.
*       이렇게 하면 타겟 S 이상이면서 가장 가까운 수가 되고 인덱스가 꼬이지 않는다.
* */

import java.io.*;
import java.util.StringTokenizer;


public class G_1806 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st1 = new StringTokenizer(br.readLine());
        StringTokenizer st2 = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st1.nextToken());
        int S = Integer.parseInt(st1.nextToken());

        int[] numbers = new int[N];
        for (int i = 0; i < N; i++) {
            numbers[i] = Integer.parseInt(st2.nextToken());
        }

        int p1 = 0;
        int p2 = p1;
        int sum = 0;
        int minLen = N + 1;

        while (p1 <= p2 && p2 < N) {
            while (sum < S && p2 < N) {
                sum += numbers[p2++];
            }
            while (sum - numbers[p1] >= S && p1 < p2) {
                sum -= numbers[p1++];
            }
            if (sum >= S) {
                minLen = Math.min(minLen, p2 - p1);
                sum -= numbers[p1++];
            }
        }
        System.out.println(minLen <= N ? minLen : 0);
    }
}
