// 코딩 연습장


import java.util.Stack;

//
public class Memo {

    public static void main(String[] args) {
        int[] binaryTree = new int[50*2];
        int delay = 10;

        binaryTree[0] = 0;
        for (int i = 0; i < 50; i++) {
            binaryTree[i * 2 + 1] = 1;
            if (i == delay) {
                binaryTree[i * 2 + 2] = 1;
            }
        }
        int cnt = 0;
        for (int num : binaryTree) {
            if (num == 1) {
                cnt++;
            }
        }
        Stack<Integer> stack = new Stack<>();


    }
}
