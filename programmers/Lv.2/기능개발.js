//  문제요약
//  1. 각 기능은 진도가 100%일 때 서비스에 반영한다, 기능의 개발속도는 모두 다르지만 뒤에 있는 기능은 앞에 있는 기능이 배포될 때 함께 배포한다.
//  2. 배포되어야 하는 순서대로 작업의 진도가 적힌 정수 배열 progresses, 각 작업의 개발 속도가 적힌 정수 배열 speeds 길이는 100이하다. 
//  3. 작업 진도는 100미만, 작업의 속도는 100이하의 자연수이며, 배포는 하루에 한번으로 95% 진도율 기능이 하루 4%이면 2일 뒤에 배포된다.
//  4. 하루에 배포되는 기능들이 몇개인지 배열 형태로 리턴하는 함수를 작성하라.
//  5. progresses = [93, 30, 55], speeds = [1, 30, 5], return [2, 1]
//  6. progresses = [95, 90, 99, 99, 80, 99], speeds = [1, 1, 1, 1, 1, 1], return [1, 3, 2]

//  코드
const countDeployfunc = (progresses, speeds) => {
    let deploy = [], i = 0, cnt = 0;

    while(i < speeds.length) {
        let waiting = Math.ceil((100-progresses[i]) / speeds[i]);
        while(waiting >= Math.ceil((100-progresses[i]) / speeds[i])) cnt++, i++;
        deploy.push(cnt), cnt = 0;
    }
    return deploy;
}
/*
    풀이
    1. progresses의 원소로 100을 빼고 동일한 인덱스의 speeds 원소로 나눈 값을 올림하면 원소마다 날짜가 구해진다.
    2. 우선 동일 날짜에 최종 개수를 리턴할 변수 deploy를 선언하고 빈 배열을 할당한다.
    3. i와 cnt를 0으로 초기화하고 while문을 progress나 speeds 의 길이만큼 i가 작을 때 까지 순회 시킨다.
    4. 1번의 공식을 while문 안에 스택 역할을 할 waiting변수를 선언해 할당한다.
    5. 이중 while문을 통해 1번 공식이 현재 waiting 값보다 클 때까지 cnt와 i를 누적한다.
    6. waiting 보다 큰 수가 나오면 deploy배열에 cnt를 push 하고 cnt를 다시 0으로 초기화 한다.
    7. 위를 반복한다, 이 방식이 이중루프를 돌아도 인덱스를 건너 뛰므로 date를 구하기 위해 루프를 여러번 사용하는 것보다 빠르다.

    시간복잡도
    이중 while문이 쓰였지만 연산을 보면 인덱스를 한번만 루프하므로 1N이다. 즉 O(N)
*/