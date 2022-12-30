package Test;
//  스타트와 링크
/*
*   N은 짝수이고 팀을 스타트와 링크 두 팀으로 나누려고 한다.
*   아래 능력치 표대로 팀을 구성하면 아래 예시와 같다.

    N=4이고, S가 아래와 같은 경우를 살펴보자.

    i\j| 1	2  3  4
    ---------------
    1  | 	1  2  3
    2  | 4	   5  6
    3  | 7	1	  2
    4  | 3	4  5

*   1, 2번이 스타트 팀, 3, 4번이 링크 팀에 속한 경우에 두 팀의 능력치는 아래와 같다.
*   스타트 팀: S12 + S21 = 1 + 4 = 5
*   링크 팀: S34 + S43 = 2 + 5 = 7
*   스타트 팀의 능력치와 링크 팀의 능력치의 차이를 최소로 하려고 한다.
*   1, 4번이 스타트 팀, 2, 3번 팀이 링크 팀에 속하면 스타트 팀의 능력치는 6, 링크 팀의 능력치는 6이 되어서 차이가 0이 되고 이 값이 최소이다.

    입력
    첫째 줄에 N(4 ≤ N ≤ 20, N은 짝수)이 주어진다.
    둘째 줄부터 N개의 줄에 S가 주어진다. 각 줄은 N개의 수로 이루어져 있고, i번 줄의 j번째 수는 Sij 이다.
    Sii는 항상 0이고, 나머지 Sij는 1보다 크거나 같고, 100보다 작거나 같은 정수이다.

    출력
    첫째 줄에 스타트 팀과 링크 팀의 능력치의 차이의 최솟값을 출력한다.

*   접근방법
*   스타트 팀과 링크팀을 둘로 나눠서 최소값을 계산해야 한다.
*   따라서, 두 팀을 list 로 만들어 DFS로 섞어서 배치하는데 이 때, 두 팀 배치가 절반으로 동일해 졌을 때, 최소값을 계산한다.
* */

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;


public class S_14889 {
    static int N;
    static int[][] board;
    static int min = Integer.MAX_VALUE;
    static ArrayList<Integer> start = new ArrayList<>();
    static ArrayList<Integer> link = new ArrayList<>();


    static void getMinDifference(int idx) {
        if (idx == N) {

            if (start.size() == N/2) {
                int startSum = 0;
                int linkSum = 0;

                for (int i = 0; i < N / 2; i++) {
                    for (int j = i + 1; j < N / 2; j++) {

                        int si = start.get(i), sj = start.get(j);
                        int li = link.get(i), lj = link.get(j);

                        startSum += board[si][sj] + board[sj][si];
                        linkSum += board[li][lj] + board[lj][li];
                    }
                }
                min = Math.min(min, Math.abs(startSum - linkSum));
            }
            return;
        }

        start.add(idx);
        getMinDifference(idx + 1);
        start.remove(start.size()-1);

        link.add(idx);
        getMinDifference(idx + 1);
        link.remove(link.size()-1);
    }


    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        N = Integer.parseInt(br.readLine());
        board = new int[N][N];

        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());

            for (int j = 0; j < N; j++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        getMinDifference(0);
        System.out.println(min);
    }
}
