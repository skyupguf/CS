package Practice;

// 알고리즘 - 이진 탐색

public class Practice01 {
    static int[] arr;

    // 반복문 구조
    public static int binarySearch(int target) {
        int left = 0;
        int right = arr.length - 1;

        while (left <= right) {
            int middle = (left + right) / 2;

            if (arr[middle] < target) {
                left = middle + 1;
            } else if (arr[middle] > target) {
                right = middle - 1;
            } else {
                return middle;
            }
        }
        return -1;
    }

    // 재귀 호출 구조
    public static int binarySearch2(int target, int left, int right) {
        if (left > right) {
            return -1;
        }

        int middle = (left + right) / 2;

        if (arr[middle] == target) {
            return middle;
        } else if (arr[middle] > target) {
            return binarySearch2(target, left, middle - 1);
        } else {
            return binarySearch2(target, middle + 1, right);
        }
    }

    public static void main(String[] args) {
        arr = new int[] {1, 2, 5, 10, 20, 30, 40, 50, 60};

        System.out.println("Index: " + binarySearch(30));
        System.out.println();
        System.out.println("Index: " + binarySearch2(30, 0, arr.length - 1));
    }
}
