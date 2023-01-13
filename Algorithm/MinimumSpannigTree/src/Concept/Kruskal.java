package Concept;
// 알고리즘 - 최소 신장 트리
// 크루스칼 알고리즘

import java.util.Arrays;

public class Kruskal {
    static int[] parents;


    static int kruskal(int[][] data, int v, int e) {
        Arrays.sort(data, (x, y) -> x[2] - y[2]);

        parents = new int[v+1];
        for (int i = 1; i < v+1; i++) {
            parents[i] = i;
        }

        int weightSum = 0;
        for (int i = 0; i < e; i++) {
            if (find(data[i][0]) != find(data[i][1])) {
                union(data[i][0], data[i][1]);
                weightSum += data[i][2];
            }
        }

        return weightSum;
    }


    static void union(int a, int b) {
        int aParent = find(a);
        int bParent = find(b);

        if (aParent != bParent) {
            parents[aParent] = bParent;
        }
    }


    static int find(int a) {
        if (a == parents[a]) {
            return a;
        }
        return parents[a] = find(parents[a]);
    }


    public static void main(String[] args) {
        // Test code
        int v = 7;
        int e = 10;
        int[][] graph = {
                {1, 3, 1}, {1, 2, 9}, {1, 6, 8}, {2, 4, 13}, {2, 5, 2},
                {2, 6, 7}, {3, 4, 12}, {4, 7, 17}, {5, 6, 5}, {5, 7, 20}
        };

        System.out.println(kruskal(graph, v, e));
    }
}