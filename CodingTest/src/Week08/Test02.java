package Week08;
//  빠른 과반수 검증

public class Test02 {

    static int solution (int depth, int n, int[][] blocks) {
//        int[][] dp = new int[blocks.length][blocks[0].length+1];
//        dp[0][0] = 0;
//
//        System.arraycopy(blocks[0], 0, dp[0], 1, blocks[0].length);
//
//        for (int i = 1; i < blocks.length; i++) {
//            for (int j = 0; j <blocks[i].length; j++) {
//
//            }
//        }
        return 0;
    }


    public static void main(String[] args) {
        int depth = 3;
        int n = 0;
        int[][] blocks = {
                {5, 6, 2, 6},
                {1, 6, 4, 9},
                {5, 6, 9, 4},
                {55, 14, 21, 14}
        };
        System.out.println(solution(depth, n, blocks));
    }
}
