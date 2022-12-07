package Implement;

// 비선형자료구조 - 힙
// ArrayList 로 최소 힙 구현

import java.util.ArrayList;

class MinHeap {
    ArrayList<Integer> heap;

    MinHeap () {
        this.heap = new ArrayList<>();
        heap.add(0);
    }

    void insert (int data) {
        heap.add(data);
        int currentIndex = heap.size() - 1;
        int parentValue = heap.get(currentIndex/2);

        while (currentIndex > 1 && data < parentValue) {
            heap.set(currentIndex/2, data);
            heap.set(currentIndex, parentValue);
            currentIndex /= 2;
            parentValue = heap.get(currentIndex/2);
        }
    }

    Integer delete () {
        if (heap.size() == 1) {
            System.out.println("Heap is empty!");
            return null;
        }

        int deleteValue = heap.get(1);
        heap.set(1, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1);

        int currentIndex = 1;
        while (true) {
            int targetIndex = -1;
            int leftIndex = currentIndex * 2;
            int rightIndex = currentIndex * 2 + 1;

            if (rightIndex < heap.size()) {
                targetIndex = heap.get(leftIndex) < heap.get(rightIndex) ? leftIndex : rightIndex;
            } else if (leftIndex < heap.size()) {
                targetIndex = leftIndex;
            } else { break; }

            int currentValue = heap.get(currentIndex);
            int targetValue = heap.get(targetIndex);

            if (currentValue > targetValue) {
                heap.set(currentIndex, targetValue);
                heap.set(targetIndex, currentValue);
                currentIndex = targetIndex;
            } else { break; }
        }
        return deleteValue;
    }

    void printTree () {
        for (int i = 1; i < heap.size(); i++) {
            System.out.print(heap.get(i) + " ");
        }
        System.out.println();
    }
}

public class MinHeapArrayList {
    public static void main(String[] args) {
        // Test code
        MinHeap minHeap = new MinHeap();
        System.out.println("== 데이터 삽입 ==");
        minHeap.insert(30);
        minHeap.insert(40);
        minHeap.insert(10);
        minHeap.printTree();
        minHeap.insert(50);
        minHeap.insert(60);
        minHeap.insert(70);
        minHeap.printTree();
        minHeap.insert(20);
        minHeap.printTree();
        minHeap.insert(30);
        minHeap.printTree();

        System.out.println();
        System.out.println("== 데이터 삭제 ==");
        System.out.println("삭제: " + minHeap.delete());
        minHeap.printTree();
        System.out.println("삭제: " + minHeap.delete());
        minHeap.printTree();
        System.out.println("삭제: " + minHeap.delete());
        minHeap.printTree();
    }
}