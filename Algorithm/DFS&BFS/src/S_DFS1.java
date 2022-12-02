/**
 * 알고리즘 수업 - 깊이 우선 탐색 1(https://www.acmicpc.net/problem/24479)
 *  N개의 정점과 M개의 간선으로 구성된 무방향 그래프(undirected graph)가 주어진다.
 *  정점 번호는 1번부터 N번이고 모든 간선의 가중치는 1이다.
 *  정점 R에서 시작하여 깊이 우선 탐색으로 노드를 방문할 경우 노드의 방문 순서를 출력하자.
 *
 *      조건. 깊이 우선 탐색 의사 코드는 다음과 같다. 인접 정점은 오름차순으로 방문한다.
 *      dfs(V, E, R) {  # V : 정점 집합, E : 간선 집합, R : 시작 정점
 *          visited[R] <- YES;  # 시작 정점 R을 방문 했다고 표시한다.
 *          for each x ∈ E(R)  # E(R) : 정점 R의 인접 정점 집합.(정점 번호를 오름차순으로 방문한다)
 *              if (visited[x] = NO) then dfs(V, E, x);
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
 *      인접행렬로 접근하면 간선수 정점수 때문에 메모리초과, 당연히 O(N^2)으로 시간초과도 발생한다.
 *      인접리스트로 연결된 간선들만 연결해 주는 방법을 사용한다.
 *      여기서 문제의 요구는 오름차순으로 정점이 연결되어 있는지 확인해야 하므로
 *      애초에 dfs로 탐색하기 전부터 인접리스트를 정렬시키고 탐색한다.
 *
 *      탐색할 때 중요한 점은 문제가 요구하는바는 해당 정점이 몇 번째 탐색되었냐 이다.
 *      이걸 이해 못해서 에러를 엄청냈는데
 *      예를 들어, 1번이 4번이랑 연결되어 있는데 탐색을 2번째에 했으면 4번 정점은 2를 출력해야 한다.
 *      1 - 4 - 5
 *      2 - 3
 *      3
 *      4 - 6
 *      5
 *      6
 *      일 경우 깊이 우선 탐색하면 1번부터 -> 4 -> 6 -> 5 가 된다.
 *      방문안한 노드는 0을 출력해야 하므로 결과는 1 0 0 2 4 3 이 된다.
 */

import java.io.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.StringTokenizer;

public class S_DFS1 {
    static int[] visited;
    static int[] count;
    static int idx = 0;
    static ArrayList<Integer>[] adjList;

    static void dfs(int x) {
        count[x] = ++idx;
        for (int y : adjList[x]) {
            if (visited[y] == 1) { continue; }
            visited[y] = 1;
            dfs(y);
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
        visited[S] = 1;
        dfs(S);

        for (int i = 1; i <= V; i++) {
            System.out.println(count[i]);
        }
    }
}