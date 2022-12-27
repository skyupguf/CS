package Test;
//  쿼드트리 (https://www.acmicpc.net/problem/1992)
/*
*   흑백 영상을 압축하여 표현하는 데이터 구조로 쿼드 트리(Quad Tree)라는 방법이 있다.
*   흰 점 0과 검은 점 1로만 이루어진 영상(2차원 배열)에서 같은 숫자가 n * n 에 몰려있으면, 쿼드 트리에서는 이를 압축하여 간단히 표현할 수 있다.
*   N * N 크기의 영상이 주어질 때, 이 영상을 압축한 결과를 출력하는 프로그램을 작성하시오.

    입력
    1. 첫째 줄에는 영상의 크기를 나타내는 숫자 N 이 주어진다. N 은 언제나 2의 제곱수로 주어지며, 1 ≤ N ≤ 64의 범위를 가진다.
    2. 두 번째 줄부터는 길이 N의 문자열이 N개 들어온다. 각 문자열은 0 또는 1의 숫자로 이루어져 있으며, 영상의 각 점들을 나타낸다.

    8
    11110000
    11110000
    00011100
    00011100
    11110000
    11110000
    11110011
    11110011

    출력
    영상을 압축한 결과를 출력한다.
    ((110(0101))(0010)1(0001))

*   풀이과정
*       색종이 자르기 문제에서 잘라지는 과정을 문자열로 압축 반환하는 문제다.
*       위 예제를 아래와 같이 나뉘도록 분할정복을 해야 한다.

        11|11 | 00|00
        11|11 | 00|00
        -------------
        00|0|1| 11|00
        00|0|1| 11|00
        -------------
        11|11 | 00|00
        11|11 | 00|00
        -------------
        11|11 | 00|11
        11|11 | 00|11

*       전역에 결과 문자열 result 를 StringBuilder 로 생성한다.
*
*       1. 우선 모든 수가 0 또는 1이면 한 번도 잘라지지 않기 때문에 ()를 생성할 필요가 없다.
*           4사 분면으로 자르기전에 모든 수가 동일한지 compressCheck 함수를 생성해 이중 for 문으로 체크한다.
*           모든 수가 동일하면 true 를 리턴해 하나의 기준 수 arr[0][0] 을 result 에 추가하고 종료한다.
*
*       2. 4사분면으로 한 번 나뉘면 무조건 한 번의 괄호안에 속해져야 하므로 나누기전 "("를 result 에 추가한다.
*           4사분면으로 다 나누고 재귀호출이 종료되면 ")"로 해당 사분면을 완성한다.
*
*       3. 2번을 수행하면 재귀호출 회수 만큼 ()를 생성할 수 있다.
*
* */

import java.io.*;


public class S_1992 {
    static int[][] quadTree;
    static StringBuilder result = new StringBuilder();

    static void divideQuadTree (int row, int col, int size) {

        if (compressCheck(row, col, size)) {
            result.append(quadTree[row][col]);
            return;
        }

        // 4사분면으로 한 번 나뉘면 ()에 문자열이 속하게 된다.
        // 재귀호출로 또 4사분면으로 나뉘면 모든 괄호가 알맞게 생성된다.
        result.append("(");

        int half = size / 2;
        divideQuadTree(row, col, half);
        divideQuadTree(row, col+half, half);
        divideQuadTree(row+half, col, half);
        divideQuadTree(row+half, col+half, half);

        // 한 번의 4사분면으로 나눠서 모두 체크되면 마지막에 닫는 괄호로 쿼드트리 압축 문자열을 완성한다.
        result.append(")");

    }

    static boolean compressCheck (int row, int col, int size) {
        int standard = quadTree[row][col];

        for (int i = row; i < row + size; i++) {

            for (int j = col; j < col + size; j++) {

                if (standard != quadTree[i][j]) {
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
        quadTree = new int[N][N];

        for (int i = 0; i < N; i++) {
            String[] strings = br.readLine().split("");

            for (int j = 0; j < N; j++) {
                quadTree[i][j] = Integer.parseInt(strings[j]);
            }
        }
//        int N = 8;
//        quadTree = new int[][] {
//                {1,1,1,1,0,0,0,0},
//                {1,1,1,1,0,0,0,0},
//                {0,0,0,1,1,1,0,0},
//                {0,0,0,1,1,1,0,0},
//                {1,1,1,1,0,0,0,0},
//                {1,1,1,1,0,0,0,0},
//                {1,1,1,1,0,0,1,1},
//                {1,1,1,1,0,0,1,1}
//        };

        divideQuadTree(0, 0, N);
        bw.write(String.valueOf(result));
        bw.close();
    }
}
