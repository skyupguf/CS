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
*       연속된 부분합이 타겟값과 같아지는 최소 구간을 구하면 되므로 타겟을 설정하고 타겟에 크거나 작을 때 포인터를 이동시키면 된다.
*
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
