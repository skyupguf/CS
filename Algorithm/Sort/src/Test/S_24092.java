package Test;
//  알고리즘 수업 - 퀵 정렬 3 (https://www.acmicpc.net/problem/24092)
/*
*   입력 1. 첫째 줄에 배열 A, B의 크기 N(5 ≤ N ≤ 10,000)이 주어진다.
*       2. 다음 줄에 서로 다른 배열 A의 원소 A1, A2, ..., AN이 주어진다. (1 ≤ Ai ≤ 10^9)
*       3. 다음 줄에 배열 B의 원소 B1, B2, ..., BN이 주어진다. (1 ≤ Bi ≤ 10^9)
*
*   출력 1. 맞는 경우 '1'
*       2. 틀린 경우 '0'
*
*   풀이과정
*       두 번째 배열은 오름차순 퀵정렬을 할 때 일어나는 단계 중 하나로 문제가 요구하는 대로 퀵 정렬 코딩을 해야한다.
*       피벗 값을 마지막 인덱스로 놓고 시작하기 때문에 만일 피벗을 다른 위치로 놓는다면 단계의 정렬이 일치하지 않게 된다.
*       여기서 문제는 값이 교환될 때 마다 전부 비교를 할 경우 O(N)의 시간이 추가되며 시간초과가 된다.
*
*       완전체의 정렬된 수를 비교하는게 아니라 정해진 단계의 정렬상황을 찾는 것이다.
*       예를 들어, {2, 5, 1, 4, 3} 라면 0번째 인덱스가 2로 시작하는 경우는
*       {2, 5, 1, 4, 3}, {2, 1, 5, 4, 3}, {2, 1, 3, 4, 5} 3가지 뿐이다.
*       최초 비교시 0번 인덱스가 확인됐으면 다른 1번을 체크해 1번째가 스왑될 때 두 배열을 비교하면 된다.
*       스왑이후 여전히 정렬상태가 일치하지 않는 경우는 배열 B는 정렬과정 중 없는 단계가 되므로 더이상, 비교할 필요가 없다.
*
*   에러핸들
*       값이 교환될 때 마다 특정 인덱스 위치를 표시해 두고 탐색하는 방법으로 처음 접근했는데
*       매번 스왑할 때 탐색을 하면 해당 인덱스 위치의 두 배열의 값은 같을 수 있어도 이전에 탐색했던 인덱스의 배열값은 달라질 수 있다.
*       따서라, 한 번 탐색이 완료되고 일치하지 않는 값이 있는 인덱스를 표시해 두면
*       다음에 해당 위치에 스왑이 일어날 때 까지 비교하지 않고 스왑이 해당 인덱스에 일어나면 비교한다.
*       만일 스왑이 일어나지 않는다면 배열 B는 배열 A의 정렬 과정 중 존재하지 않는 단계이다.
*/

import java.io.*;
import java.util.StringTokenizer;


public class S_24092 {
    static long[] A;
    static long[] B;
    //  해당 변수값의 이전 인덱스까지 일치하는지 확인이 된 값, 모두 일치할 경우 -1이다.
    static int check;

    public static void quickSort (int left, int right) {
        if (left >= right) { return; }
        int pivot = partition(left, right);
        quickSort(left, pivot - 1);
        quickSort(pivot + 1, right);
    }

    public static int partition (int left, int right) {
        long pivot = A[right];
        int i = left;
        int j = right;

        while (i < j) {
            while (A[i] < pivot && i < j) { i++; }
            while (A[j] >= pivot && i < j) { j--; }
            swap(i, j);
        }
        swap(j, right);
        return j;
    }

    public static void swap (int i, int j) {
        long temp = A[i];
        A[i] = A[j];
        A[j] = temp;
        //  i와 j 위치에서 스왑이 일어날 경우 표시해둔 check 인지 확인되면 배열 B와 비교해 본다.
        if (check == i || check == j) { compare(); }
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
        A = new long[N];
        B = new long[N];

        StringTokenizer stA = new StringTokenizer(br.readLine(), " ");
        StringTokenizer stB = new StringTokenizer(br.readLine(), " ");

        for (int i = 0; i < N; i++) {
            A[i] = Integer.parseInt(stA.nextToken());
            B[i] = Integer.parseInt(stB.nextToken());
        }

        compare();
        if (check != -1) { quickSort(0, A.length - 1); }
        bw.write(check == -1 ? '1' : '0');
        bw.flush();
        bw.close();
    }
}
