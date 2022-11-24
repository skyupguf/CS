package Implement;

// Practice1
// ArrayList 를 이용한 스택 구현

import java.util.ArrayList;

class MyStack1 {
    ArrayList list;

    MyStack1() {
        this.list = new ArrayList();
    }

    boolean isEmpty() {
        return list.size() == 0;
    }

    void push(int data) {
        this.list.add(data);
    }

    Integer pop() {
        if (this.isEmpty()) {
            System.out.println("Stack is empty");
            return null;
        }
        return (int) this.list.remove(list.size() - 1);
    }

    Integer peek() {
        return (int) this.list.get(list.size() - 1);
    }

    public void printStack() {
        System.out.println(this.list);
    }
}

public class Implement01ArrayList {
    public static void main(String[] args) {
        // Test code
        MyStack1 myStack = new MyStack1();
        System.out.println(myStack.isEmpty());
        myStack.push(1);
        myStack.push(2);
        myStack.push(3);
        myStack.push(4);
        myStack.push(5);
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