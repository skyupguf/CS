package Week10;


import java.util.ArrayList;

public class Test05 {
    static ArrayList<ArrayList<Node>> graph;
    static class Node {
        int to;
        int weight;

        Node(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }

    static void createGraph(int n, int[][] edge) {
        graph = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] ints : edge) {
            graph.get(ints[0]).add(new Node(ints[1], ints[2]));
        }
    }

    static int solution(int N, int[][] edge) {
        createGraph(N, edge);
        int[] dist = new int[N];
        for (int i = 1; i < N; i++) {
            dist[i] = Integer.MAX_VALUE;
        }

        dist[0] = 0;
        boolean[] visited = new boolean[N];

        for (int i = 0; i < N; i++) {
            int minDist = Integer.MAX_VALUE;
            int cur = 0;
            for (int j = 1; j < N; j++) {
                if (!visited[j] && dist[j] < minDist) {
                    minDist = dist[j];
                    cur = j;
                }
            }
            visited[cur] = true;
            for (int j = 0; j < graph.get(cur).size(); j++) {
                Node node = graph.get(cur).get(j);
                if (dist[node.to] > dist[cur] + node.weight) {
                    dist[node.to] = dist[cur] + node.weight;
                }
            }
        }
        int maxNode = 0;
        for (int i = 1; i < N; i++) {
            if (dist[maxNode] < dist[i]) {
                maxNode = i;
            }
        }
        return maxNode;
    }

    public static void main(String[] args) {
        int N = 5;
        int[][] edge = {{0, 1, 5}, {0, 2, 7}, {1, 3, 10}, {3, 4, 8}, {2, 4, 9}, {4, 2, 1}};
        System.out.println(solution(N, edge));
    }
}
