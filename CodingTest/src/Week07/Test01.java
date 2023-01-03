package Week07;
//  쿼드트리
/*
*   흰색(0)과 검은색(1)로만 이루어진 이진영상(binary image)을 쿼드트리(quad-tree) 방식으로 압축하려 한다.
*   쿼드트리는 압축하려는 영상 전체가 0이면 "0", 전체가 1이면 "1"로 압축한다.
*   영상 전체가 같은 값이 아니라면, 영상을 동일한 크기로 4분할하여 부분 영상 별로 압축한다.
*   각각의 압축 결과를 "(좌상단 우상단 좌하단 우하단)" 과 같이 출력한다. (각 문자 사이에 공백은 쓰지 않는다. ex) (0110))
*   이차원 배열이 주어졌을 때 쿼드트리로 압축한 결과를 문자열로 출력하는 프로그램을 작성하라.

    입력
    - 0 < img.length = img[i].length <= 2048
    - img.length 는 2의 제곱수

        0, 0, 0, 0, 1, 1, 1, 1
        0, 0, 0, 0, 1, 1, 0, 0
        0, 0, 0, 0, 0, 0, 1, 1
        0, 0, 0, 0, 0, 0, 1, 1
        1, 1, 0, 0, 0, 0, 0, 0
        1, 0, 0, 0, 0, 0, 0, 0
        0, 0, 0, 0, 0, 0, 0, 0
        0, 0, 0, 0, 0, 0, 0, 1

    출력
        (0(1(1100)01)((1110)000)(000(0001)))
* */

public class Test01 {
    static int[][] image;
    static StringBuilder compressedImage;


    static String solution (int[][] img) {
        image = img;
        compressedImage = new StringBuilder();
        compressImage(0, 0, image.length);

        return compressedImage.toString();
    }


    static void compressImage(int row, int col, int size) {
        if (checkPossible(row, col, size)) {
            compressedImage.append(image[row][col]);
            return;
        }
        int half = size / 2;

        compressedImage.append('(');
        compressImage(row, col, half);
        compressImage(row, col+half, half);
        compressImage(row+half, col, half);
        compressImage(row+half, col+half, half);
        compressedImage.append(')');
    }


    static boolean checkPossible(int row, int col, int size) {
        int compNum = image[row][col];

        for (int i = row; i < row + size; i++) {
            for (int j = col; j < col + size; j++) {
                if (compNum != image[i][j]) { return false; }
            }
        }
        return true;
    }


    public static void main(String[] args) {
        int[][] img = {
                {0, 0, 0, 0, 1, 1, 1, 1},
                {0, 0, 0, 0, 1, 1, 0, 0},
                {0, 0, 0, 0, 0, 0, 1, 1},
                {0, 0, 0, 0, 0, 0, 1, 1},
                {1, 1, 0, 0, 0, 0, 0, 0},
                {1, 0, 0, 0, 0, 0, 0, 0},
                {0, 0, 0, 0, 0, 0, 0, 0},
                {0, 0, 0, 0, 0, 0, 0, 1}
        };
        System.out.println(solution(img));  // (0(1(1100)01)((1110)000)(000(0001)))

        img = new int[][]{
                {0, 0, 0, 0, 1, 1, 1, 1},
                {0, 0, 0, 0, 1, 1, 1, 1},
                {0, 0, 0, 0, 1, 1, 1, 1},
                {0, 0, 0, 0, 1, 1, 1, 1},
                {1, 1, 1, 1, 0, 0, 1, 1},
                {1, 1, 1, 1, 0, 0, 1, 1},
                {1, 1, 1, 1, 1, 1, 0, 0},
                {1, 1, 1, 1, 1, 1, 0, 0}
        };
        System.out.println(solution(img));  // (011(0110))

        img = new int[][]{{0, 0}, {0, 0}};
        System.out.println(solution(img));  // 0

        img = new int[][]{{0, 1}, {1, 0}};
        System.out.println(solution(img));  // (0110)
    }
}
