package Practice;

// Practice 1
// 최소 힙에서 특정 값을 변경하는 코드를 작성하세요.
// 특정 값이 여러개라면 모두 바꿔주세요.

import java.util.ArrayList;

class MinHeap{
    ArrayList<Integer> heap;

    MinHeap() {
        this.heap = new ArrayList<>();
        this.heap.add(0);
    }

    void insert(int data) {
        heap.add(data);

        int cur = heap.size() - 1;
        while (cur > 1 && heap.get(cur / 2) > heap.get(cur)) {
            int parentVal = heap.get(cur / 2);
            heap.set(cur / 2, data);
            heap.set(cur, parentVal);

            cur /= 2;
        }
    }

    Integer delete() {
        if (heap.size() == 1) {
            System.out.println("Heap is empty!");
            return null;
        }

        int target = heap.get(1);

        heap.set(1, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1);

        int cur = 1;
        while (true) {
            int leftIdx = cur * 2;
            int rightIdx = cur * 2 + 1;
            int targetIdx = -1;

            if (rightIdx < heap.size()) {
                targetIdx = heap.get(leftIdx) < heap.get(rightIdx) ? leftIdx : rightIdx;
            } else if (leftIdx < heap.size()) {
                targetIdx = cur * 2;
            } else {
                break;
            }

            if (heap.get(cur) < heap.get(targetIdx)) {
                break;
            } else {
                int parentVal = heap.get(cur);
                heap.set(cur, heap.get(targetIdx));
                heap.set(targetIdx, parentVal);
                cur = targetIdx;
            }
        }

        return target;
    }

    void printTree() {
        for (int i = 1; i < this.heap.size(); i++) {
            System.out.print(this.heap.get(i) + " ");
        }
        System.out.println();
    }
}

public class Practice01 {
    static void solution(MinHeap minHeap, int from, int to) {
//
        for (int i = 1; i < minHeap.heap.size(); i++) {
            if (minHeap.heap.get(i) == from) {
                minHeap.heap.set(i, to);
                upTree(minHeap, i);
                downTree(minHeap, i);
            }
        }
    }

    static void upTree (MinHeap minHeap, int index) {
        int currentValue = minHeap.heap.get(index);
        int parentValue = minHeap.heap.get(index/2);

        while (index > 1 && parentValue > currentValue) {
            minHeap.heap.set(index/2, currentValue);
            minHeap.heap.set(index, parentValue);
            index /= 2;
            parentValue = minHeap.heap.get(index/2);
        }
    }

    static void downTree (MinHeap minHeap, int index) {
        int currentValue = minHeap.heap.get(index);

        while (true) {
            int leftIndex = index * 2;
            int rightIndex = index * 2 + 1;
            int targetIndex = -1;

            if (rightIndex < minHeap.heap.size()) {
                targetIndex = minHeap.heap.get(leftIndex) < minHeap.heap.get(rightIndex) ? leftIndex : rightIndex;
            } else if (leftIndex < minHeap.heap.size()) {
                targetIndex = leftIndex;
            } else { break; }

            int targetValue = minHeap.heap.get(targetIndex);
            if (currentValue > targetValue) {
                minHeap.heap.set(index, targetValue);
                minHeap.heap.set(targetIndex, currentValue);
                index = targetIndex;
            } else { break; }
        }

    }

    public static void main(String[] args) {
        // Test code
        MinHeap minHeap = new MinHeap();
        minHeap.insert(30);
        minHeap.insert(40);
        minHeap.insert(10);
        minHeap.insert(50);
        minHeap.insert(60);
        minHeap.insert(70);
        minHeap.insert(20);
        minHeap.insert(30);
        System.out.println("== 데이터 변경 전 ==");
        minHeap.printTree();

        System.out.println("== 데이터 변경 후 ==");
        solution(minHeap, 30, 100);
        minHeap.printTree();

        solution(minHeap, 60, 1);
        minHeap.printTree();
    }
}
