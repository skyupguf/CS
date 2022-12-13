package Test;
//  알고리즘 수업 - 병합 정렬 3 (https://www.acmicpc.net/problem/24062)
/*
 *   입력 1. 첫째 줄에 배열 A, B의 크기 N(5 ≤ N ≤ 500,000)이 주어진다.
 *       2. 다음 줄에 서로 다른 배열 A의 원소 A1, A2, ..., AN이 주어진다. (1 ≤ Ai ≤ 109)
 *       3. 다음 줄에 배열 B의 원소 B1, B2, ..., BN이 주어진다. (1 ≤ Bi ≤ 109)
 *
 *   출력 1. 맞는 경우 '1'
 *       2. 틀린 경우 '0'
 *
 *  접근방법
 *      병합정렬 코드는 문제가 제시한 수도코드에 맞춰 구현하면 된다.
 *      문제는 값이 바뀔 때 마다 arrayB의 배열의 모든 요소와 비교해야 하는게 문제다.
 *      각 단계와 일치하는지 무조건 비교해야 하므로 스킵할 수 없다. 따라서, O(N)의 추가루프를 어떻게 줄일지 생각해야 한다.
 *
 *      오름차순 정렬이고 각 단계의 정렬된 수는 정해져 있기 때문에 한 번 탐색한 곳까지 일치 했으면 표시를 해둔다.
 *      fix 변수를 static 으로 전역에 선언해 놓고 배열 비교시 일치하지 않는 인덱스까지 탐색해서 그 인덱스를 할당한다.
 *      다음 번 탐색은 fix부터 시작한다.
 *
 *  해결한 문제
 *      초기 값도 비교해야 하므로 진입전 전체 비교 후 동일하면 병합정렬을 수행하지 않도록 한다.
 *      arrayCheck 메서드가 아닌 전체 배열 비교를 한다.
 */


import java.io.*;
import java.util.Arrays;
import java.util.StringTokenizer;

public class S_24062 {
    static long[] arrayA;
    static long[] arrayB;
    static long[] temp;
    static boolean check = false;
    static int fix = 0;

    public static void mergeSort (int left, int right) {
        if (left < right && !check) {
            int middle = (left + right) / 2;
            mergeSort(left, middle);
            mergeSort(middle + 1, right);
            merge(left, right, middle);
        }
    }

    public static void merge (int left, int right, int middle) {
        int i = left;
        int j = middle + 1;
        int t = left;

        while (i <= middle || j <= right) {
            if (i <= middle && j <= right) {
                if (arrayA[i] <= arrayA[j]) {
                    temp[t++] = arrayA[i++];
                } else {
                    temp[t++] = arrayA[j++];
                }
            } else if (i <= middle && j > right) {
                temp[t++] = arrayA[i++];
            } else {
                temp[t++] = arrayA[j++];
            }
            if (arrayCheck()) { return; }
        }
        while (left <= right) {
            arrayA[left] = temp[left++];
        }
    }

    public static boolean arrayCheck () {
        for (int i = fix; i < arrayA.length; i++) {
            if (temp[i] != arrayB[i]) {
                fix = i;
                return check = false;
            }
        }
        return check = true;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        arrayA = new long[N];
        temp = new long[N];
        arrayB = new long[N];

        StringTokenizer st = new StringTokenizer(br.readLine(), " ");
        for (int i = 0; i < N; i++) {
            long number = Integer.parseInt(st.nextToken());
            arrayA[i] = number;
            temp[i] = number;
        }

        st = new StringTokenizer(br.readLine(), " ");
        for (int i = 0; i < N; i++) { arrayB[i] = Integer.parseInt(st.nextToken()); }

        if (Arrays.equals(arrayA, arrayB)) {
            bw.write('1');
        } else {
            mergeSort(0, arrayA.length - 1);
            bw.write(check ? '1' : '0');
        }
        bw.flush();
        bw.close();
    }
}
