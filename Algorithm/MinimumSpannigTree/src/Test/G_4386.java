package Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.StringTokenizer;

public class G_4386 {
    static int N;
    static double[][] dst;
    static double[][] pos;
    static class Star {
        int num;
        double weight;

        Star(int num, double weight) {
            this.num = num;
            this.weight = weight;
        }
    }

    static double prim() {
        double INF = 1_000_000;
        double total = 0;
        double[] cost = new double[N];
        boolean[] visited = new boolean[N];

        Arrays.fill(cost, INF);
        PriorityQueue<Star> pq = new PriorityQueue<>(Comparator.comparingDouble(s -> s.weight));
        pq.add(new Star(0, 0));

        while (!pq.isEmpty()) {
            Star cur = pq.poll();
            int curNum = cur.num;
            if (visited[curNum]) {
                continue;
            }
            visited[curNum] = true;
            total += cur.weight;

            for (int i = 0; i < N; i++) {
                if (dst[i][curNum] < cost[i]) {
                    cost[i] = dst[i][curNum];
                    pq.add(new Star(i, cost[i]));
                }
            }
        }
        return total;
    }

    static double calDist(int i, int j) {
        return Math.sqrt((pos[i][0] - pos[j][0]) * (pos[i][0] - pos[j][0])
                + (pos[i][1] - pos[j][1]) * (pos[i][1] - pos[j][1]));
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        N = Integer.parseInt(br.readLine());

        pos = new double[N][2];
        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            pos[i][0] = Double.parseDouble(st.nextToken());
            pos[i][1] = Double.parseDouble(st.nextToken());
        }

        dst = new double[N][N];
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                dst[i][j] = calDist(i, j);
            }
        }

        System.out.println(prim());
    }
}
