//  문제요약
//  1. 채팅방 출입 메세지가 "[닉네임]님이 들어왔습니다.", "[닉네임]님이 나갔습니다." 로 표시된다.
//  2. 채팅방에서 닉네임이 변경되면 모든 채팅로그의 닉네임이 변경되어야 한다.
//  3. "Muzi님이 들어왔습니다.", "Prodo님이 들어왔습니다.", "Muzi님이 나갔습니다." 이 때 Muzi가 Prodo로 변경하고 재입장시
//  4. "Prodo님이 들어왔습니다.", "Prodo님이 들어왔습니다.", "Prodo님이 나갔습니다." "Prodo님이 들어왔습니다." 이렇게 변경된다.
//  5. 닉네임 메세지 로그가 담긴 record의 길이는 1~100,000 사이며, record의 형태는 아래와 같다.
//  6. ["Enter uid1234 Muzi", "Enter uid4567 Prodo", "Leave uid1234", "Enter uid1234 Prodo", "Change uid4567 Ryan"] 이는 최종 출력시
//  7. ["Prodo님이 들어왔습니다.", "Ryan님이 들어왔습니다.", "Prodo님이 나갔습니다.", "Prodo님이 들어왔습니다."]이 되어야 한다.
//  8. 채팅방에 출입 메세지가 담긴 배열 record가 모든 기록이 처리된 후, 최종 메시지를 담은 문자열 배열 형태를 리턴하라.

//  코드
const printFinalMessage = (record) => {
    const assignedNick = {}, messageLog = [];
    const state = {Enter: '님이 들어왔습니다.', Leave: '님이 나갔습니다.'};

    for(let i=0; i<record.length; i++) {
        let [state, id, nickname] = record[i].split(' ');
        if(nickname) assignedNick[id] = nickname;
        if(state !== 'Change') messageLog.push([id, state]);
    }
    return messageLog.map(log => assignedNick[log[0]] + state[log[1]]);
}
/*
    풀이
    1. Enter : "들어왔습니다.", Leave : "나갔습니다.", change는 해당 닉네임을 변경
    2. 닉네임이 변경되면 인덱스에 관계없이 전부 적용되어야 하므로 아이디를 키로 닉네임을 값쌍으로 객체에 할당한다.
    3. 이제 변경된 id와 상태를 메세지로 띄우기 위해 record[i]를 구조분해할당으로 변수에 할당한다.
    4. state가 Leave일 경우 제외하고 id-nickname 키-값으로 객체에 할당한다.
    5. 'Change'일 경우를 제외하고 [id, state]를 리턴할 메세지를 담을 배열 messageLog에 push한다.
    6. state 상태를 'Enter'와 'Leave'를 키로 하고 해당 키에 맞는 문자를 값으로 할당한다.
    7. messageLog를 루프하면서 각 log의 [id, state]를 객체에서 값을 찾아 문자열로 만들어 배열 원소로 리턴한다.

    시간복잡도
    O(N)
*/

	