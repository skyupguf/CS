package Implement;


import java.util.LinkedList;
import java.util.Queue;

// 선형 자료구조 - 큐
public class Usage {
    public static void main(String[] args) {
    // 큐의 경우 인터페이스로 구현되어 있으므로 오버라이딩을 해서 사용해야 한다.
    // 따라서, 연결리스트로 간편하게 사용할 수 있다.
        Queue queue = new LinkedList();

        queue.add(1);
        queue.add(2);
        queue.add(3);
        queue.add(4);
        queue.add(5);
        System.out.println(queue);

        System.out.println(queue.poll());
        System.out.println(queue);

        System.out.println(queue.poll());
        System.out.println(queue);

        System.out.println(queue.peek());
        System.out.println(queue);

        System.out.println(queue.contains(1));
        System.out.println(queue.size());
        System.out.println(queue.isEmpty());

        queue.clear();
        System.out.println(queue);
        System.out.println(queue.poll());
        System.out.println(queue.peek());
    }
}