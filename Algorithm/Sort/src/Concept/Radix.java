package Concept;

// 알고리즘 - 정렬 (기수)

import java.util.Queue;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.LinkedList;


public class Radix {
    static int[] array;

    public static void radixSort() {

        //  기수 테이블을 생성한다, 테이블은 리스트안에 큐 형태로 만든다.
        ArrayList<Queue<Integer>> radixTable = new ArrayList<>();

        //  자리수를 인덱스로 만들기 위해 0 ~ 9 까지 ArrayList 에 연결리스트를 할당한다.
        for (int i = 0; i < 10; i++) {
            radixTable.add(new LinkedList<>());
        }

        //  기수 정렬할 최대 자리수를 구해 해당 자리만큼 루프하도록 해야한다.
        int maxDigit = getMaxDigit();

        //  배열 요소의 각 자리수를 구해 리스트에 추가하고 인출하는 정렬과정을 반복한다.
        int divDigit = 1;
        for (int i = 0; i < maxDigit; i++) {

            //  기수 테이블에서 해당 자리 수를 구해 인덱스에 일치하는 큐에 수를 추가한다.
            for (int number : array) {
                radixTable.get((number/divDigit) % 10).offer(number);
            }

            //  이제 테이블의 큐에서 0부터 9까지 차례대로 수를 인출해 배열에 차례대로 값을 할당한다.
            int index = 0;
            for (int j = 0; j < 10; j++) {

                Queue<Integer> queue = radixTable.get(j);
                while (!queue.isEmpty()) {
                    array[index++] = queue.poll();
                }
            }
            //  maxDigit 만큼의 자리수를 구하기 위해 한 번 루프후 10을 곱한다.
            divDigit *= 10;
        }
    }

    public static int getMaxDigit () {
        int maxDigit = 0;

        //  maxDigit 을 array 를 루프하면서 계산 비교하여 찾는다.
        for (int number : array) {
            int digit = (int)Math.log10(number) + 1;
            maxDigit = Math.max(digit, maxDigit);
        }
        return maxDigit;
    }

    public static void main(String[] args) {
        // Test code
        array = new int[] {10, 32, 52, 27, 48, 17, 99, 56, 85, 101, 123};
        radixSort();
        System.out.println("기수 정렬: " + Arrays.toString(array));
    }
}
