package Implement;

// Practice2
// 배열을 이용한 기본 스택 직접 구현

class MyStack2 {
    int[] arr;
    int top = -1;

    MyStack2(int size) {
        arr = new int[size];
    }

    boolean isEmpty() {
        return this.top == -1;
    }

    boolean isFull() {
        return this.top+1 == this.arr.length;
    }

    void push(int data) {
        if (this.isFull()) {
            System.out.println("Stack overflow!");
            return;
        }
        this.arr[++this.top] = data;
    }

    Integer pop() {
        if (this.isEmpty()) {
            System.out.println("Stack is empty!");
            return null;
        }
        return this.arr[this.top--];
    }

    Integer peek() {
        if (this.isEmpty()) {
            System.out.println("Stack is empty!");
            return null;
        }
        return this.arr[this.top];
    }

    void printStack() {
        for (int i = 0; i <= top; i++) {
            System.out.print(this.arr[i] + " ");
        }
        System.out.println();
    }
}

public class Implement02Array {
    public static void main(String[] args) {
        // Test code
        MyStack2 myStack = new MyStack2(5);
        System.out.println(myStack.isEmpty());
        myStack.push(1);
        myStack.push(2);
        myStack.push(3);
        myStack.push(4);
        myStack.push(5);
        myStack.push(6);
        myStack.printStack();               // 1, 2, 3, 4, 5

        System.out.println(myStack.peek()); // 5
        myStack.printStack();               // 1, 2, 3, 4, 5

        System.out.println(myStack.pop());  // 5
        System.out.println(myStack.pop());  // 4
        myStack.printStack();               // 1, 2, 3

        System.out.println(myStack.pop());  // 3
        System.out.println(myStack.pop());  // 2
        System.out.println(myStack.pop());  // 1
        myStack.printStack();
    }
}
