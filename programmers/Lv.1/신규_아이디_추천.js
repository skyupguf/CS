//  문제요약
//  1. 입력으로 들어오는 new_id를 다음과 같은 단계로 변경하는 함수를 작성하라.
//  2. new_id의 모든 대문자를 대응되는 소문자로 치환한다.
//  3. new_id에서 알파벳 소문자, 숫자, 빼기(-), 밑줄(_), 마침표(.)를 제외한 모든 문자를 제거한다.
//  4. new_id에서 마침표(.)가 2번 이상 연속된 부분을 하나의 마침표(.)로 치환한다.
//  5. new_id에서 마침표(.)가 처음이나 끝에 위치한다면 제거한다.
//  6. new_id가 빈 문자열이라면, new_id에 "a"를 대입한다.
//  7. new_id의 길이가 16자 이상이면, new_id의 첫 15개의 문자를 제외한 나머지 문자들을 모두 제거한다.
//  8. 제거 후 마침표(.)가 new_id의 끝에 위치한다면 끝에 위치한 마침표(.) 문자를 제거한다.
//  10. new_id의 길이가 2자 이하라면, new_id의 마지막 문자를 new_id의 길이가 3이 될 때까지 반복해서 끝에 붙인다.
//  11. new_id = "...!@BaT#*..y.abcdefghijklm", return "bat.y.abcdefghi"

//  코드
const convertId = (new_id) => {
    let id = '';
    new_id = new_id.toLowerCase();

    for(let i=0; i<new_id.length; i++) {
        let str = new_id[i], code = str.charCodeAt();

        if((97 <= code && code <= 122) || code === 45 || code === 95 || code === 46 || !isNaN(str)) {
            if(str === '.' && id[id.length-1] === '.') continue;
            id += str;
        }
    }
    if(id[0] === '.') id = id.slice(1);
    if(id.length > 15) id = id.slice(0, 16);
    if(id[id.length-1] === '.') id = id.slice(0, id.length-1);

    if(id === '') id = 'a';
    while(id.length < 3) id += id[id.length-1];
    return id;
}
/*
풀이
1. 모든 단계를 차례대로 코드를 작성하고 리팩토링 가능한 부분을 합쳐 나간다.
2. 우선 모든 문자를 소문자로 치환한다.
3. new_id를 루프하면서 각 원소를 아스키 코드로 변경하고 조건에 맞는 코드이거나 숫자일 경우 id변수에 누적한다.
4. new_id[i]가 '.' 일 경우 i가 0 또는 new_id.length-1 일 경우 .가 바로 앞일 경우 continue로 스킵한다.
5. id변수가 빈문자면 'a'를 할당하고 16자 이상이면 15자까지 자른다.
6. 길이가 3보다 작을 경우 3이 될 때 까지 마지막 문자를 추가한다.

에러핸들링
1. !, @이는 parseInt와 Number로 숫자로 치환된다, 따라서 isNaN으로 숫자 판별을 한다.
2. 가장 앞의 마침표와 가장 뒤의 마침표를 제거하는 순서가 중요하다
3. 가장 앞에 마침표는 문자가 15자를 초과하는지 판단하기 전에 먼저 수행되지 않으면 '.'개수 만큼 마지막 문자들이 잘린다.
4. 가장 뒤의 문자는 문자가 15자를 초과하는지 판단한 후에 수행되지 않으면 15자가 잘린 후 중간마침표가 마지막에 와버린다.

시간복잡도
O(N)
*/