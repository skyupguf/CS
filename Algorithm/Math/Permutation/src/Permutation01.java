// 기초 수학 - 순열

import java.util.stream.IntStream;

public class Permutation01 {
    public static void main(String[] args) {

//      1. 팩토리얼
        System.out.println("== 팩토리얼 ==");
//      5!
        int n = 5;
        int result = 1;
        for (int i = 1; i <= n; i++) {
            result *= i;
        }
        System.out.println("result = " + result);
        System.out.println(IntStream.range(2, 6).reduce(1, (x, y) -> (x * y)));

//      2. 순열
//      n!/(n-r)! = n(n-1)(n-2) ... (n-r+1)(0 < r <= n)
        System.out.println("== 순열 ==");
//      5명을 3줄로 세우는 경우의 수
//      순서가 존재하므로 (1, 1, 1)이런 경우가 제외된다고 보면 된다. 한 명이 뽑히면 그 한명은 제
        n = 5;
        int r = 3;
        result = 1;

        for (int i = n; i >= n-r+1; i--) {
            result *= i;
        }
        System.out.println("r = " + result);

//      3. 중복 순열
//      nπr = n^r, 똑같은 경우를 뽑아도 되는 경우외
        System.out.println("== 중복 순열 ==");
//      서로 다른 4개의 수 중 2개를 뽑는 경우의 수 (중복 허용)
//      1, 2, 3, 4일 때 순열의 경우 순서가 존재하므로 (1, 1)이 안되지만 중복순열은 가능
        n = 4;
        r = 2;
        result = 1;

        for (int i = 0; i < r; i++) {
            result *= n;
        }
        System.out.println("result = " + result);
        System.out.println(Math.pow(4, 2));

//      4. 원 순열
//      n!/n = (n-1)!
        System.out.println("== 원 순열 ==");
//      원 모양의 테이블에 3명을 앉히는 경우의 수
        n = 3;
        result = 1;

        for (int i = 1; i < n; i++) {
            result *= i;
        }
        System.out.println("result = " + result);
    }
}