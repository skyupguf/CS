package Week06;
//  의리의 고깃집 이벤트
/*
*   고기 부위별 배열 amount 에 부위별 양 amount[i]  만큼의 분량을 준비해 두었으며, 각 부위의 가격은 단위 분량 당 value[i]원이라고 한다.
*   사람들이 먹을 수 있는 고기의 분량을 stomach[j]라고 하자.
*   이 때, 섭취한 고기의 가치가 최대가 되게 했을 때 그 가치(원)을 구하시오.
*   가장 가치가 높은 고기는 친구들끼리 공평하게 같은 양을 먹어야 한다, 즉 1개씩 먹어도 못먹는 친구가 생긴다면 아무도 먹지 않는다.
*
    입력설명
    0 < amount.length = value.length <= 100000
    0 < amount[i] <= 10000
    0 < value[i] <= 10000
    0 < stomach.length <= 100000
    0 < stomach[j] <= 10000

    출력설명
    섭취 가능한 고기의 최대 가치를 정수로 반환

    매개변수 형식
    amount = {7, 10, 4, 5}
    value = {5, 4, 3, 1}
    stomach = {4, 6, 2, 8}

    반환값 형식
    74
* */

import java.util.Map;
import java.util.TreeMap;
import java.util.Comparator;


public class Test02 {

    public static int solution (int[] amount, int[] value, int[] stomach) {
        int result = 0;



        return result;
    }

    public static void main(String[] args) {
        int[] amount = {7, 10, 4, 5};
        int[] value = {5, 4, 3, 1};
        int[] stomach = {4, 6, 2, 8};
        System.out.println(solution(amount, value, stomach));

        amount = new int[] {3};
        value = new int[] {5};
        stomach = new int[] {2};
        System.out.println(solution(amount, value, stomach));
    }
}
