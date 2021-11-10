//  문제요약
//  1. 내장 객체 Array.prototype에 정의된 메서드 없이 Stack을 구현하라.
//  2. 필요한 멤버 변수 : 데이터를 저장할 Object타입의 storage, 스택의 가장 상단을 가리키는 포인터 top = 0
//  3. 필요한 메서드
//     size() : 스택에 추가된 데이터 크기 리턴
//     push() : 스택의 마지막에 데이터를 추가한다.
//     pop() : 스택의 마지막에 추가된 데이터를 삭제하고 삭제한 데이터를 리턴

//  코드
class Stack {
    constructor(size) {
        this.storage = {};
        this.top = 0;
        this.max = size;
    }
    size() {
        return this.top;
    }
    peek(index) {
        return this.storage[index] === undefined 
            ? undefined : this.storage[index];
    }
    push(element) {
        if(this.size() <= this.max) return 'overflow';
        this.storage[this.top] = element;
        this.top++;
    }
    pop() {
        if(this.size() <= 0) return;
        const temp = this.storage[this.top-1];
        delete this.storage[this.top-1], this.top--;
        return temp;
    }
}
/*
    풀이
    1. class를 이용해 사용자 정의 데이터 타입으로 구현한다, constructor로 멤버변수 storage와 top을 정의 한다.
    2. size메서드를 정의 했을 때 현재 스택의 크기 이므로 길이인 top을 리턴한다.
    3. push메서드는 storage에 저장되는 값을 현재 멤버변수 top을 키로 할당한다. 그리고 top을 1누적한다.
    4. pop메서드는 storage 객체에서 현재 top에 해당되는 키값을 제거하고 top을 1차감한다.
    5. top이 0보다 작아질 경우 에러가 발생하지 않도록 undefined를 리턴하도록 한다.

    에러핸들링
    1. top을 0부터 시작하도록 조건이 주어져 있으므로 push가 된 후 top에 1이 누적 되어 마지막 포인터+1이 되어 있다.
    2. pop메서드에서 this.top-1을 키로 가진 값을 리턴하고, 삭제해야 한다.

    리팩토링
    1. 스택생성 시 크기를 입력받아 해당 크기 만큼 데이터가 들어오지 못하도록 제한한다.
    2. 인덱스를 입력받아 해당 인덱스에 해당하는 값을 리턴하는 메서드를 추가한다.
*/
