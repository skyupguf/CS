package Test;
/*
  절대값 힙(https://www.acmicpc.net/problem/11286)
   주어진 입력값 중 절대값이 작은 순서대로 정렬하고 입력 값이 0일 경우 하나 씩 출력하라.
  <p>
       입력
       첫째 줄에 연산의 개수 N(1 ≤ N ≤ 100,000)이 주어진다.
       다음 N개의 줄에는 연산에 대한 정보를 나타내는 정수 x가 주어진다.
       x != 0 이면 x라는 값을 추가해 정렬하고 x == 0이면 절댓값이 가장 작은 값을 출력하고 그 값을 제거하는 경우이다.
       입력되는 정수는 -2^31보다 크고, 2^31보다 작다.
  <p>
       출력
       입력에서 0이 주어진 회수만큼 답을 출력한다. 만약 정렬된 값이 존재하지않는데 0이 입력될 경우 0을 출력하면 된다.
*/
/*
*   접근방법
*
*   출력되는 우선순위를 생각해보자.
*       1. 절대값 기준 작은 수
*       2. 동일한 값일 경우 음수인 경우
*
*   우선순위큐를 이용하여 값이 0일 경우 우선순위큐를 확인하고 존재하면 인출해서 출력 없으면 0을 출력한다.
*   그 외의 수들은 출력 우선순위의 조건대로 우선순위큐에 추가한다.
*       1. Math.abs(x) != Math.abs(y) 일 경우 절대값 기준으로 우선순위큐에 추가한다.
*       2. Math.abs(x) == Math.abs(y) 일 경우 본래값 기준으로 우선순위큐에 추가한다.
*
* */

import java.util.Scanner;
import java.util.PriorityQueue;

public class S_11286 {

//    class Node  implements Comparable<Node> {
//        int absNum;
//        boolean isMinus;
//
//        Node (int num) {
//            this.isMinus = num < 0;
//            this.absNum = Math.abs(num);
//        }
//
//        @Override
//        public int compareTo (Node other) {
//            if (this.absNum == other.absNum) {
//                return this.isMinus ? -1 : 1;
//            } else {
//                return this.absNum > other.absNum ? 1 : -1;
//            }
//        }
//
//    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int count = sc.nextInt();

        PriorityQueue<Integer> priorityQ = new PriorityQueue<>((x, y) ->
                Math.abs(x) == Math.abs(y) ? x - y : Math.abs(x) - Math.abs(y));

        for (int i = 0; i < count; i++) {
            int input = sc.nextInt();

            if (input == 0) {
                System.out.println(priorityQ.isEmpty() ? 0 : priorityQ.poll());
            } else {
                priorityQ.offer(input);
            }
        }
    }
}
