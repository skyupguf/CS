package Test;
//  행렬 곱셈 (https://www.acmicpc.net/problem/2740)
/*
*   N * M 행렬 A와 M * K 행렬 B가 주어졌을 때, 두 행렬을 곱하는 프로그램을 작성하시오.

    입력
    1. 첫째 줄에 행렬 A의 크기 N 과 M이 주어진다.
    2. 둘째 줄부터 N개의 줄에 행렬 A의 원소 M개가 순서대로 주어진다.
    3. 그 다음 줄에는 행렬 B의 크기 M과 K가 주어진다.
    4. 이어서 M개의 줄에 행렬 B의 원소 K개가 차례대로 주어진다.
    * N과 M, 그리고 K는 100보다 작거나 같고, 행렬의 원소는 절댓값이 100보다 작거나 같은 정수이다.

    3 2
    1 2
    3 4
    5 6
    2 3
    -1 -2 0
    0 0 3

    출력
    1. 첫째 줄부터 N개의 줄에 행렬 A와 B를 곱한 행렬을 출력한다. 행렬의 각 원소는 공백으로 구분한다.

    -1 -2 6
    -3 -6 12
    -5 -10 18

*   풀이과정
*   행렬곱은 (앞 행렬의 행의 수) * (뒤 행렬의 열의 수) 즉, 앞 뒤 행렬의 행과 열이 일치해야 한다.
*   그리고 결과는 n * m과 m * k 면 n * k의 크기가 된다.
*
*   입력 예시를 풀이해보면
*   A         B
*   [1, 2]    [-1, -2, 0]
*   [3, 4]    [0, 0, 3]
*   [5, 6]
*
*   int[][] sum = new int[Arow][Bcol]
*
*   sum[0][0] = (A[0][0] * B[0][0]) + (A[0][1] * B[1][0])
*   sum[0][1] = (A[0][0] * B[0][1]) + (A[0][1] * B[1][1])
*   sum[0][2] = (A[0][0] * B[0][2]) + (A[0][1] * B[1][2])
*
*   sum[1][0] = (A[1][0] * B[0][0]) + (A[1][1] * B[1][0])
*   sum[1][1] = (A[1][0] * B[0][1]) + (A[1][1] * B[1][1])
*   sum[1][2] = (A[1][0] * B[0][2]) + (A[1][1] * B[1][2])
*
*   sum[2][0] = (A[2][0] * B[0][0]) + (A[2][1] * B[1][0])
*   sum[2][1] = (A[2][0] * B[0][1]) + (A[2][1] * B[1][1])
*   sum[2][2] = (A[2][0] * B[0][2]) + (A[2][1] * B[1][2])
*
*   [-1, -2, 6]
*   [-3, -6, 12]
*   [-5, -10, 18]
* */

import java.io.*;
import java.util.StringTokenizer;


public class S_2470 {
    static int[][] A;
    static int[][] B;
    static int x, y, z;
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));


    static int[][] multipleMatrix () {
        int[][] result = new int[x][y];

        for (int i = 0; i < x; i++) {
            for (int j = 0; j < y; j++) {
                for (int k = 0; k < z; k++) {
                    result[i][j] += A[i][k] * B[k][j];
                }
            }
        }
        return result;
    }


    static int[][] createMatrix (int row, int col) throws IOException {
        int[][] matrix = new int[row][col];

        for (int i = 0; i < row; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());

            for (int j = 0; j < col; j++) {
                matrix[i][j] = Integer.parseInt(st.nextToken());
            }
        }
        return matrix;
    }


    public static void main(String[] args) throws IOException {

        for (int i = 0; i < 2; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int row = Integer.parseInt(st.nextToken());
            int col = Integer.parseInt(st.nextToken());

            if (i == 0) {
                A = createMatrix(row, col);
                x = row;
                z = col;
            } else {
                B = createMatrix(row, col);
                y = col;
            }
        }

        for (int[] row : multipleMatrix()) {
            StringBuilder sb = new StringBuilder();

            for (int num : row) {
                sb.append(num);
                sb.append(" ");
            }
            sb.delete(sb.length() - 1, sb.length());
            System.out.println(sb.toString());
        }
    }
}
