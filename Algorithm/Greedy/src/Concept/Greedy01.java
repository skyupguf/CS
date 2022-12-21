package Concept;

// 알고리즘 - 그리디 알고리즘
// Activity Selection Problem
/*
*   그리디
*   매 순간 가장 최선의 답을 선택하는 기법
*   - 빠르게 근사치를 계산가능
*   - 그러나 결과적으로 최적해가 아닐 수 있다.
*
*   탐욕적 선택 특성 : 지금 선택이 다음 선택에 영향을 주지 않는지 확인
*   최적 부분 구조 : 전체 문제의 최적해는 부분 문제의 최적해로 이루어져 있는 경우
*       - 동전 문제를 보면 500 100 50 10 원은 상위 동전에 다 속할 수 있다
*       - 만일 400원이 있으면 400원은 500원에 속하지 못하므로 최적 부분 구조 x
*       - 활동선택 문제는 종료 시간이 정렬되어 있지 않을 경우
* */

import java.util.ArrayList;


class Activity {
    String name;
    int start;
    int end;

    public Activity(String name, int start, int end) {
        this.name = name;
        this.start = start;
        this.end = end;
    }
}

public class Greedy01 {
    public static void selectActivity(ArrayList<Activity> list) {
        // 종료시간 기준 오름차순 정렬
        list.sort((x1, x2) -> x1.end - x2.end);

        int curTime = 0;
        ArrayList<Activity> result = new ArrayList<>();
        for (Activity item : list) {
            if (curTime <= item.start) {
                curTime = item.end;
                result.add(item);
            }
        }
        for (Activity item : result) {
            System.out.print(item.name + " ");
        }
        System.out.println();
    }

    public static void main(String[] args) {
        // Test code
        ArrayList<Activity> list = new ArrayList<>();
        list.add(new Activity("A", 1, 5));
        list.add(new Activity("B", 4, 5));
        list.add(new Activity("C", 2, 3));
        list.add(new Activity("D", 4, 7));
        list.add(new Activity("E", 6, 10));
        selectActivity(list);
    }
}
