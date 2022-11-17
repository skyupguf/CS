// 기초 수학 - 집합

import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;

public class Set01 {
    public static void main(String[] args) {

//      1. 자바에서 집합 사용 - HashSet
        System.out.println("== HashSet ==");
        HashSet set1 = new HashSet();
        set1.add(1);
        set1.add(1);
        set1.add(1);
        System.out.println("set1 = " + set1);
        set1.add(2);
        set1.add(3);
        System.out.println("set1 = " + set1);
        set1.remove(1);
        System.out.println("set1 = " + set1);
        System.out.println(set1.size());
        System.out.println(set1.contains(2));


//      2. 집합 연산
        System.out.println("== 집합 연산 ==");

//      2-1. 교집합
        HashSet<Integer> a = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        HashSet<Integer> b = new HashSet<>(Arrays.asList(2, 4, 6, 8, 10));

        // retainAll은 두 해쉬셋에서 교집합을 찾아내 기준 해쉬셋 값을 교집합 값으로 대체한다.
        // 그리고 리턴 타입은 boolean 이다.
        boolean bool = a.retainAll(b);
        System.out.println("a = " + a);
        System.out.println("bool = " + bool);

        // 위 메서드를 직접 구현해 본다.
        // Iterator 객체를 이용해 이중루프를 해보려 했는데 이중루프를 허용하지 않아 foreach 를 활용한다.
        a = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        Iterator<Integer> itA = a.iterator();
//        Iterator<Integer> itB = b.iterator();

        // Iterator 나 foreach 는 루프 대상인 자료구조를 읽기는 가능하나 쓰기가 되지 않는다.
        // 따라서 c라는 객체를 추가해 교집합을 할당했다.
        // 그렇다면 retainAll 메서드는 어떻게 a 객체를 바로 갱신하는지 궁금하다.
        // 내부동작을 알고 싶다.

        HashSet<Integer> c = new HashSet<>();

        while (itA.hasNext()) {
            boolean check = false;
            Integer el = itA.next();

            for (Integer el2 : b) {
                if (el.equals(el2)) {
                    check = true;
                    break;
                }
            }

            // Iterator 객체가 b를 이중 루프를 돌지 않는다.
//            while (itB.hasNext()) {
//                Integer el2 = itB.next();
//                System.out.println("el2 = " + el2);

//                if (el.equals(itB.next())) {
//                    check = true;
//                    break;
//                }
//            }
            if (check) {
                c.add(el);
            }
        }

//      2-2. 합집합
        boolean bool2 = a.addAll(b);
        System.out.println("합집합 = " + a);
        System.out.println("bool2 = " + bool2);

//      2-3. 차집합
        a = new HashSet<>(Arrays.asList(1, 2, 3, 4, 5));
        boolean bool3 = a.removeAll(b);
        System.out.println("차집합 = " + a);
        System.out.println("bool3 = " + bool3);

    }

}