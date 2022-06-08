/*  
//  문제  //
    최소값과 최대값을 리턴할 수 있는 스택을 구현하라.

    1. 기본적인 스택의 기능을 모두 구현한다.

    2. 현재 스택에 저장된 최대값과 최소값을 리턴할 수 있어야 한다.
*/

/*  코드  */
class Stack {
    constructor (size) {
        this.stack = {};
        this.min = [];
        this.max = [];
        this.top = 0;
        this.size = size || MAX_SAFE_INTEGER;
    }
    
    push (data) {
        if (this.top >= this.size) return new Error('stack overflow');
        this.stack[this.top] = data;
        this.top++;
        
        if (this.top === 0) this.min.push(data), this.max.push(data);
        else {
            if (this.min[this.min.length-1] > data) this.min.push(data);
            if (this.max[this.max.length-1] < data) this.max.push(data);
        }
    }

    pop () {
        if (this.top <= 0) return new Error('stack underflow');
        const temp = this.stack[this.top-1];
        delete this.stack[this.top-1], this.top--;
    
        if (this.min[this.min.length-1] === temp) this.min.pop();
        if (this.max[this.max.length-1] === temp) this.max.pop();
        return temp;
    }
    
    top () {
        return this.stack[this.top-1];
    }

    peek (index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.top) return;
        return this.stack[index];
    }
    
    getMin () {
        return this.min[this.min.length-1];
    }

    getMax () {
        return this.max[this.max.length-1];
    }
}
/*
//  접근방법  //
    스택과 별개로 최대값과 최소값을 리턴할 수 있어야 하므로 각각의 값을 저장할 배열이 필요하다.
    최대, 최소값을 배열로 만드는 이유는 스택에서 데이터가 추출될 경우 이전 최소, 최대값을 기억하고 있어야 하기 때문이다.


//  수도코드  //
    1. 기존 스택의 구현에 min과 max 변수를 생성하고 빈 배열을 할당한다.
        1-1. min과 max는 Array.prototype을 활용해 불필요한 변수를 늘리지 않는다.

    2. push (data)는 기존 스택과 동일하게 구현하고 min과 max 로직을 추가한다.
        2-1. stack에 우선 data를 추가하는 로직을 구현한다.
        2-2. stack이 비어있는 경우 min과 max의 값이 동일하기 때문에 분기하여 동일한 경우 각 배열에 동일한 data를 삽입한다.
        2-3. stack에 데이터가 존재할 경우 data가 min의 마지막 값 미만, max의 마지막 값 초과일 경우 push(data를 한다.
    
    3. pop ()의 경우도 마찬가지로 기존 로직을 먼저 구현후 리턴전에 min, max로직을 완성한다.
        3-1. stack에서 추출할 값을 임시 변수 temp에 할당하고 temp를 리턴하기전의 모든 로직을 완성시킨다.
        3-2. temp값과 동일한 값이 min과 max의 마지막 요소값과 동일한지 각각 확인하고 제거한다.
        3-3. temp값을 리턴한다.

    4. top과 peek 메서드는 변동사항 없이 동일하다.

    5. getMin, getMax 메서드를 생성하고 각각 min과 max배열의 마지막 요소 값을 리턴한다.

*/