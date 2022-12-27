package Test;
//  종이의 개수 (https://www.acmicpc.net/problem/1780)
/*
*   N × N 크기의 종이 행렬의 각 칸에는 -1, 0, 1 중 하나가 저장되어 있다.
*   만약 종이가 모두 같은 수로 되어 있다면 이 종이를 그대로 사용한다.
*   다른 수라면 종이를 같은 크기의 종이 9개로 자르고, 각각의 잘린 종이에 대해서 위 과정을 반복한다.
*   이와 같이 종이를 잘랐을 때, -1로만 채워진 종이의 개수, 0으로만 채워진 종이의 개수, 1로만 채워진 종이의 개수를 구하는 프로그램을 작성하라.

    입력
    1. 첫째 줄에 N(1 ≤ N ≤ 3^7, N은 3^k 꼴)이 주어진다.
    2. 다음 N개의 줄에는 N개의 정수로 행렬이 주어진다.

    9
    0 0 0 1 1 1 -1 -1 -1
    0 0 0 1 1 1 -1 -1 -1
    0 0 0 1 1 1 -1 -1 -1
    1 1 1 0 0 0 0 0 0
    1 1 1 0 0 0 0 0 0
    1 1 1 0 0 0 0 0 0
    0 1 -1 0 1 -1 0 1 -1
    0 -1 1 0 1 -1 0 1 -1
    0 1 -1 1 0 -1 0 1 -1

    출력
    1. 첫째 줄에 -1로만 채워진 종이의 개수
    2. 둘째 줄에 0으로만 채워진 종이의 개수
    3. 셋째 줄에 1로만 채워진 종이의 개수

    10
    12
    11

*   풀이과정
*   쿼드트리를 응용한 문제로 종이를 9칸 씩 나눴을 때 분할정복을 하는 방법이다.
*   9칸 재귀를 하는 방법은 아래와 같다.
*   third = size / 3
*   1. dividePaper(row, col, third)
*   2. dividePaper(row, col + third, third)
*   3. dividePaper(row, col + third + third, third)
*   4. dividePaper(row + third, col, third)
*   5. dividePaper(row + third, col + third, third)
*   6. dividePaper(row + third, col + third + third, third)
*   7. dividePaper(row + third + third, col, third)
*   8. dividePaper(row + third + third, col + third, third)
*   9. dividePaper(row + third + third, col + third + third, third)
*
*   이를 반복문으로 하면 이중 for 문으로 i < 3, j < 3 을 루프하면서 재귀호출한다.
*   dividePaper(row + third * i, col + third * i)
* */

import java.io.*;
import java.util.StringTokenizer;


public class S_1780 {
    static int[][] paper;
    static int[] count = new int[3];

    static void dividePaper (int row, int col, int size) {
        if (sameChecker(row, col, size)) {
            count[paper[row][col] + 1]++;
            return;
        }

        int third = size / 3;

        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                dividePaper(row + third * i, col + third * j, third);
            }
        }
    }

    static boolean sameChecker (int row, int col, int size) {
        int standard = paper[row][col];

        for (int i = row; i < row + size; i++) {
            for (int j = col; j < col + size; j++) {
                if (standard != paper[i][j]) {
                    return false;
                }
            }
        }
        return true;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        paper = new int[N][N];

        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");

            for (int j = 0; j < N; j++) {
                paper[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        dividePaper(0, 0, N);

        for (int num : count) {
            bw.write(num + "\n");
        }
    }
}
