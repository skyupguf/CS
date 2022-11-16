

public class Stack {

    int top;
    int size;
    int[] storage;

    public Stack(int size) {
        this.top = 0;
        this.size = size;
        this.storage = new int[size];
    }

    public void push(int element) {
        if (this.top >= this.size) {
            System.out.println("Stack overflow");
        } else {
            this.storage[this.top++] = element;
            System.out.println("Added to stack " + element);
        }
    }

    public int pop() {
        int temp = '\0';
        if (this.top <= 0) {
            System.out.println("Stack underflow");
        } else {
            temp = this.storage[--this.top];
            this.storage[this.top] = '\0';
            System.out.println("Deleted to stack " + temp);
        }
        return temp;
    }

    public void getTop() {
        if (this.top <= 0) {
            System.out.println("Stack is empty");
        } else {
            System.out.println("Top element is " + this.storage[this.top-1]);
        }
    }

    public void print() {
        if (this.top <= 0) {
            System.out.println("Stack is empty");
        } else {
            for (int element : this.storage) {
                System.out.println(element);
            }
        }
    }

    public static void main(String[] args) {
        Stack stack = new Stack(3);

        stack.print();
        stack.getTop();
        stack.pop();

        stack.push(0);
        stack.push(1);
        stack.push(2);
        stack.push(3);

        stack.getTop();
        stack.print();

        stack.pop();
        stack.pop();
        stack.pop();
        stack.pop();
    }
}