package Practice;

// Practice 3
// 정수들을 힙 자료구조에 추가하고 n번 삭제 후 절대값이 큰 값부터 출력하세요.

// 입력: 3 0 -2 -5 9 6 -11, 20, -30
// 삭제 횟수: 1
// 출력: 20, -11 9 6 -5 3 -2 0

import java.util.PriorityQueue;

class AbsMaxHeap extends MaxHeap {

    void insert (int data) {
        heap.add(data);
        int currentIndex = heap.size() - 1;
        int parentValue = heap.get(currentIndex/2);

        while (currentIndex > 1 && Math.abs(data) > Math.abs(parentValue)) {
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
                targetIndex = Math.abs(heap.get(leftIndex)) > Math.abs(heap.get(rightIndex)) ? leftIndex : rightIndex;
            } else if (leftIndex < heap.size()) {
                targetIndex = leftIndex;
            } else { break; }

            int currentValue = heap.get(currentIndex);
            int targetValue = heap.get(targetIndex);

            if (Math.abs(currentValue) < Math.abs(targetValue)) {
                heap.set(currentIndex, targetValue);
                heap.set(targetIndex, currentValue);
                currentIndex = targetIndex;
            } else { break; }
        }
        return deleteValue;
    }
}

class Node  implements Comparable<Node> {
    int absNum;
    boolean isMinus;

    Node (int num) {
        this.isMinus = num < 0;
        this.absNum = Math.abs(num);
    }

    @Override
    public int compareTo (Node other) {
        if (this.absNum == other.absNum) {
            return this.isMinus ? -1 : 1;
        } else {
            return this.absNum > other.absNum ? 1 : -1;
        }
    }

}

public class Practice03 {
    public static void solution(int[] nums, int deleteCnt) {

        PriorityQueue<Node> priorityQ = new PriorityQueue<>();
        for (int num : nums) {
            if (num == 0) {
                if (priorityQ.isEmpty()) {
                    System.out.println(0);
                } else {
                    Node node = priorityQ.poll();
                    System.out.println(node.isMinus ? -1*node.absNum : node.absNum);
                }
                continue;
            }
            priorityQ.offer(new Node(num));
        }


//        AbsMaxHeap heap = new AbsMaxHeap();
//
//        for (int num : nums) {
//            heap.insert(num);
//        }
//
//        int cnt = 0;
//        while (heap.heap.size() != 1) {
//            int value = heap.delete();
//            if (cnt++ < deleteCnt) {
//                continue;
//            }
//            System.out.print(value + " ");
//        }
    }

    public static void main(String[] args) {
        // Test code
//        int nums[] = {3, 0, -2, -5, 9, 6, -11, 20, -30};
        int nums[] = {1, -1, 0, 0, 0, 1, 1, -1, -1, 2, -2, 0, 0, 0, 0, 0, 0, 0};
        int deleteCnt = 1;
        solution(nums, deleteCnt);
    }
}
