package Test;
//  알고리즘 수업 - 힙 정렬 1 (https://www.acmicpc.net/problem/24173)
/*
 *  입력 1. 첫째 줄에 배열 A의 크기 N(5 ≤ N ≤ 500,000), 교환 횟수 K(1 ≤ K ≤ 108)가 주어진다.
 *      2. 다음 줄에 서로 다른 배열 A의 원소 A1, A2, ..., AN이 주어진다. (1 ≤ Ai ≤ 109)
 *
 *  출력 1. K 번째 교환되는 두 개의 수를 작은 수부터 한 줄에 출력한다. 교환 횟수가 K 보다 작으면 -1을 출력한다.
 *
 *  접근방법
 *      수도코드는 최소힙을 만들어 정렬하는 알고리즘이므로 최소힙으로 구현한다.
 *      K가 0이 되는 스왑이 될 경우 해당 배열의 요소를 min, max 변수에 할당해 준다.
 *      K가 0이하가 되면 더 이상 정렬을 수행할 필요없으므로 스왑을 하지 않도록 구간에 탈출을 시킨다.
 */

import java.io.*;
import java.util.StringTokenizer;


public class S_24173 {
    static long[] array;
    static long min;
    static long max;
    static int K;

    public static void heapSort () {
        for (int i = array.length / 2 - 1; i >= 0; i--) {
            heapify(i, array.length);
        }

        for (int i = array.length - 1; i > 0; i--) {
            if (K <= 0) { return; }
            swap(0, i);
            heapify(0, i);
        }
    }

    public static void heapify (int parent, int size) {
        int left = parent * 2 + 1;
        int right = parent * 2 + 2;
        int min = parent;

        if (left < size && array[min] > array[left]) {
            min = left;
        }
        if (right < size && array[min] > array[right]) {
            min = right;
        }
        if (parent != min) {
            if (K <= 0) { return; }
            swap(min, parent);
            heapify(min, size);
        }
    }

    public static void swap (int i, int j) {
        long temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        K--;
        if (K == 0) {
            min = Math.min(array[i], array[j]);
            max = Math.max(array[i], array[j]);
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        K = Integer.parseInt(st.nextToken());

        array = new long[N];
        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N; i++) {
            array[i] = Long.parseLong(st.nextToken());
        }

        heapSort();
        bw.write(K == 0 ? min + " " + max : "-1");
        bw.flush();
        bw.close();
    }
}