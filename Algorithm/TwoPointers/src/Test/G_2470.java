package Test;
//  두 용액 (https://www.acmicpc.net/problem/2470)
/*
*   1 <= 산성용액 값 <= 1,000,000,000  / -1,000,000,000 <= 알칼리성 용액 값 <= -1
*   같은 양의 두 용액을 혼합하여 특성값이 0에 가장 가까운 용액을 만들려고 한다.
*   예를 들어, [-2, 4, -99, -1, 98]이면 -99 + 98 = -1 이 0에 가장 가깝다.
*   용액 종류에 상관없이 섞었을 때 0에 가장 가까운 값이 되는 두 용액을 오름차순으로 찾는 프로그램을 작성하시오.
*
*   입력 1. 첫째 줄에는 2 <= N <= 100,000 이 입력된다.
*       2. 둘째 줄에는 용액의 특성값을 나타내는 N개의 정수가 빈칸을 사이에 두고 주어진다.
*          N개의 용액들의 특성값은 모두 다르고, 산성 용액만으로나 알칼리성 용액만으로 입력이 주어지는 경우도 있을 수 있다.
*
*   출력 1. 첫째 줄에 특성값이 0에 가장 가까운 용액을 만들어내는 두 용액의 특성값을 오름차순으로 출력한다.
*          특성값이 0에 가장 가까운 용액을 만들어내는 경우가 두 개 이상일 경우에는 그 중 아무것이나 하나를 출력한다.
*
* */

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;


public class G_2470 {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());

        long[] values = new long[N];
        for (int i = 0; i < N; i++) {
            values[i] = Long.parseLong(st.nextToken());
        }
        Arrays.sort(values);

        int left = 0;
        int right = values.length - 1;

        long[] p = new long[2];
        long min = Integer.MAX_VALUE;

        while (left < right) {
            long sum = values[left] + values[right];

            if (min > Math.abs(sum)) {
                min = Math.abs(sum);
                p[0] = values[left];
                p[1] = values[right];
            }

            if (sum == 0) { break; }
            if (sum < 0) { left++; }
            else { right--; }
        }
        bw.write(p[0] + " " + p[1]);
        bw.close();
    }
}
