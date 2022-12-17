package Test;
//  알고리즘 수업 - 버블 정렬 3 (https://www.acmicpc.net/problem/23970)
/*
*   코딩해야 하는 버블정렬 수도코드
---------------------------------------------------------------------------
    bubble_sort(A[1..N]) { # A[1..N]을 오름차순 정렬한다.
        for last <- N downto 2
            for i <- 1 to last - 1
                if (A[i] > A[i + 1]) then A[i] <-> A[i + 1]  # 원소 교환
    }
---------------------------------------------------------------------------
*   입력 1. 첫째 줄에 배열 A, B의 크기 N(5 ≤ N ≤ 10,000)이 주어진다.
*       2. 다음 줄에 서로 다른 배열 A의 원소 A1, A2, ..., AN이 주어진다. (1 ≤ Ai ≤ 10^9)
*       3. 다음 줄에 서로 다른 배열 B의 원소 B1, B2, ..., BN이 주어진다. (1 ≤ Bi ≤ 10^9)
*
*   출력 1. 버블 정렬로 배열 A를 오름차순 정렬하는 과정에서 배열 A가 배열 B와 같은 경우가 발생하면 1, 아니면 0을 출력한다.
*
*   풀이과정
*       수도코드대로 버블정렬을 하는 중에 정렬이 일어나는 위치에 표시를 해두고 해당 스왑이 표시해둔 인덱스에서 발생하면 비교한다.
* */

import java.io.*;
import java.util.StringTokenizer;


public class G_23970 {
    static int[] A;
    static int[] B;
    static int check = 0;

    public static void bubbleSort () {
        for (int i = 0; i < A.length; i++) {
            for (int j = 0; j < A.length-1; j++) {
                if (A[j] > A[j+1]) {
                    int temp = A[j];
                    A[j] = A[j + 1];
                    A[j + 1] = temp;
                    if (check == j) { compare(); }
                }
            }
            if (check == -1) { return; }
        }
    }

    public static void compare () {
        for (int i = check; i < A.length; i++) {
            if (A[i] != B[i]) {
                check = i;
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

        compare();
        if (check != -1) { bubbleSort(); }
        bw.write(check == -1 ? '1' : '0');
        bw.flush();
        bw.close();
    }
}