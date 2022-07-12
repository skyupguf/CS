/*
//  문제요약  //
    하나의 스택공간에 N개의 스택을 사용할 수 있도록 논리적으로 설계하라.

    1. 

    1. N Stack은 다음 기능을 필수로 지원해야 한다. 
        1-1. push(sNum, data) : sNum번째 스택에 data를 삽입한다. sNum은 0부터 N-1개까지 존재한다.
        1-2. pop(sNum) : sNum번째 스택에서 top에 위치한 데이터를 추출한다.
    
    2. 논리스택의 개수는 정해져 있지 않고 유동적으로 바뀔 수 있다.


//  접근방법  //
    스택의 size 한도내에서 논리 스택은 유동적으로 변할 수 있다. 스택 사이즈가 10이면 최대 10개의 논리스택으로 구현 가능하다.
    예를 들어, [(1, 2), (3, 4), (5)] 괄호친 부분이 하나의 스택이라고 하면 5가 저장된 3번스택은 pop이 되는 순간 스택 자체가 사라진다.
    따라서, 처음부터 스택을 N/사이즈로 나눠서 설계하면 안된다.

    push메서드를 통해 전달받는 sNum인자를 key로 객체안에 배열을 할당해 data를 push한다.
    따라서, 배열이 공백이 될 경우 해당 키를 제거함으로 스택의 개수를 조절하고 size변수를 통해 오버플로우체크를 할 수 있다.
*/

/*  코드  */
class N_stacks {
    constructor (size) {//sNum을 전달받고 배열로 구현하기 때문에 top변수를 따로 생성하지 않는다.
        this.stack = {};
        this.check = 0;//오버플로우 체크를 위한 현재 사이즈 변수를 하나 선언한다.
        this.size = size || Number.MAX_SAFE_INTEGER;
    }
    
    push (sNum, data) {
        //오버플로우 체크전 sNum이 무한대로 생성되는 것을 방지하기 위해 두 인자중 하나라도 undefined일 경우 에러처리를 해야 한다.
        if (!sNum || !data) return new Error('invalid input');
        if (this.check >= this.size) return new Error('stack overflow');
        //에러처리 후 스택 삽입은 스택의 존재여부로 분기한다.
        //sNum이 stack에 존재하는 key일 경우 해당 key에 존재하는 배열에 data를 push한다.
        if (this.stack[sNum]) this.stack[sNum].push(data);
        //존재하지 않는 스택일 경우 key에 data를 포함한 배열을 할당한다.
        else this.stack[sNum] = [data];
        this.check++;
    }

    pop (sNum) {
        //sNum이 존재하지 않으면 해당 스택에 데이터가 존재하지 않는 것과 같으므로 check를 확인할 필요없이 언더플로우 처리를 해준다.
        if (!this.stack[sNum]) return new Error('stack underflow');
        //해당 스택에서 데이터를 추출할 때 데이터가 빌 경우 스택을 같이 제거해 준다.
        const data = this.stack[sNum].pop();
        if (!this.stack[sNum].length) delete this.stack[sNum];
        this.check--;
        return data;
    }

    top (sNum) {
        //
    }
}
    
//  시간복잡도  //
//  