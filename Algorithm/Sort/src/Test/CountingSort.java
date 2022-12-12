package Test;
/**
 * 수 정렬하기 3
 *  첫째 줄에 수의 개수 N(1 ≤ N ≤ 10,000,000)이 주어진다.
 *  둘째 줄부터 N개의 줄에는 수가 주어진다. 이 수는 10,000보다 작거나 같은 자연수이다.
 *  입력 받은 수들을 O(N)의 연산안에 오름차순 정렬하여 한줄에 하나씩 출력하라.
 */

/*
* 정렬 알고리즘을 O(N)으로 수행하는 방법은 계수정렬이 유일하다.
* 값을 비교해서 교환하는 방식이 아니라 한 번의 루프로 정렬을 하기 때문이다.
* 다만 한정 된 수의 정렬에만 유리한 이유가 추가 공간이 필요하기 때문이다.
* 입력받은 수만큼의 배열을 생성하고 해당 수를 하나씩 루프하면서 수를 생성한 인덱스에 하나씩 카운트한다.
* 카운트가 완료되면 배열을 루프하면서 카운트된 수만큼 인덱스를 출력하면 된다.
* 입력받은 수 만큼의 배열 공간을 추가해야 하므로 당연히 공간을 더 많이 쓰게 된다.
* */

import java.io.*;

public class CountingSort {

    static void SortingArray(BufferedReader br, BufferedWriter bw, int[] arr) throws IOException {
        int num;
        int N = Integer.parseInt(br.readLine());

        for (int i = 0; i < N; i++) {
            num = Integer.parseInt(br.readLine());
            arr[num] += 1;
        }

        for (int i = 0; i < arr.length; i++) {
            if (arr[i] != 0) {
                for (int j = 0; j < arr[i]; j++) {
                    bw.write(i+"\n");
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {

        int[] countArray = new int[10001];

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        SortingArray(br, bw, countArray);

        bw.flush();
        bw.close();
    }
}