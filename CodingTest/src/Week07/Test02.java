package Week07;
//  빠른 과반수 검증
/*
*   투표 결과가 후보 기호를 담은 배열 votes 로 주어진다. 과반수 투표 결과를 출력하는 프로그램을 작성하라.

    입력
    - 0 < votes.length <= 100000
        votes = {1, 4, 2, 2, 2, 3, 2, 2, 1}

    출력
        2
* */

public class Test02 {
    static int solution (int[] votes) {
        int candidate = 0;
        int count = 0;

        for (int sign : votes) {
            if (count == 0) {
                candidate = sign;
                ++count;
            } else if (candidate == sign) {
                ++count;
            } else {
                --count;
            }
        }
        return candidate;
    }


    public static void main(String[] args) {
        int[] votes = {1, 4, 2, 2, 2, 3, 2, 2, 1};  // 2
        System.out.println(solution(votes));

        votes = new int[]{4, 3, 2, 3, 3, 3, 3, 1, 2, 2, 3}; // 3
        System.out.println(solution(votes));
    }
}
