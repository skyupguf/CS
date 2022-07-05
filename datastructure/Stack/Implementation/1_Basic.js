/*  
//  문제  //
    내장 객체 Array.prototype에 정의된 메서드 없이 Stack을 구현하라.

    1. 필요한 멤버 변수 : 데이터를 저장할 Object, 스택의 가장 상단을 가리키는 인덱스, 스택의 전체 크기

    2. 필요한 메서드
        2-1. 스택의 마지막 위치에 데이터를 추가할 수 있어야 한다.
        2-2. 스택의 마지막 위치의 데이터를 추출할 수 있어야 한다.
        2-3. 스택의 마지막 위치의 데이터를 리턴한다.
        2-4. 스택의 특정 위치의 데이터를 리턴한다.
*/

/*  코드  */
class Stack {
    constructor (size) {
        this.storage = {};
        this.top = 0;
        this.size = size || Number.MAX_SAFE_INTEGER;
    }
    
    push (data) {
        if (this.top >= this.size) return new Error('stack overflow');
        this.storage[this.top] = data;
        this.top++;
    }

    pop () {
        if (this.top <= 0) return new Error('stack underflow');
        const temp = this.storage[this.top-1];
        delete this.storage[this.top-1], this.top--;
        return temp;
    }
    
    last () {
        return this.storage[this.top-1];
    }

    peek (index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.top) return;
        return this.storage[index];
    }
}
/*
//  수도코드  //
    1. 멤버 변수를 선언하고 각 변수에 맞는 타입을 할당한다.
        1-1. 인덱스를 key로 data를 value로 저장할 빈 객체를 storage 변수에 할당한다.
        1-2. 스택의 최상단 인덱스를 가리킬 변수 top에 현재 인덱스인 0을 할당한다.
        1-3. 스택을 생성할 때 입력인자 size를 스택의 크기로 할당할 변수를 선언하고 size가 undefined일 경우 정수 최대값을 할당한다.

    2. 인자로 전달받는 data를 스택의 마지막 인덱스에 추가하는 push(data)메서드를 생성한다.
        2-1. 데이터 추가전 top이 size이상인지 확인해 오버플로우 처리를 한다.
        2-2. storage의 비어있는 top에 data를 할당한다.
        2-3. top 인덱스를 1누적해 비어있는 최상단 위치로 갱신한다.
    
    3. 스택의 마지막 인덱스의 데이터를 추출하여 반환하는 pop()메서드를 생성한다.
        3-1. top이 0이하인지 확인하여 언더플로우 처리를 해준다.
        3-2. 변수 temp를 선언하고 현재 최상단 위치인 top-1의 값을 할당한다.
        3-3. 최상단 데이터를 삭제하고 top을 1차감한 후 temp에 할당한 값을 리턴한다.

    4. 최상단의 데이터와 특정 인덱스의 데이터를 확인하는 메서드를 생성한다.
        4-1. top()메서드를 생성하고 현재 스택의 최상단인 top-1을 키로 가진 storage의 값을 리턴한다.
        4-2. peek(index)메서드를 생성하고 index가 양의 정수인지, top이상인지 판단하여 예외처리와 리턴값을 분기한다.


//  에러핸들  //
    1. 멥버변수와 동일한 명칭인 top으로 메서드를 생성시 콘솔에서 메서드가 작동하지 않아 top() -> last() 로 변경        

    
//  시간복잡도  //
    인덱스를 key로 data를 value로 저장하기 때문에 모든 메서드의 연산은 O(1)으로 이루어진다.
*/