package Concept;

// 알고리즘 - 정렬 (계수)

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;

public class Counting {

    public static void countingSort(int[] arr) {

//        //  계수 정렬을 위해 배열에서 최대값을 구해 해당 최대값의 인덱스까지 계수 테이블을 생성한다.
//        int max = Arrays.stream(arr).max().getAsInt();
//        int[] countingTable = new int[max + 1];
//
//        //  배열을 루프하면서 요소를 계수 테이블의 인덱스로 하고 탐색될 때마다 1씩 누적한다.
//        for (int number : arr) {
//            countingTable[number]++;
//        }
//
//        //  계수 테이블을 루프하면서 인덱스의 값 만큼 배열에 추가한다.
//        int index = 0;
//        for (int i = 0; i < countingTable.length; i++) {
//            while (countingTable[i] > 0) {
//                arr[index++] = i;
//                countingTable[i]--;
//            }
//        }

        //  비 정상적으로 큰 수가 있을 경우 배열이 많은 메모리가 필요하므로 해쉬맵을 활용한다.
        HashMap<Integer, Integer> countingMap = new HashMap<>();
        for (int number : arr) {
            countingMap.put(number, countingMap.getOrDefault(number, 0) + 1);
        }

        //  해쉬맵의 경우 키셋이 정렬되어 있지 않으므로 키셋을 리스트로 할당해 정렬한다.
        ArrayList<Integer> list = new ArrayList<>(countingMap.keySet());
        Collections.sort(list);

        //  list 에서 0부터 정렬된 키를 찾아서 해쉬맵의 값을 찾는 키로 사용한다.
        int index = 0;
        for (int i = 0; i < list.size(); i++) {
            int count = countingMap.get(list.get(i));
            while (count > 0) {
                arr[index++] = list.get(i);
                count--;
            }
        }
    }

    public static void main(String[] args) {
        // Test code
        int[] arr = {10, 32, 10, 27, 32, 17, 99, 56};
        countingSort(arr);
        System.out.println("계수 정렬: " + Arrays.toString(arr));
    }
}
