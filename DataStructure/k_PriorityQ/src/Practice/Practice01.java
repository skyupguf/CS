package Practice;

// Practice 1
// 자바 기본 PriorityQueue 응용
// 나이 순으로 오름차순 또는 내림차순 출력


import java.util.Collections;
import java.util.PriorityQueue;
class Person {
//class Person implements Comparable<Person> {
    String name;
    int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

//    @Override
//    public int compareTo(Person o) {
////        return this.age >= o.age ? 1 : -1;
//        return this.age < o.age ? 1 : -1;
//    }
}

public class Practice01 {
    public static void solution(String[] name, int[] age) {
//        PriorityQueue<Person> priorityQ = new PriorityQueue<>();
//
//        for (int i = 0; i < name.length; i++) {
//            Person person = new Person(name[i], age[i]);
//            priorityQ.offer(person);
//        }
//        while (!priorityQ.isEmpty()) {
//            Person p = priorityQ.poll();
//            System.out.println(p.name + " " + p.age);
//        }
    }

    public static void main(String[] args) {
        String[] name = {"A", "B", "C", "D", "E"};
        int[] age = {30, 20, 45, 62, 35};

//        solution(name, age);

        PriorityQueue<Person> priorityQ = new PriorityQueue<>(
                (Person p1, Person p2) -> p1.age >= p2.age ? 1 : -1);

        for (int i = 0; i < name.length; i++) {
            priorityQ.offer(new Person(name[i], age[i]));
        }

        while (!priorityQ.isEmpty()) {
            Person p = priorityQ.poll();
            System.out.println(p.name + " " + p.age);
        }

    }
}
