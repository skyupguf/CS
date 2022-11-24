package Implement;

// Practice2
// 배열을 이용한 기본 큐 직접 구현 (원형 큐)

class MyQueue2 {
    int[] arr;
    int front = -1;
    int rear = -1;

    MyQueue2(int size) {
        this.arr = new int[size];
    }

    boolean isEmpty() {
        return this.front == -1;
    }

    boolean isFull() {
        return (this.front == 0 && this.arr.length == this.rear+1)
                || (this.front != 0 && this.front == this.rear+1);
    }

    void enqueue(int data) {
        if (this.isFull()) {
            System.out.println("Queue is full!");
            return;
        }
        if (this.isEmpty()) {
            this.front = this.rear = 0;

        } else {
            this.rear = (this.rear+1) % this.arr.length;
        }
        this.arr[this.rear] = data;
    }

    Integer dequeue() {
        if (this.isEmpty()) {
            System.out.println("Queue is empty!");
            return null;
        }
        int data = this.arr[this.front];
        if (this.front == this.rear) {
            this.front = this.rear = -1;
        } else {
            this.front = (this.front+1) % this.arr.length;
        }
        return data;
    }

    void printQueue() {
        if (this.isEmpty()) {
            System.out.println("Queue is empty!");
            return;
        }

        int idx = this.front;
        while (idx != this.rear) {
            System.out.print(this.arr[idx] + " ");
            idx++;
            if (idx == this.arr.length) {
                idx = 0;
            }
        }
        System.out.print(this.arr[idx]);
        System.out.println();
    }

}

public class QueueArray {
    public static void main(String[] args) {
        // Test code
        MyQueue2 myQueue = new MyQueue2(5);
        myQueue.enqueue(1);
        myQueue.enqueue(2);
        myQueue.enqueue(3);
        myQueue.enqueue(4);
        myQueue.enqueue(5);
        myQueue.enqueue(6); // Queue is full!

        myQueue.printQueue();   // 1, 2, 3, 4, 5

        System.out.println(myQueue.dequeue());  // 1
        myQueue.printQueue();   // 2, 3, 4, 5

        System.out.println(myQueue.dequeue());  // 2
        myQueue.printQueue();   // 3, 4, 5

        myQueue.enqueue(6);
        myQueue.enqueue(7);
        myQueue.printQueue();   // 3, 4, 5, 6, 7

        System.out.println(myQueue.dequeue());  // 3
        System.out.println(myQueue.dequeue());  // 4
        System.out.println(myQueue.dequeue());  // 5
        myQueue.printQueue();   // 6, 7
        System.out.println(myQueue.dequeue());  // 6
        System.out.println(myQueue.dequeue());  // 7
        myQueue.dequeue();      // Queue is empty!
    }
}
