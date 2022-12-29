package Practice;
// Practice3
// 숫자 7193 은 7193 도 소수이고,
// 719, 71, 7 도 각각 소수이다.
// n 이 주어졌을 때, n 자리 수 중에 위와 같은 소수를 찾는 프로그램을 작성하세요.

// 입출력 예시
// 입력 n: 3
// 출력: 233, 239, 293, 311, 313, 317, 373, 379, 593, 599, 719, 733, 739, 797

import java.util.ArrayList;


public class Practice03 {
    static ArrayList<Integer> result;


    static ArrayList<Integer> solution(int n) {
        result = new ArrayList<>();
        int[] primeArray = {2, 3, 5, 7};

        for (int prime : primeArray) {
            findPrimeNum(prime, 1, n);
        }
        return result;
    }


    static void findPrimeNum(int prime, int pos, int len) {
        if (pos >= len) {
            result.add(prime);
            return;
        }

        for (int i = 0; i < 10; i++) {

            if (i % 2 != 0 || i % 5 != 0) {
                int primeCandidate = prime * 10 + i;

                if(checkPrimeNum(primeCandidate)) {
                    findPrimeNum(primeCandidate, pos + 1, len);
                }
            }
        }
    }


    static boolean checkPrimeNum(int num) {
        for (int i = 2; i <= Math.sqrt(num); i++) {

            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }


    public static void main(String[] args) {
        // Test code
        System.out.println(solution(3));
        System.out.println();
        System.out.println(solution(4));
    }
}
