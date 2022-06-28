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
        if (!Number.isInteger(data)) return;
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
    스택에 데이터가 추가될 때와 추출될 때의 과정을 차례대로 나열해 본다.
    1. 스택이 비어있을 경우 최대, 최소값은 동일하다.
    2. 스택에 데이터가 삽입될 경우 최소, 최대값과 비교하여 갱신할 수 있어야 한다.
    3. 스택에 데이터가 추출될 경우 최소, 최대값이면 이전 최소, 최대값으로 다시 갱신할 수 있어야 한다.

    즉 핵심은 스택에서 최대, 최소값에 해당하는 데이터가 추출될 때 이전 최대, 최소값을 기억하고 있어야 한다는 것이다.


//  수도코드  //
    1. 기존 스택의 구현에 min과 max 변수를 생성하고 빈 배열을 할당한다.
        1-1. min과 max는 Array.prototype을 활용해 불필요한 변수를 늘리지 않는다.

    2. push (data)는 기존 스택에 min과 max 로직을 추가한다.
        2-1. 정수를 다루는 스택이기 때문에 최우선적으로 data가 정수인지 판별해서 예외처리 한다.
        2-2. 정수 판별 후 오버플로우를 체크하고 스택에 data를 추가한다.
        2-3. stack이 비어있는 경우 min과 max의 값이 동일하기 때문에 각 배열에 동일한 data를 삽입한다.
        2-4. stack에 데이터가 존재할 경우 data가 min의 마지막 값 미만, max의 마지막 값 초과일 경우 각 배열에 삽입한다.
        2-5. 모든 작업이 완료되면 top을 누적한다.
    
    3. pop ()의 경우도 마찬가지로 기존 로직을 먼저 구현 후 리턴전에 min, max로직을 완성한다.
        3-1. stack에서 추출할 값을 임시 변수 temp에 할당하고 temp를 리턴하기전의 모든 로직을 완성시킨다.
        3-2. temp값과 min, max배열의 마지막 요소값이 동일한 경우 제거한다.
        3-3. temp값을 리턴한다.

    4. last와 peek 메서드는 변동사항 없이 동일하다.

    5. getMin, getMax 메서드를 생성하고 각각 min과 max배열의 마지막 요소 값을 리턴한다.


//  복잡도  //
    각 메서드는 모두 스택로직을 기반으로 하기 때문에 O(1)의 시간복잠도에 모두 작동된다.
    하지만, min과 max의 추가 배열이 따로 필요하기 때문에, 데이터를 2중으로 저장하게 되므로 O(N)의 추가공간이 필요하다.
*/

/*
//  리팩토링  //
    추가공간 없이 최대, 최소값을 탐색할 수 있는 스택을 설계해 보자.
*/

/*  코드  */
class Stack {
    constructor (size) {
        this.stack = {};
        this.min;
        this.max;
        this.top = 0;
        this.size = size || Number.MAX_SAFE_INTEGER;
    }
    
    push (data) {
        if (!Number.isInteger(data)) return;
        if (this.top >= this.size) return new Error('stack overflow');
        
        if (this.top === 0) this.stack[this.top] = data, this.min = data, this.max = data;
        else {
            if (this.min > data) this.stack[this.top] = data - this.min, this.min = data;
            else if (this.max < data) this.stack[this.top] = data + this.max, this.max = data;
            else this.stack[this.top] = data;
        }
        this.top++;
    }

    pop () {
        if (this.top <= 0) return new Error('stack underflow');

        let temp = this.stack[this.top-1];
        if (this.min > temp) [this.min, temp] = [this.min-temp, this.min]; 
        else if (this.max < temp) [this.max, temp] = [temp-this.max, this.max];

        delete this.stack[this.top-1], this.top--;
        return temp;
    }
    
    last () {
        let temp = this.stack[this.top-1];
        if (this.min > temp) temp = this.min; 
        else if (this.max < temp) temp = this.max;
        return temp;
    }
    
    getMin () {
        return this.min;
    }

    getMax () {
        return this.max;
    }
}
/*
//  접근방법  //
    추가공간을 사용하지 않으려면 이전값을 기억하는 유일한 공간은 stack이므로 이를 활용한다.
    최소값과 최대값을 상수로 할당하기 위해 스택에는 변형된 입력값을 삽입해야 한다.
    이 변형된 입력값은 추출하거나 확인할 때 원본값으로 리턴되도록 해야한다.
    
    삽입시
    1. 삽입값이 최소값인 경우 (삽입값 - 현재 최소값)을 stack에 삽입하고 최소값은 삽입값으로 갱신한다.
    2. 삽입값이 최대값인 경우 (삽입값 + 현재 최대값)을 stack에 삽입하고 최대값은 삽입값으로 갱신한다.
    3. 해당되지 않는 경우 stack에 값을 삽입한다.
    
    추출시
    1. 최소값 > 추출값인 경우 (최소값 - 추출값)을 최소값으로 갱신하고 스택에서 추출값을 제거, 최소값을 리턴한다.
    2. 최대값 < 추출값인 경우 (추출값 - 최대값)을 최데값으로 갱신하고 스택에서 추출값을 제거, 최소값을 리턴한다.
    3. 해당되지 않는 경우 stack에서 값을 추출한다.

    즉, 스택에 변형해서 기록하고 추출할 때 복원해서 추출한다.


//  수도코드  //
    1. 기존 스택 멤버변수에서 min과 max변수에 상수를 할당하도록 선언만 해둔다.

    2. push메서드에서 stack의 데이터 존재여부, 최대, 최소값의 갱신여부로 각각 분기한다.
        2-1. 스택이 비어있을 경우 stack삽입값, 최대, 최소값을 동일하게 할당한다.
        2-2. 스택에 데이터가 존재할 경우에 다시 3가지의 경우로 분기한다.
        2-3. min > data의 경우 (data - min)을 stack에 삽입하고 min을 data로 갱신한다.
        2-4. max < data의 경우 (data + max)을 stack에 삽입하고 max를 data로 갱신한다.
        2-5. 둘다 해당되지 않으면 stack에 그냥 삽입한다.
        2-6. 모든 작업이 완료됐으면 top을 1누적한다.
    
    3. pop메서드는 추출되는 3가지 경우를 고려한다.
        3-1. 임시변수 temp를 선언하고 추출할 스택값을 할당한다.
        3-2. min > temp일 경우 (min - temp)로 이전 최소값을 복원하여 현재 min에 할당하고 temp엔 min을 할당한다.
        3-3. max < temp일 경우 (temp - max)로 이전 최대값을 복원하여 현재 max와 temp를 분해할당한다.
        3-4. 둘 다 해당되지 않는 경우 temp에 할당한 추출값을 그대로 리턴하면 된다.
        3-5. stack에 추출할 값을 제거하고 top을 1차감한 후 temp를 리턴한다.

    4. last메서드의 경우 최대, 최소값일 경우 복원 값을 리턴해야 한다.
        4-1. temp임시변수를 선언하고 stack의 마지막 값을 할당한다.
        4-2. temp가 최소값 보다 작으면 min을 최대값 보다 크면 max를 temp에 할당한다.
        4-3. temp를 리턴한다.

    5. peek 메서드의 경우 시간 복잡도가 O(N)이 소요될 수 있으므로 꼭 필요하지 않으면 추가하지 않는다.


//  복잡도  //
    시간복잡도는 기존 스택로직을 그대로 유지하면서 추가 공간 없이 스택을 활용할 수 있다.
*/