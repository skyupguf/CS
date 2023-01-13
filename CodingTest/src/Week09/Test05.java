package Week09;



public class Test05 {

    static int solution (int[] x, int[] y) {
        int min = 0;
        int len = x.length;

        int[] dist = new int[len];
        for (int i = 1; i < len; i++) {
            dist[i] = Integer.MAX_VALUE;
        }
        dist[0] = 0;

        boolean[] visited = new boolean[len];

        int count = 0;
        while (count < len) {
            int cur = -1;
            int curDist = Integer.MAX_VALUE;

            for (int i = 0; i < len; i++) {
                if (!visited[i] && dist[i] < curDist) {
                    cur = i;
                    curDist = dist[i];
                }
            }

            visited[cur] = true;
            min += curDist;

            for (int j = 0; j < len; j++) {
                int weight = Math.abs(x[cur] - x[j]) + Math.abs(y[cur] - y[j]);

                if (!visited[j] && weight < dist[j]) {
                    dist[j] = weight;
                }
            }
            count++;
        }
        return min;
    }


    public static void main(String[] args) {
        int[] x = {0, 0, 3, 3, 6};
        int[] y = {0, 3, 1, 4, 3};
        System.out.println(solution(x, y));
    }
}
