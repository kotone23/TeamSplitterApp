// ページ読み込み時に前回のメンバーリストをテキストエリアにセット
document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('members')) {
        document.getElementById('membersInput').value = localStorage.getItem('members');
    }
    if (localStorage.getItem('numberOfGroups')) {
        document.getElementById('groupCount').value = localStorage.getItem('numberOfGroups');
    }
});

function divideGroups() {
    const input = document.getElementById('membersInput').value;
    const groupCount = parseInt(document.getElementById('groupCount').value, 10);
    // 入力されたメンバーリストとグループ数をlocalStorageに保存
    localStorage.setItem('members', input);
    localStorage.setItem('numberOfGroups', groupCount.toString());
    const members = input.split('、').map(member => member.trim()).filter(member => member !== "");
    const shuffled = members.sort(() => 0.5 - Math.random());

    // 出力エリアをクリア
    const output = document.getElementById('output');
    output.innerHTML = '';
    
    if (members.length === 0){
        document.getElementById('message').innerHTML = `<div class="notification is-danger is-light">メンバーを入力してください！</div><br>`;
    } else {
        document.getElementById('message').innerHTML ='';
        // グループを作成
        const groups = Array.from({ length: groupCount }, () => []);
    
        // メンバーをグループに分ける
        shuffled.forEach((member, index) => {
            groups[index % groupCount].push(member);
        });
    
        // グループを表示
        groups.forEach((group, index) => {
            // アルファベット順でグループ名を生成 ('A', 'B', 'C', ...)
            const groupName = `グループ${String.fromCharCode(65 + index)}`;
            displayGroup(groupName, group);
        });
    }
}

function displayGroup(groupName, members) {
    const output = document.getElementById('output');
    let content = `<div class="box"><strong>${groupName}</strong><br>`;

    if (members.length > 0) {
        const leaderIndex = Math.floor(Math.random() * members.length);
        const leader = members[leaderIndex];
        content += `司会: ${leader}<br>`; // 司会者決め

        // 司会者をメンバーリストから除外
        members.splice(leaderIndex, 1);

        members.forEach(member => {
            content += `${member}<br>`; // メンバー追加
        });
    } else {
        content += `メンバーがいません！`;
    }

    content += `</div>`;
    output.innerHTML += content;
}

function clearInput() {
    // テキストエリアとグループ数の内容をクリア
    document.getElementById('membersInput').value = '';
    document.getElementById('groupCount').value = '2';
    // localStorageのデータもクリアする
    localStorage.removeItem('members');
    localStorage.removeItem('numberOfGroups');
    // メッセージエリアがあれば、その内容もクリアする
    document.getElementById('message').innerText = '';
}
