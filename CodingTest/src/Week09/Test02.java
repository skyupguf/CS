package Week09;
//  빠른 과반수 검증

import java.util.ArrayList;
import java.util.PriorityQueue;


public class Test02 {
    static ArrayList<ArrayList<Node>> graph;
    static class Node {
        int to;
        int weight;

        Node(int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }


    static void createGraph(int n, int[][] data) {
        graph = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            graph.add(new ArrayList<>());
        }
        for (int[] entry : data) {
            graph.get(entry[0]).add(new Node(entry[1], entry[2]));
        }
    }


    static int solution (int N, int[][] flight, int a, int b, int k) {
        int cost = 0;
        createGraph(N, flight);

        int[] dist = new int[N];
        for (int i = 0; i < N; i++) {
            dist[i] = Integer.MAX_VALUE;
        }
        dist[a] = 0;

        PriorityQueue<Node> pq = new PriorityQueue<>((x, y) -> x.weight - y.weight);
        pq.add(new Node(a, 0));

        int count = 0;
        while (count < k) {
            Node node = pq.poll();

            if (dist[node.to] < node.weight) {
                continue;
            }

            for (int i = 0; i < graph.get(node.to).size(); i++) {
                Node cur = graph.get(node.to).get(i);

                if (dist[cur.to] > dist[node.to] + cur.weight) {
                    dist[cur.to] = dist[node.to] + cur.weight;
                    pq.offer(new Node(cur.to, dist[cur.to]));
                }
            }
            count++;
        }
        return dist[b] != Integer.MAX_VALUE ? dist[b] : -1;
    }


    public static void main(String[] args) {
        int N = 4;
        int a = 1;
        int b = 3;
        int k = 2;

        int[][] flight = {
                {0, 2, 1},
                {1, 3, 20},
                {1, 0, 8},
                {2, 3, 1},
                {0, 3, 3}
        };
        System.out.println(solution(N, flight, a, b, k));
    }
}
