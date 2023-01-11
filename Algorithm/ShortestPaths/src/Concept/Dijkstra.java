package Concept;
// 알고리즘 - 최단 경로 알고리즘
// 다익스트라 구현

import java.util.ArrayList;
import java.util.PriorityQueue;


public class Dijkstra {
    // 노드와 간선의 가중치를 기록할 인접리스트로 그래프 생성
    static ArrayList<ArrayList<Node>> graph;
    static class Node {
        int to;
        int weight;

        Node (int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }


    static void createGraph(int v, int[][] data) {
        graph = new ArrayList<>();

        for (int i = 0; i < v+1; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] entry : data) {
            graph.get(entry[0]).add(new Node(entry[1], entry[2]));
        }
    }


    // 일반 다익스트라 구현
    static void dijkstra(int v, int src) {
        // 거리비용을 DP로 갱신할 배열 생성
        int[] dist = new int[v+1];
        for (int i = 1; i < v+1; i++) {
            dist[i] = Integer.MAX_VALUE;
        }
        dist[src] = 0;

        // 노드의 방문처리를 위한 배열 생성
        boolean[] visited = new boolean[v+1];

        // 노드를 순회하고 dist를 갱신해 최소거리를 구한다.
        for (int i = 0; i < v; i++) {
            int min = Integer.MAX_VALUE;
            int cur = 0;

            // 방문하지 않은 현재 최소비용인 출발점을 찾는다.
            for (int j = 0; j <= v; j++) {
                if (!visited[j] && dist[j] < min) {
                    min = dist[j];
                    cur = j;
                }
            }

            // 현재 출발노드를 찾았으면 방문처리를 하고 연결된 모든 간선에서 비용을 계산한다.
            visited[cur] = true;
            for (int j = 0; j < graph.get(cur).size(); j++) {
                Node node = graph.get(cur).get(j);
                dist[node.to] = Math.min(dist[node.to], dist[cur] + node.weight);
            }
        }

        for (int i = 1; i <= v; i++) {
            if (dist[i] == Integer.MAX_VALUE) {
                System.out.print("INF" + " ");
            } else {
                System.out.print(dist[i] + " ");
            }
        }
    }


    // 우선순위 큐를 활용한 다익스트라 구현
    static void priorityDijkstra(int v, int src) {
        int[] dist = new int[v+1];
        for (int i = 1; i < v+1; i++) {
            dist[i] = Integer.MAX_VALUE;
        }
        dist[src] = 0;

        // 우선순위 큐를 가중치대로 오름차순 정렬시킨다.
        PriorityQueue<Node> pq = new PriorityQueue<>((x, y) -> x.weight - y.weight);
        pq.offer(new Node(src, 0));

        while (!pq.isEmpty()) {
            Node node = pq.poll();

            // 우선순위 큐에서 추출한 노드의 가중치가 dist에 기록된 비용보다 클 경우 탐색할 필요가 없다.
            if (dist[node.to] < node.weight) {
                continue;
            }

            //
            for (int i = 0; i < graph.get(node.to).size(); i++) {
                Node cur = graph.get(node.to).get(i);

                if (dist[cur.to] > dist[node.to] + cur.weight) {
                    dist[cur.to] = dist[node.to] + cur.weight;
                    // 갱신된 길이가 더 작을 경우 해당 노드의 경로는 아직 살아있으므로 우선순위큐에 노드와 계산된 비용을 다시 추가한다.
                    pq.offer(new Node(cur.to, dist[cur.to]));
                }
            }
        }

        for (int i = 1; i <= v; i++) {
            if (dist[i] == Integer.MAX_VALUE) {
                System.out.print("INF" + " ");
            } else {
                System.out.print(dist[i] + " ");
            }
        }
    }


    public static void main(String[] args) {
        // Test code
        int[][] data = {{1, 2, 2}, {1, 3, 3}, {2, 3, 4}, {2, 4, 5}, {3, 4, 6}, {5, 1, 1}};
        createGraph(5, data);

        dijkstra(5, 1);
        System.out.println();
        priorityDijkstra(5, 1);
    }
}