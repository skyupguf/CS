package Test;
//  두 수의 합 (https://www.acmicpc.net/problem/3273)
/*
*   n개의 서로 다른 양의 정수 a1, a2, ..., an 수열이 있다. ai의 값은 1 <= ai <= 1,000,000보다 작거나 같은 자연수이다.
*   자연수 x가 주어졌을 때, ai + aj = x (1 ≤ i < j ≤ n)을 만족하는 (ai, aj)쌍의 개수를 구하는 프로그램을 작성하시오.
*
*   입력 1. 첫째 줄에 수열의 크기 n이 주어진다.
*       2. 다음 줄에는 수열에 포함되는 수가 주어진다.
*       3. 셋째 줄에는 x가 주어진다. (1 ≤ n ≤ 100000, 1 ≤ x ≤ 2000000)
*
*   출력 1. 문제의 조건을 만족하는 쌍의 개수를 출력한다.
*
*   풀이과정
*       백만개의 수이므로 이중포문을 돌 수 없고 두 수의 합이 타겟인 x가 될 때 카운트를 해야 한다.
*       배열을 정렬해서 0번째와 가장 마지막을 포인터 i와 j로 지정하고 두 인덱스의 값을 더해 sum을 구한다.
*
*       1. x > sum 이면 작은 값인 i를 ++
*       2. x < sum 이면 큰 값인 j를 --
*       3. x == sum 이면 카운트를 하고 i++, j-- 를 모두 해준다.
*
*       3번의 경우 배열이 수열이므로 두 인덱스다 변경해줘도 된다. 만일 동일한 값이 배열안에 있으면 안된다.
* */

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class S_3273 {
    static int[] numbers;

    public static String getNumberOfPairs (int target) {
        int i = 0, j = numbers.length-1;
        int sum = 0;
        int count = 0;

        while (i < j) {
            sum = numbers[i] + numbers[j];
            if (sum > target) {
                j--;
            } else if (sum < target) {
                i++;
            } else {
                count++;
                j--;
                i++;
            }
        }
        return count + "";
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        StringTokenizer st = new StringTokenizer(br.readLine());

        numbers = new int[N];
        for (int i = 0; i < N; i++) {
            numbers[i] = Integer.parseInt(st.nextToken());
        }
        int X = Integer.parseInt(br.readLine());

        Arrays.sort(numbers);
        bw.write(getNumberOfPairs(X));
        bw.flush();
        bw.close();
    }
}
