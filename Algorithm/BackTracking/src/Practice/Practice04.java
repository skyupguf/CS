package Practice;
// Practice4
// sols 배열에 5지 선다 문제의 정답들이 적혀있다.
// 3번 연속 해서 같은 정답이 있는 경우가 없다는 것을 알아낸 후,
// 문제를 찍어서 푼다고 할 때, 5점 이상을 받을 경우의 수를 출력하세요.

// 문제는 총 10문제이며 각 문제당 1점이다.

// 입출력 예시
// sols: {1, 2, 3, 4, 5, 1, 2, 3, 4, 5}
// 결과: 261622

/*
*   수도코드
*   1. 전역변수
*       1-1. 전체 문제 크기를 편의를 위해 problems = 10 할당
*       1-2. 문제의 크기만큼 입력받을 정답변수가 필요하다. answers
*       1-3. 정답을 5개 맞았을 경우를 카운트해서 리턴할 변수 선언
*
*   2. solution 함수
*       2-1. answers 가 존재하지 않은 경우 예외처리
*            if (answers 길이가 0 또는 null) return
*       2-2. 내가 제출한 정답을 체크하기 위한 배열이 필요하다.
*            submit = [문제개수]
*       2-3. 경우의 수로 문제를 찍어서 확인하기 위한 백트래킹 함수호출, 제출한 배열 submit, 정답카운트 0, 현재 위치 0 인자
*            countSolvedCase(제출배열, 정답개수, 현재문제)
*
*   3. countSolvedCase 함수
*       3-1. 백트래킹으로 재귀를 해야하므로 탈출 및 가지치기 조건을 만든다.
*            전체문제 - 푼 문제 = 풀어야할 문제
*            풀어야할 문제와 맞은 문제가 5보다 작으면 가지치기 또는 탈출
*            if(풀어야할 문제 + 맞은 문제 < 5) return
*       3-2. 맞은 문제가 5개가 되면 더 이상 탐색할 필요가 없으니 카운트하고 리턴
*            if(맞은 문제 == 5) count++, return
*       3-3. 푼 문제가 2개이상이 됐을 때 체크해야 한다.
*            if(idx == 2) answers[idx - 1] == answers[idx - 2]
* */


public class Practice04 {
    final static int problems = 10;
    static int[] answers;
    static int count;


    static int solution() {
        if (answers.length == 0) {
            return count;
        }
        count = 0;
        int[] submit = new int[problems];
        countSolvedCase(submit, 0, 0);

        return count;
    }


    static void countSolvedCase(int[] submit, int correct, int idx) {
        if (problems - idx + correct < 5) {
            return;
        }

        if (idx == problems) {
            if (correct >= 5) {
                count++;
            }

        } else {
            int fix = 0;

            if (idx >= 2) {
                if (submit[idx - 1] == submit[idx - 2]) {
                    fix = submit[idx - 1];
                }
            }

            for (int i = 1; i <= 5; i++) {
                if (fix == i) {
                    continue;
                }
                submit[idx] = i;

                if (i == answers[idx]) {
                    countSolvedCase(submit, correct + 1, idx + 1);
                } else {
                    countSolvedCase(submit, correct, idx + 1);
                }
                submit[idx] = 0;
            }
        }
    }


    public static void main(String[] args) {
        // Test code
        answers = new int[]{1, 2, 3, 4, 5, 1, 2, 3, 4, 5};
        System.out.println(solution());

        answers = new int[]{1, 1, 2, 2, 3, 3, 4, 4, 5, 5};
        System.out.println(solution());
    }
}
