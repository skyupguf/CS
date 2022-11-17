// 기초 수학 - 경우의 수

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;

public class Case01 {
    public static void main(String[] args) {

//      1. 합의 법칙
        System.out.println("== 합의 법칙 ==");
//      두 개의 주사를 던졌을 때 합이 3 또는 4의 배수일 경우의 수

        int[] dice1 = {1, 2, 3, 4, 5, 6};
        int[] dice2 = {1, 2, 3, 4, 5, 6};

        int nA = 0;
        int nB = 0;

        // 1-1. 기본 풀이
        for (int num1 : dice1) {
            for (int num2 : dice2) {
                if ((num1 + num2) % 3 == 0) {
                    ++nA;
                } else if ((num1 + num2) % 4 == 0) {
                    ++nB;
                }
            }
        }
        System.out.println("결과: " + (nA + nB));

        // 1-2.  HashSet 이용
        HashSet<ArrayList> allCase = new HashSet<>();
        for (int num1 : dice1) {
            for (int num2 : dice2) {
                if ((num1 + num2) % 3 == 0 || (num1 + num2) % 4 == 0) {
                    ArrayList<Integer> list = new ArrayList<>(Arrays.asList(num1, num2));
                    allCase.add(list);
                }
            }
        }
        System.out.println("allCase = " + allCase);


//      2. 곱의 법칙
        System.out.println("== 곱의 법칙 ==");
//      두 개의 주사위 a, b를 던졌을 때 a는 3의 배수, b는 4의 배수인 경우의 수
        nA = 0;
        nB = 0;
        
        for (int num1 : dice1) {
            if (num1 % 3 == 0) {
                ++nA;
            }
        }
        for (int num2 : dice2) {
            if (num2 % 4 == 0) {
                ++nB;
            }
        }
        System.out.println(nA * nB);
        // 곱의 법칙을 사용하지 않고 단순 코드로 경우의 수를 구하면 이중 for 문을 사용해야 하므로 시간이 더 걸린다.

    }
}