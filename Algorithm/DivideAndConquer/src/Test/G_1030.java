package Test;
//  프렉탈 평면 (https://www.acmicpc.net/problem/1030)
/*
*   프렉탈 평면은 N * N 사각형에서 시간이 1씩 증가할 때 마다 N^단위시간으로 증가하는 사각형이다.
*   만약 나누어진 정사각형이 흰색이라면 가운데 K×K 정사각형이 검정색으로 채워진다.
*   예를 들어, N=3, K=1이라면, 시간 1에 3×3 정사각형이 되고 가운데 1*1의 정사각형이 검은색이 된다.
*   시간 2때 9×9 정사각형이 되고, 17개는 검정이고, 나머지는 흰색이다.
*   s, N, K, R1, R2, C1, C2가 주어질 때, 시간 s일 때, R1행 C1열부터 R2행 C2열까지의 모습을 출력하는 프로그램을 작성하시오.

    입력
    - 첫째 줄에 7개의 정수 s, N, K, R1, R2, C1, C2가 주어진다.

    출력
    - 첫째 줄에 문제의 정답을 출력한다. 첫째 줄에 R1행의 모습을 출력하고 이런 식으로 총 R2-R1+1개의 줄에 출력하면 된다.
      각 행의 모습을 출력할 때, C1열부터 C2열까지 차례대로 흰색이면 숫자 '0' 검정이면 숫자 '1'을 출력한다. 숫자 사이에 공백을 넣으면 안 된다.

*   접근방법
*   각 조건을 분석해 보면
*   - 0 ≤ s ≤ 10                  : s는 시간으로, N을 N^s 로 증가시킨다.
*   - 3 ≤ N ≤ 8                   : N은 N * N 행렬의 초기값
*   - 1 ≤ K ≤ N - 2               : K는 K * K 행렬의 초기값으로 N보다 2작다.
*   - 0 ≤ R1, R2, C1, C2 ≤ N^s-1  : (R1, C1)부터 (R2, C2)까지 범위이며 행렬범위 N을 넘지 못한다.
*   - R1 ≤ R2 ≤ R1 + 49           : N이 최대 8이므로 인덱스로 보면 R2가 R1 + 49를 넘어선 안된다.
*   - C1 ≤ C2 ≤ C1 + 49           :                         //
* */

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;


public class G_1030 {
    static int s, n, k, size;
    static int r1, r2, c1, c2;
    static StringBuilder result;


    static void makeFractal() {
        result = new StringBuilder();

        if (s == 0) {
            System.out.println(0);

        } else {
            for (int i = r1; i <= r2; i++) {
                for (int j = c1; j <= c2; j++) {
                    colorBlack(size, i, j);
                }
                result.append("\n");
            }
            System.out.println(result);
        }
    }


    static void colorBlack(int size, int x, int y) {
        if (size == 1) {
            result.append(0);
            return;
        }
        int divide = size / n;

        if (x >= divide * (n - k) / 2 && x < divide * (n + k) / 2 &&
                y >= divide * (n - k) / 2 && y < divide * (n + k) / 2) {
            result.append(1);
            return;
        }
        colorBlack(divide, x % divide, y % divide);
    }


    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        s = Integer.parseInt(st.nextToken());
        n = Integer.parseInt(st.nextToken());
        k = Integer.parseInt(st.nextToken());
        size = (int)Math.pow(n, s);

        r1 = Integer.parseInt(st.nextToken());
        r2 = Integer.parseInt(st.nextToken());
        c1 = Integer.parseInt(st.nextToken());
        c2 = Integer.parseInt(st.nextToken());

        makeFractal();
    }
}
