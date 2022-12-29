package Practice;
// Practice2
// 정수형 n과 m이 주어졌을 때,
// 1 부터 n 까지의 정수 중에서 중복 없이 m 개를 고른 수열을 출력하는 프로그램을 작성하세요.

// 입출력 예시
// n: 3
// m: 2
// 출력: [1, 2], [1, 3], [2, 1], [2, 3], [3, 1], [3, 2]

import java.util.Arrays;
import java.io.IOException;
import java.io.BufferedWriter;
import java.io.OutputStreamWriter;


public class Practice02 {
    static int[] permuted;
    static boolean[] visited;
    static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));


    static void solution(int n, int m) throws IOException {
        permuted = new int[m];
        visited = new boolean[n];
        setPermutation(n, m, 0);
    }


    static void setPermutation(int n, int m, int depth) throws IOException {
        if (depth == m) {
            bw.write(Arrays.toString(permuted) + "\n");
            return;
        }

        for (int i = 0; i < n; i++) {

            if (!visited[i]) {
                visited[i] = true;
                permuted[depth] = i + 1;
                setPermutation(n, m, depth + 1);
                visited[i] = false;
            }
        }
    }


    public static void main(String[] args) throws IOException {
        // Test code
        solution(3, 2);
        bw.write("\n");
        solution(4, 3);
        bw.flush();
        bw.close();
    }
}
