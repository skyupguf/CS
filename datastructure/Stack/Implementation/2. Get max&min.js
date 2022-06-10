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
        this.size = size || Number.MAX_SAFE_INTEGER;
    }
    
    push (data) {
        if (this.top >= this.size) return new Error('stack overflow');
        this.stack[this.top] = data;
        
        if (this.top === 0) this.min.push(data), this.max.push(data);
        else {
            if (this.min[this.min.length-1] > data) this.min.push(data);
            if (this.max[this.max.length-1] < data) this.max.push(data);
        }
        this.top++;
    }

    pop () {
        if (this.top <= 0) return new Error('stack underflow');
        const temp = this.stack[this.top-1];
        delete this.stack[this.top-1], this.top--;
    
        if (this.min[this.min.length-1] === temp) this.min.pop();
        if (this.max[this.max.length-1] === temp) this.max.pop();
        return temp;
    }
    
    last () {
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
        2-1. stack에 top누적을 제외한 추가 로직을 우선 구현한다. 
        2-2. stack이 비어있는 경우 min과 max의 값이 동일하기 때문에 분기하여 동일한 경우 각 배열에 동일한 data를 삽입한다.
        2-3. stack에 데이터가 존재할 경우 data가 min의 마지막 값 미만, max의 마지막 값 초과일 경우 push(data)를 한다.
        2-4. top의 경우 2-2의 stack이 비어있을 경우의 조건을 만들기 위해 top을 가장 마지막에 누적한다.
    
    3. pop ()의 경우도 마찬가지로 기존 로직을 먼저 구현후 리턴전에 min, max로직을 완성한다.
        3-1. stack에서 추출할 값을 임시 변수 temp에 할당하고 temp를 리턴하기전의 모든 로직을 완성시킨다.
        3-2. temp값과 동일한 값이 min과 max의 마지막 요소값과 동일한지 각각 확인하고 제거한다.
        3-3. temp값을 리턴한다.

    4. top과 peek 메서드는 변동사항 없이 동일하다.

    5. getMin, getMax 메서드를 생성하고 각각 min과 max배열의 마지막 요소 값을 리턴한다.


//  복잡도  //
    각 메서드의 작동은 모두 스택로직을 기반으로 하기 때문에 O(1)의 시간에 모두 작동된다.
    하지만, min과 max의 추가 배열이 따로 필요하기 때문에, 데이터를 2중으로 저장하게 되므로 O(N)의 추가공간이 필요하다.
*/

/*
//  리팩토링  //
    추가공간 없이 최대, 최소값을 가져오는 스택을 설계해 보자.
*/

/*  코드  */
class Stack {
    constructor (size) {//기존 스택 멤버변수에서 min과 max변수를 상수단위로 할당하도록 한다.
        this.stack = {};
        this.min;
        this.max;
        this.top = 0;
        this.size = size || Number.MAX_SAFE_INTEGER;
    }
    
    push (data) {
        if (this.top >= this.size) return new Error('stack overflow');
        //우선 stack이 비었을 때 stack삽입값, 최대, 최소값은 동일하다
        if (this.top === 0) this.stack[this.top] = data, this.min = data, this.max = data;
        else {//값을 추가하는 3가지 경우가 존재한다.
            //2. 최대값에 해당되는 경우
            //3. 모두 해당되지 않는 경우
            if (this.min > data) this.stack[this.top] = data - this.min, this.min = data;//1. 최소값에 해당되는 경우 : stack에 data - min을 삽입하고 min을 data로 갱신한다.
            else if (this.max < data) this.stack[this.top] = data + this.max, this.max = data;//2. 최대값에 해당되는 경우 : stack에 data + max을 삽입하고 max를 data로 갱신한다.
            else this.stack[this.top] = data;//3. 둘다 해당되지 않으면 stack에 그냥 삽입한다.
        }
        this.top++;
    }

    pop () {
        if (this.top <= 0) return new Error('stack underflow');
        const temp = this.stack[this.top-1];
        //추출하는 값과 min, max를 모두 비교하여 원본 값으로 복원하여 추출하고 최소, 최대값을 이전으로 갱신해야 한다.
        if (this.min > temp) //추출값이 min보다 작을 경우 최소값에 해당되므로 temp를 최소 값으로 갱신하고 최소값은 min - temp
        
        delete this.stack[this.top-1], this.top--;
    }
    
    last () {
        return this.stack[this.top-1];
    }

    peek (index) {
        if (!Number.isInteger(index) || index < 0 || index >= this.top) return;
        return this.stack[index];
    }
    
    getMin () {
        return 
    }

    getMax () {
        return 
    }
}
/*
//  접근방법  //
    앞선 코드에선 이전 최대, 최소값을 기억하기 위해 배열을 사용하였는데 추가공간 O(N)이 발생하게 된다.
    하지만 간단한 수식을 활용하면 stack의 저장공간으로 기억이 가능하기 때문에 최소, 최대값을 상수단위로 할당할 수 있다.
    stack을 기억공간으로 두고 최소값은 삽입값 - 현재 최소값, 최대값은 삽입값 + 현재 최대값 으로 stack에 기억시켜 둔다.    
    이렇게 할 경우 최대, 최소값이 아닌 경우는 최소, 최대값과 비교 후 확인하여 그냥 추출하면 되고
    최소, 최대값보다 작거나 큰 경우 값을 복원하여 추출하면 된다.


//  수도코드  //
    1. 

    2. 
    
    3. 


//  복잡도  //
    
*/