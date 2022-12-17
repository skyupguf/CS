package Test;
//  알고리즘 수업 - 삽입 정렬 3 (https://www.acmicpc.net/problem/24053)
/*
*   삽입정렬 수도코드
------------------------------------------------------------------
    insertion_sort(A[1..N]) { # A[1..N]을 오름차순 정렬한다.
        for i <- 2 to N {
            loc = i - 1;
            newItem = A[i];

            # 이 지점에서 A[1..i-1]은 이미 정렬되어 있는 상태
            while (1 <= loc and newItem < A[loc]) {
                A[loc + 1] <- A[loc];
                loc--;
            }
            if (loc + 1 != i) then A[loc + 1] = newItem;
        }
    }
------------------------------------------------------------------
*   입력 1. 첫째 줄에 배열 A, B의 크기 N(5 ≤ N ≤ 10,000)이 주어진다.
*       2. 다음 줄에 서로 다른 배열 A의 원소 A1, A2, ..., AN이 주어진다. (1 ≤ Ai ≤ 109)
*       3. 다음 줄에 배열 B의 원소 B1, B2, ..., BN이 주어진다. (1 ≤ Bi ≤ 109)

*   출력 1. 삽입 정렬로 배열 A를 오름차순 정렬하는 과정에서 배열 A가 배열 B와 같은 경우가 발생하면 1, 아니면 0을 출력한다.
* */

import java.io.*;
import java.util.StringTokenizer;


public class G_24053 {
    static int[] A;
    static int[] B;
    static int check;

    public static void insertionSort () {
        for (int i = 1; i < A.length; i++) {
            int j = i;
            int insert = A[j];
            while (j > 0 && insert < A[j-1]) {
                A[j] = A[j-1];
                compare(j);
                if (check == -1) { return; }
                j--;
            }
            A[j] = insert;
            compare(j);
        }
    }

    public static void compare (int i) {
        if (i != check) { return; }
        for (int j = i; j < A.length; j++) {
            if (A[j] != B[j]) {
                check = j;
                break;
            }
            check = -1;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        A = new int[N];
        B = new int[N];

        StringTokenizer stA = new StringTokenizer(br.readLine(), " ");
        StringTokenizer stB = new StringTokenizer(br.readLine(), " ");

        for (int i = 0; i < N; i++) {
            A[i] = Integer.parseInt(stA.nextToken());
            B[i] = Integer.parseInt(stB.nextToken());
        }

        compare(0);
        if (check != -1) { insertionSort(); }
        bw.write(check == -1 ? '1' : '0');
        bw.flush();
        bw.close();
    }
}
