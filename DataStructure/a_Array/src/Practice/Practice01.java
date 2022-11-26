package Practice;// Practice1
// 배열 arr 의 모든 데이터에 대해서,
// 짝수 데이터들의 평균과 홀수 데이터들의 평균을 출력하세요.

// 입출력 예시)
// 배열 arr: 1, 2, 3, 4, 5, 6, 7, 8, 9
// 결과:
// 짝수 평균: 5.0
// 홀수 평균: 5.0

import java.util.Scanner;

public class Practice01 {


    static void calAverage(int[] arr) {
        double even = 0;
        int evenCount = 0;
        double odd = 0;
        int oddCount = 0;

        for (int num : arr) {
            if (num % 2 == 0) {
                even += num;
                evenCount++;
            } else {
                odd += num;
                oddCount++;
            }
        }
        System.out.printf("짝수 평균: %.1f\n", even / evenCount);
        System.out.printf("홀수 평균: %.1f\n", odd / oddCount);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int[] numbers = new int[sc.nextInt()];
        for (int i = 0; i < numbers.length; i++) {
            numbers[i] = sc.nextInt();
        }

        calAverage(numbers);
    }

}
