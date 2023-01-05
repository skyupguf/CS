package Practice;
// Practice1
// 다이나믹 프로그래밍 기본 사용법

public class Practice01 {

    // 피보나치 수열 O(2^N)
    public static int fib(int n) {
        if (n <= 2) {
            return 1;
        }
        return fib(n - 2) + fib(n - 1);
    }

    // Tabulation O(N)
    public static int fibDP(int n) {
        int[] dp = new int[n < 2 ? 2 : n+1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i < n + 1; i++) {
            dp[i] = dp[i-2] + dp[i-1];
        }

        return dp[n];
    }

    // Memoization O(N)
    static int[] dp = new int[8];
    public static int fibDP2(int n) {
        if (n <= 2) {
            return 1;
        }

        if (dp[n] != 0) {
            return dp[n];
        }

        return dp[n] = fibDP2(n - 2) + fibDP2(n - 1);
    }


    public static void main(String[] args) {
        // Test code
        System.out.println(fib(7));
        System.out.println(fibDP(7));
        System.out.println(fibDP2(7));
    }
}