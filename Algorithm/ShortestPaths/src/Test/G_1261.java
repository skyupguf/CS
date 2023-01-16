package Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class G_1261 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int M = Integer.parseInt(st.nextToken());
        int N = Integer.parseInt(st.nextToken());
        int[] mvH = { 0, 0, -1, 1 };
        int[] mvW = { 1, -1, 0, 0 };
        int[][] pos = new int[N][M];
        int[][] dst = new int[N][M];
        boolean[][] visited = new boolean[N][M];

        ArrayDeque<int[]> dq = new ArrayDeque<>();
        for (int i = 0; i < N; i++) {
            String input = br.readLine();
            for (int j = 0; j < M; j++) {
                pos[i][j] = input.charAt(j) - '0';
            }
        }
        dq.addFirst(new int[] { 0, 0 });
        visited[0][0] = true;

        while (!dq.isEmpty()) {
            int[] cur = dq.removeFirst();
            int h = cur[0];
            int w = cur[1];
            if (h == N && w == M) {
                break;
            }
            for (int i = 0; i < 4; i++) {
                int H = h + mvH[i];
                int W = w + mvW[i];
                if (H >= 0 && W >= 0 && H < N && W < M && !visited[H][W]) {

                    visited[H][W] = true;
                    if (pos[H][W] == 1) {
                        dq.addLast(new int[] { H, W });
                        dst[H][W] = dst[h][w] + 1;
                    } else if (pos[H][W] == 0) {
                        dq.addFirst(new int[] { H, W });
                        dst[H][W] = dst[h][w];
                    }
                }
            }
        }
        System.out.println(dst[N-1][M-1]);
    }
}
