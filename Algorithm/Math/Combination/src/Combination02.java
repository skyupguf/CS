// Practice
// 1, 2, 3, 4 를 이용하여 세자리 자연수를 만드는 방법 (순서 X, 중복 x)의 각 결과를 출력하시오

public class Combination02 {
    void combination(int[] arr, boolean[] visited, int depth, int n, int r) {

        if (r == 0) {
            for (int i=0; i<n; i++) {
                if (visited[i]) {
                    System.out.print(arr[i] + " ");
                }
            }
        }

        if (depth == n) {
            return;
        }

        visited[depth] = true;
        combination(arr, visited, depth+1, n, r-1);

        visited[depth] = false;
        combination(arr, visited, depth + 1, n, r);
    }

    public static void main(String[] args) {
//      Test code
        int[] arr = {1, 2, 3, 4};
        boolean[] visited = {false, false, false, false};

        Combination02 p = new Combination02();
        p.combination(arr, visited, 0, 4, 3);
    }
}
