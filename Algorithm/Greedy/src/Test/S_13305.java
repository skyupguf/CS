package Test;
//  주유소 (https://www.acmicpc.net/problem/13305)
/*
*   일직선상의 N개의 도시를 처음부터 끝까지 이동하려 한다.
*   인접한 두 도시 사이의 도로들은 서로 길이가 다를 수 있고 거리 1을 이동할 때 1의 기름을 사용한다.
*   각 도시에는 하나의 주유소가 있으며, 도시 마다 주유소의 리터당 가격은 다를 수 있다.
*
*   [] 도시 주유소 가격, -거리-
*   [5]-2-[2]-3-[4]-1-[1]
*   제일 왼쪽 도시에서 6의 기름을 넣고, 더 이상의 주유 없이 제일 오른쪽 도시까지 이동하면 총 비용은 30이 된다.
*   제일 왼쪽 도시에서 2의 기름을 넣고, 다음 번 도시까지 이동한 후 4의 기름을 넣고 제일 오른쪽 도시까지 이동하면,
*   (2×5 = 10), (4×2 = 8원) 총 비용은 18이다.
*
*   입력 1. 첫 번째 줄에는 도시의 개수를 나타내는 정수 N(2 ≤ N ≤ 100,000)이 주어진다.
*       2. 다음 줄에는 인접한 두 도시를 연결하는 도로의 길이가 제일 왼쪽 도로부터 N-1개의 자연수로 주어진다.
*       3. 다음 줄에는 주유소의 리터당 가격이 제일 왼쪽 도시부터 순서대로 N개의 자연수로 주어진다.
*          (전체 거리는 1이상 1,000,000,000 이하의 자연수이다. 리터당 가격은 1 이상 1,000,000,000 이하의 자연수이다.)
*
*   출력 1. 표준 출력으로 제일 왼쪽 도시에서 제일 오른쪽 도시로 가는 최소 비용을 출력한다.
*
*   풀이과정
*       기름이 0이므로 어느 도시든 제일 작은 비용의 도시가 아니라면 반드시 해당 도시에서 거리만큼 기름을 넣어야 한다.
*       즉, 현 거리만큼의 주유는 다른 거리에 영향을 주지 않는다.
*
*       마지막 도시에서는 주유할 필요가 없으므로 거리배열과 주유배열에 N-1 만큼의 데이터를 삽입한다.
*       cost 변수에 첫 주유량을 할당하고 이제 각 도시의 주유량과 비교해 더 작은 경우 cost 를 변경한다.
*       그리고 cost 에 어떤 비용이 있든 반드시 거리 만큼을 주유해야 하므로 cost * 현재거리 후 total 에 누적한다.
* */

import java.io.*;
import java.util.StringTokenizer;


public class S_13305 {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine()) - 1;
        long[] dist = new long[N];
        long[] cities = new long[N];

        StringTokenizer stD = new StringTokenizer(br.readLine(), " ");
        StringTokenizer stC = new StringTokenizer(br.readLine(), " ");

        for (int i = 0; i < N; i++) {
            dist[i] = Integer.parseInt(stD.nextToken());
            cities[i] = Integer.parseInt(stC.nextToken());
        }

        long total = 0;
        long cost = cities[0];

        for (int i = 0; i < N; i++) {
            cost = Math.min(cost, cities[i]);
            total += cost * dist[i];
        }

        bw.write(total + "");
        bw.flush();
        bw.close();
    }
}
