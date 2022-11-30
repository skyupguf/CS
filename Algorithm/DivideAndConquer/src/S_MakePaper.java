/**
 * 색종이 만들기(https://www.acmicpc.net/problem/2630)
 *  전체 크기가 N * N인 정사각형 종이가 있다.
 *  정사각형 종이는 색이 칠해져 있는 구간이 있으며 아닌 구간이 있다.
 *  색이 있거나 없는 구간이 섞여 있을 경우 가로와 세로를 각각 N/2로 잘라 4등분한다.
 *  이 과정을 모두 칠해져 있거나, 모두 안칠해져 있거나, 더 이상 자를 수 없을 때까지 반복한다.
 *  모든 종이를 자른 후 색이 칠해져 있는 종이의 개수와, 안칠해져 있는 종이의 개수를 구하라.
 *
 *      입력
 *      1. 첫째 줄에는 전체 종이의 한 변의 길이 N (2, 4, 8, 16, 32, 64, 128 중 하나)이 주어진다.
 *      2. 둘째 줄부터 색종이의 각 가로줄이 N길이 만큼 N줄 까지 주어진다.
 *          하얀색으로 칠해진 칸은 0, 파란색으로 칠해진 칸은 1이다.
 *
 *      출력
 *      첫째 줄에는 잘라진 햐얀색 색종이의 개수를 출력하고, 둘째 줄에는 파란색 색종이의 개수를 출력한다.
 * */

/*
* 접근방법 https://asdragon.notion.site/Stack-82442e79017c4f9ea77f6417f3944f60
*   1.모든 값이 1이거나 0일 때 카운트를 1해주고 0과 1을 출력해야 한다.
*       즉 분할이전에 색이 하나라면 카운트가 한 번만 일어나게 된다.
*
*   2. 행렬을 탐색하다 최초값과 다를 경우 4등분으로 분할해줘야 한다.
*       4등분으로 분할하고 1등분부터 다시 1번을 반복한다.
*
*   3. 1번 부터 다시 체크하고 2번이 발생하면 다시 1번을 반복하게 된다.
*       반복하면서 행렬의 사이즈가 1이 됐을 때 모든 색이 1이 될 때까지 다르므로 1일 때 카운트를 하고 탈출한다.
*
*   즉, 탈출 조건이 2가지가 된다.
*       1. N = 1이 될 때까지 모든 색이 같지 않은 경우 해당 색을 카운트하고 탈출한다.
*       2. 등분으로 자르던 도중 모든 색이 동일할 경우 더 이상 나눌 필요 없이 해당 등분의 색을 카운트하고 탈출한다.
*
*   분할정복의 핵심은 문제를 해결할 수 있는 단위까지만 분할하면 된다.
*   색이 모두 동일한걸 확인가능하면 더 이상 재귀로 분할할 필요가 없다.
*
* */

import java.util.Scanner;


public class S_MakePaper {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();

        int[] count = new int[2];
        int[][] paper = new int[N][N];
        for (int i = 0; i < paper.length; i++) {
            for (int j = 0; j < paper[i].length; j++) {
                paper[i][j] = sc.nextInt();
            }
        }
        int[] result = dividePaper(paper, 0, 0, N, count);

        System.out.println(result[0]);
        System.out.println(result[1]);
    }

    static int[] dividePaper (int[][] paper, int row, int col, int size, int[] count) {
        if (size == 1) {
            count[paper[row][col]]++;
            return count;
        }

        if (sameCheck(paper, row, col, size)) {
            if (paper[row][col] == 0) { count[0]++; }
            else { count[1]++; }
            return count;
        }

        int dSize = size / 2;
        dividePaper(paper, row, col, dSize, count);
        dividePaper(paper, row, col+dSize, dSize, count);
        dividePaper(paper, row+dSize, col, dSize, count);
        dividePaper(paper, row+dSize, col+dSize, dSize, count);

        return count;
    }

    static boolean sameCheck (int[][] paper, int row, int col, int size) {
        int color = paper[row][col];
        for (int i = row; i < row+size; i++) {
            for (int j = col; j < col+size; j++) {
                if (color != paper[i][j]) { return false; }
            }
        }
        return true;
    }
}