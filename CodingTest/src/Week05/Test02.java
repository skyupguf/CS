package Week05;
/*
*   0 또는 양의 정수가 numbers 배열로 주어진다.
*   numbers 배열에 주어진 정수를 이어붙여 만들 수 있는 가장 큰 수를 출력한다.
*   주어진 정수가 {6, 10, 2}라면 {6102, 6210, 1062, 1026, 2610, 2106}를 만들 수 있고, 이중 가장 큰 수는 6210이다.
*   문자열로 출력하시오.

    입력설명
    0 < numbers <= 10000
    0 <= numbers[i] <= 10000

    출력설명
    구성 가능한 최대값을 문자열로 출력

    매개변수 형식
    numbers = {3, 30, 34, 5, 9}

    반환값 형식
    "9534330"
* */

import java.util.Arrays;


public class Test02 {

    static int[] numbers;

    public static String solution () {

        StringBuilder result = new StringBuilder();
        return result.toString();
    }


    public static void main(String[] args) {

        numbers = new int[] {3, 30, 34, 5, 9};
        System.out.println(solution());
    }
}
