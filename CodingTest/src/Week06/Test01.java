package Week06;
//  우상향 차트
/*
*   시간순으로 나열된 주가 데이터 values 배열에서 가장 오랫동안 단조 증가가 이루어진 구간을 찾아 {시작인덱스, 끝인덱스}의 형식으로 출력하시오.
*   단, 단조 증가란 시작인덱스 <= i < 끝인덱스에서 values[i] < values[i + 1]인 경우를 말한다.
*   동일 길이의 구간이 여러번 나타날 경우, 가장 먼저 나온 구간으로 출력하시오.
*   또한, 전체 구간에서 단조 증가하는 구간이 없는 경우 {0, 0}으로 출력하시오.
*
    입력설명
    0 < values.length <= 100000

    출력설명
    단조 증가 구간을 길이가 2인 정수 배열로 반환

    매개변수 형식
    values = {103, 152, 124, 165, 152, 154, 159, 160, 200, 195, 205, 206, 204, 189, 156}

    반환값 형식
    {4, 8}
* */


import java.util.Arrays;

public class Test01 {

    public static int[] solution (int[] values) {
        int[] result = new int[2];
        // 두개의 포인터를 사용해 시작 구간부터 더 이상 커지지 않는 구간까지 비교한다.
        int p1 = 0;
        int p2 = 1;
        int max = values[p1];
        int interval = 0;
        int count = 0;

        while (p2 < values.length) {

            while (p2 < values.length && max < values[p2]) {
                max = values[p2++];
                ++count;
            }

            if (interval < count) {
                result[0] = p1;
                result[1] = --p2;
                interval = count;
            }

            if (p2 < values.length) {
                count = 0;
                p1 = p2;
                ++p2;
                max = values[p1];
            }
        }
        return result;
    }

    public static void main(String[] args) {
        int[] arr = {103, 152, 124, 165, 152, 154, 159, 160, 200, 195, 205, 206, 204, 189, 156};
        System.out.println(Arrays.toString(solution(arr)));

        arr = new int[] {5};
        System.out.println(Arrays.toString(solution(arr)));

        arr = new int[] {100, 80, 60, 40, 20, 0};
        System.out.println(Arrays.toString(solution(arr)));

        arr = new int[] {10, 20, 30, 40, 50, 60};
        System.out.println(Arrays.toString(solution(arr)));

        arr = new int[] {100, 170, 120, 130, 105, 113};
        System.out.println(Arrays.toString(solution(arr)));
    }
}
