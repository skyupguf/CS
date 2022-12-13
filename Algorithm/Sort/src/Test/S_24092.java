package Test;
//  알고리즘 수업 - 퀵 정렬 3 (https://www.acmicpc.net/problem/24092)
/*
*   입력 1. 첫째 줄에 배열 A, B의 크기 N(5 ≤ N ≤ 10,000)이 주어진다.
*       2. 다음 줄에 서로 다른 배열 A의 원소 A1, A2, ..., AN이 주어진다. (1 ≤ Ai ≤ 109)
*       3. 다음 줄에 배열 B의 원소 B1, B2, ..., BN이 주어진다. (1 ≤ Bi ≤ 109)
*
*   출력 1. 맞는 경우 '1'
*       2. 틀린 경우 '0'
*/

import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class S_24092 {
    static long[] arrayA;
    static long[] arrayB;
    static boolean check = false;
    static int fix = 0;

    public static void quickSort (int left, int right) {
        if (left >= right || check) { return; }
        int pivot = partition(left, right);
        quickSort(left, pivot - 1);
        quickSort(pivot + 1, right);
    }

    public static int partition (int left, int right) {
        long pivot = arrayA[right];
        int i = left - 1;

        for (int j = left; j < right; j++) {
            if (arrayA[j] <= pivot) { swap(++i, j); }
            if (check) { break; }
        }
        if (!check) {
            if (i + 1 != right) { swap(i + 1, right); }
        }
        return i + 1;
    }

    public static void swap(int i, int j) {
        long temp = arrayA[j];
        arrayA[j] = arrayA[i];
        arrayA[i] = temp;

        for (int k = fix; k < arrayA.length; k++) {
            if (arrayA[k] != arrayB[k]) {
                fix = k;
                check = false;
                break;
            }
            check = true;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int N = Integer.parseInt(br.readLine());
        arrayA = new long[N];
        arrayB = new long[N];

        StringTokenizer st = new StringTokenizer(br.readLine(), " ");
        for (int i = 0; i < N; i++) { arrayA[i] = Integer.parseInt(st.nextToken()); }
        st = new StringTokenizer(br.readLine(), " ");
        for (int i = 0; i < N; i++) { arrayB[i] = Integer.parseInt(st.nextToken()); }


        if (Arrays.equals(arrayA, arrayB)) {
            bw.write('1');
        } else {
            quickSort(0, arrayA.length - 1);
            bw.write(check ? '1' : '0');
        }
        bw.flush();
        bw.close();
    }
}
