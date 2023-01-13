package Week09;
//
/*
*
* */


import java.util.ArrayList;
import java.util.PriorityQueue;

public class Test01 {
    static ArrayList<ArrayList<Node>> graph;
    static class Node {
        int to;
        int weight;

        Node (int to, int weight) {
            this.to = to;
            this.weight = weight;
        }
    }


    static int solution(int N, int[][] friend, int[][] time) {
        createGraph(N, friend, time);

        int weightSum = 0;
        boolean[] visited = new boolean[N];

        PriorityQueue<Node> pq = new PriorityQueue<>((x, y) -> x.weight - y.weight);
        pq.add(new Node(0, 0));

        int count = 0;
        while (count < N) {
            Node cur = pq.poll();
            count++;

            if (visited[cur.to]) {
                continue;
            }

            visited[cur.to] = true;
            weightSum += cur.weight;

            if (count == N-1) {
                break;
            }

            for (int i = 0; i < graph.get(cur.to).size(); i++) {
                Node node = graph.get(cur.to).get(i);

                if (visited[node.to]) {
                    continue;
                }
                pq.offer(node);
            }
        }
        return count == N - 1 ? weightSum : -1;
    }


    static void createGraph(int N, int[][] friend, int[][] time) {
        graph = new ArrayList<>();

        for (int i = 0; i < N; i++) {
            graph.add(new ArrayList<>());
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < friend[i].length; j++) {
                graph.get(i).add(new Node(friend[i][j], time[i][j]));
                graph.get(friend[i][j]).add(new Node(i, time[i][j]));
            }
        }
    }


    public static void main(String[] args) {
        int N = 5;
        int[][] friend = {{1, 4}, {2, 3}, {4}, {1}, {0, 2}};
        int[][] time = {{5, 2}, {6, 4}, {9}, {1}, {2, 6}};

        System.out.println(solution(N, friend, time));
    }
}
