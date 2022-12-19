package Week05;
/*
*   총 N개의 나뭇가지로 가지고 있는 나뭇가지를 이용해서 교보재를 준비하려 한다.
*   이미 가지고 있는 나뭇가지의 길이는 branches 배열에 각각 저장되어 있으며, 이것을 잘라서 교보재용 나뭇가지로 만들 수 있다.
*   예를 들어, 길이가 120인 나뭇가지로 길이가 50인 교보재용 나뭇가지는 총 2개 만들 수 있다.
*   모든 교보재용 나뭇가지를 동일한 길이로 만들고자 할 때, 교보재용 나뭇가지의 최대 길이를 구하시오.
*   단, N개의 나뭇가지를 만들 수 없는 경우 -1을 출력하시오.

    입력설명
    0 < N <= 10000000
    0 < branches.length <= 10000
    0 < branches[i] <= 1000000

    출력설명
    교보재용 나뭇가지의 최대 길이를 정수로 반환

    매개변수 형식
    N = 10
    branches = [6, 7, 10, 16, 12]

    반환값 형식
    4
* */

import java.util.Arrays;

public class Test04 {

    static int[] branches;

    public static int solution (int N) {
        int best = -1;
        return best;
    }

    public static void main(String[] args) {
        int N = 10;
        branches = new int[] {6, 7, 10, 16, 12};
        System.out.println(solution(N));
    }
}
