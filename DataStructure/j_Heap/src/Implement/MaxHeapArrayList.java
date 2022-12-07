package Implement;

// 비선형자료구조 - 힙
// ArrayList 로 최대 힙 구현

import java.util.ArrayList;

class MaxHeap {
    ArrayList<Integer> heap;

    MaxHeap () {
        this.heap = new ArrayList<>();
        heap.add(0);
    }

    void insert (int data) {
        heap.add(data);
        int currentIndex = heap.size() - 1;
        int parentValue = heap.get(currentIndex/2);

        while (currentIndex > 1 && data > parentValue) {
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
                targetIndex = heap.get(leftIndex) > heap.get(rightIndex) ? leftIndex : rightIndex;
            } else if (leftIndex < heap.size()) {
                targetIndex = leftIndex;
            } else { break; }

            int currentValue = heap.get(currentIndex);
            int targetValue = heap.get(targetIndex);

            if (currentValue < targetValue) {
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

public class MaxHeapArrayList {
    public static void main(String[] args) {
        // Test code
        MaxHeap maxHeap = new MaxHeap();
        System.out.println("== 데이터 삽입 ==");
        maxHeap.insert(30);
        maxHeap.insert(40);
        maxHeap.insert(10);
        maxHeap.printTree();
        maxHeap.insert(50);
        maxHeap.insert(60);
        maxHeap.insert(70);
        maxHeap.printTree();
        maxHeap.insert(20);
        maxHeap.printTree();
        maxHeap.insert(30);
        maxHeap.printTree();

        System.out.println();
        System.out.println("== 데이터 삭제 ==");
        System.out.println("삭제: " + maxHeap.delete());
        maxHeap.printTree();
        System.out.println("삭제: " + maxHeap.delete());
        maxHeap.printTree();
        System.out.println("삭제: " + maxHeap.delete());
        maxHeap.printTree();
    }
}
