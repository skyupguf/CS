package Concept;
// 알고리즘 - 최소 신장 트리
// 프림 알고리즘

import java.util.ArrayList;
import java.util.PriorityQueue;

public class Prim {

    static class Node {
        int to;
        int weight;

        Node(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }


    static int prim(int[][] data, int v, int e) {
        int weightSum = 0;

        ArrayList<ArrayList<Node>> graph = new ArrayList<>();
        for (int i = 0; i < v+1; i++) {
            graph.add(new ArrayList<>());
        }

        for (int i = 0; i < e; i++) {
            graph.get(data[i][0]).add(new Node(data[i][1], data[i][2]));
            graph.get(data[i][1]).add(new Node(data[i][0], data[i][2]));
        }

        boolean[] visited = new boolean[v+1];
        PriorityQueue<Node> pq = new PriorityQueue<>((x, y) -> x.weight - y.weight);
        pq.add(new Node(1, 0));

        int count = 0;
        while (!pq.isEmpty()) {
            Node cur = pq.poll();
            count++;

            if (visited[cur.to]) {
                continue;
            }
            visited[cur.to] = true;
            weightSum += cur.weight;

            if (count == v) {
                return weightSum;
            }

            for (int i = 0; i < graph.get(cur.to).size(); i++) {
                Node node = graph.get(cur.to).get(i);

                if (visited[node.to]) {
                    continue;
                }
                pq.offer(node);
            }
        }
        return weightSum;
    }


    public static void main(String[] args) {
        // Test code
        int v = 7;
        int e = 10;
        int[][] graph = {
                {1, 3, 1}, {1, 2, 9}, {1, 6, 8}, {2, 4, 13}, {2, 5, 2},
                {2, 6, 7}, {3, 4, 12}, {4, 7, 17}, {5, 6, 5}, {5, 7, 20}
        };

        System.out.println(prim(graph, v, e));
    }
}
