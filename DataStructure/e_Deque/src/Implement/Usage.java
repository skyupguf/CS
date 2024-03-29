package Implement;


import java.util.ArrayDeque;
import java.util.Deque;

// 선형 자료구조 - 데크
public class Usage {
    public static void main(String[] args) {
        Deque deque = new ArrayDeque();
        // Front 부분 입력
        deque.addFirst(1);
        deque.addFirst(2);
        deque.addFirst(3);
        System.out.println(deque);

        // Rear 부분 입력
        deque.addLast(10);
        deque.addLast(20);
        deque.addLast(30);
        System.out.println(deque);

        // Front 부분 출력
        System.out.println(deque.removeFirst());
        System.out.println(deque);

        // Rear 부분 출력
        System.out.println(deque.removeLast());
        System.out.println(deque);

        System.out.println(deque.pollLast());
        System.out.println(deque.pollFirst());
        System.out.println(deque);
        deque.clear();

        // null 리턴
        System.out.println(deque.pollLast());
        System.out.println(deque.peekFirst());


        // 예외처리가 필요
        //  System.out.println(deque.getFirst());
        //  System.out.println(deque.removeLast());


    }
}