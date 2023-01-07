package Test;
//  RGB 거리 (https://www.acmicpc.net/problem/1149)
/*
*   선분으로된 RGB 거리에는 집 N개가 1번부터 N 번까지 순서대로 있다.
*   집은 빨강, 초록, 파랑 중 하나의 색으로 칠해야 한다. 각각의 집을 빨강, 초록, 파랑으로 칠하는 비용이 주어졌을 때,
*   아래 규칙을 만족하면서 모든 집을 칠하는 비용의 최솟값을 구해보자.
*
*   조건 1. 1번 집의 색은 2번 집의 색과 같지 않아야 한다.
*       2. N번 집의 색은 N-1번 집의 색과 같지 않아야 한다.
*       3. i(2 ≤ i ≤ N-1)번 집의 색은 i-1번, i+1번 집의 색과 같지 않아야 한다.

    입력
    - 첫째 줄에 집의 수 N(2 ≤ N ≤ 1,000)이 주어진다.
    - 둘째 줄부터 N개의 줄에는 각 집을 빨강, 초록, 파랑으로 칠하는 비용이 1번 집부터 한 줄에 하나씩 주어진다.
    - 집을 칠하는 비용은 1,000보다 작거나 같은 자연수이다.
      3
      26 40 83
      49 60 57
      13 89 99

    출력
    - 첫째 줄에 모든 집을 칠하는 비용의 최솟값을 출력한다.
      96

*   풀이
*   조건을 간략화하면 인접한 앞, 뒤의 집은 모두 색이 달라야 한다.
*   예를 들어, 파랑 빨강 파랑 빨강 파랑 으로 최소비용만 가능하면 2가지 색으로만 집을 칠할 수 있다.
*
        빨 초 파
       ---------
   집1| 26 40 83
   집2| 49 60 57
   집3| 13 89 99

*   시작점 1, 2, 3의 각각의 결과를 모두 구해봐야 최소값을 알 수 있다.
*   집1
*   start1 = 빨1
*   start2 = 초1
*   start3 = 파1
*
*   집2
*   start1 = 빨2 + Min(start2, start3)
*   start2 = 초2 + Min(start1, start3)
*   start3 = 파2 + Min(start1, start2)
*
*   이런 방식으로 해당 도시를 칠하는 위치엔 이전까지 누적된 최소비용을 누적한다.
*   최종 결과로 1, 2, 3중 가장 작은 비용을 찾는다.
* */

import java.io.*;
import java.util.StringTokenizer;


public class S_1149 {
    static int start1 = 0;
    static int start2 = 0;
    static int start3 = 0;


    static void calMinCost(int r, int g, int b) {
        int tmp = start1, tmp2 = start2, tmp3 = start3;
        start1 = r + Math.min(tmp2, tmp3);
        start2 = g + Math.min(tmp, tmp3);
        start3 = b + Math.min(tmp, tmp2);
    }


    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());

        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int R = Integer.parseInt(st.nextToken());
            int G = Integer.parseInt(st.nextToken());
            int B = Integer.parseInt(st.nextToken());
            calMinCost(R, G, B);
        }
        System.out.println(Math.min(Math.min(start1, start2), start3));
    }
}
