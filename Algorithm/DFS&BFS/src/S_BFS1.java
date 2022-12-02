/**
 * 알고리즘 수업 - 너비 우선 탐색 1(https://www.acmicpc.net/problem/24444)
 *  N개의 정점과 M개의 간선으로 구성된 무방향 그래프(undirected graph)가 주어진다.
 *  정점 번호는 1번부터 N번이고 모든 간선의 가중치는 1이다.
 *  정점 R에서 시작하여 너비 우선 탐색으로 노드를 방문할 경우 노드의 방문 순서를 출력하자.
 *
 *      입력. 1. 정점의 수 N (5 ≤ N ≤ 100,000),
 *           2. 간선의 수 M (1 ≤ M ≤ 200,000),
 *           3. 시작 정점 R (1 ≤ R ≤ N)이 주어진다.
 *           4. 다음 M개 줄에 간선 정보 u v가 주어지며 정점 u와 정점 v의 가중치 1인 양방향 간선을 나타낸다. (1 ≤ u < v ≤ N, u ≠ v)
 *
 *      출력. 첫째 줄부터 N개의 줄에 정수를 한 개씩 출력한다. i번째 줄에는 정점 i의 방문 순서를 출력한다. 시작 정점의 방문 순서는 1이다.
 *           시작 정점에서 방문할 수 없는 경우 0을 출력한다.
 * */
/*  접근 방법
 *      구조를 만드는건 DFS 문제와 동일하고 탐색을 BFS로 한다.
 *      오름차순이므로 리스트를 먼저 정렬하고 시작한다.
 *      1 - 4 - 5
 *      2 - 3
 *      3
 *      4 - 6
 *      5
 *      6
 *      경우 너비 우선 탐색하면 1번부터 -> 4 -> 5 -> 6 이 된다.
 *      방문안한 노드는 0을 출력해야 하므로 결과는 1 0 0 2 3 4 가 된다.
 *
 *      큐에서 출력한 정점을 방문배열을 활용해 방문하지 않은 경우만 count 배열에 카운트하고 인덱스를 1증가시킨다.
 */

import java.io.*;
import java.util.*;

public class S_BFS1 {
    static int[] visited;
    static int[] count;
    static int idx = 0;
    static ArrayList<Integer>[] adjList;

    static void Bfs (int x) {
        Queue<Integer> queue = new LinkedList<>();
        queue.add(x);

        while (queue.size() > 0) {
            int v1 = queue.poll();
            if (visited[v1] == 1) { continue; }
            visited[v1] = 1;
            count[v1] = ++idx;
            queue.addAll(adjList[v1]);
        }
    }

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int V = Integer.parseInt(st.nextToken());
        int E = Integer.parseInt(st.nextToken());
        int S = Integer.parseInt(st.nextToken());

        adjList = new ArrayList[V+1];
        for (int i = 1; i <= V; i++) {
            adjList[i] = new ArrayList<>();
        }
        for (int i = 0; i < E; i++) {
            st = new StringTokenizer(br.readLine());
            int vertex1 = Integer.parseInt(st.nextToken());
            int vertex2 = Integer.parseInt(st.nextToken());
            adjList[vertex1].add(vertex2);
            adjList[vertex2].add(vertex1);
        }
        for (int i = 1; i <= V; i++) {
            Collections.sort(adjList[i]);
        }

        count = new int[V+1];
        visited = new int[V+1];
        Bfs(S);

        for (int i = 1; i <= V; i++) {
            System.out.println(count[i]);
        }
    }
}