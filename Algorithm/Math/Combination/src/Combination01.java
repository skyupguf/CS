// 기초 수학 - 조합

public class Combination01 {

    static int getCombination(int n, int r) {
        int pResult = 1;
        for (int i=n; i>=n-r+1; i--) {
            pResult *= i;
        }

        int rResult = 1;
        for (int i=1; i<=r; i++) {
            rResult *= i;
        }
        return pResult / rResult;
    }

    public static void main(String[] args) {
//      1. 조합
//      순서와 상관없이 뽑는 경우 (1, 2)와 (2, 1)은 동일한 경우
//      nCr = n!/(n-r)!r! = nPr/r! (0 < r <= n)
//      서로 다른 4명 중 주번 2명 뽑는 경우
        System.out.println("== 조합 ==");

        int n = 4;
        int r = 2;

        int pResult = 1;
        for (int i=n; i>=n-r+1; i--) {
            pResult *= i;
        }

        int rResult = 1;
        for (int i=1; i<=r; i++) {
            rResult *= i;
        }
        System.out.println("결과 : " + pResult / rResult);


//      2. 중복 조합
//
//      nHr = (n+r-1)Cr => 2H3 = 4C3
        System.out.println("== 중복 조합 ==");
        n = 2;
        r = 3;

        System.out.println("결과 : " + getCombination(n + r - 1, r));

    }
}