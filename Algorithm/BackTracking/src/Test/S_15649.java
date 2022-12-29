package Test;
//  N과 M(1) (https://www.acmicpc.net/problem/15649)
/*
*   자연수 N과 M이 주어졌을 때, 아래 조건을 만족하는 길이가 M인 수열을 모두 구하는 프로그램을 작성하시오.
*   1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열

    입력
    첫째 줄에 자연수 N과 M이 주어진다. (1 ≤ M ≤ N ≤ 8)

    출력
    한 줄에 하나씩 문제의 조건을 만족하는 수열을 출력한다. 중복되는 수열을 여러 번 출력하면 안되며, 각 수열은 공백으로 구분해서 출력해야 한다.
    수열은 사전 순으로 증가하는 순서로 출력해야 한다.

*   접근방법
*   1 ~ N 까지 수 중에 M개를 고르는데 이게 순서가 정해진 순열형태다.
*   즉, 순서가 다를 경우 다른 경우라고 보면된다. 수를 1부터 입력받은 N까지 루프하면서 모든 경우를 탐색해 본다.
*   1을 시작으로 2 - 3 - N 이 때, 같은 수는 중복되면 안되므로 체크를 해 탐색하지 못하도록 하고 한 번 탐색이후
*   백트래킹을 통해 다음 수를 탐색한다.
* */

import java.io.*;
import java.util.StringTokenizer;


public class S_15649 {
    static StringBuilder sb = new StringBuilder();
    static StringBuilder result = new StringBuilder();
    static boolean[] visited;


    static void findCase(int end, int caseNum, int depth) throws IOException {
        if (caseNum == depth) {
            result.append(sb).append("\n");
            return;
        }

        for (int i = 0; i < end; i++) {

            if (!visited[i]) {
                visited[i] = true;
                sb.append(i+1).append(" ");
                findCase(end, caseNum, depth+1);
                sb.delete(sb.length()-2, sb.length());
                visited[i] = false;
            }
        }
    }


    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        visited = new boolean[N];

        findCase(N, M, 0);
        System.out.println(result);
    }
}
