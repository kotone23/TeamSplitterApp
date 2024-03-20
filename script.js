// ページ読み込み時に前回のメンバーリストをテキストエリアにセット
document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('members')) {
        document.getElementById('membersInput').value = localStorage.getItem('members');
    }
});

function divideGroups() {
    const input = document.getElementById('membersInput').value;
    // 入力されたメンバーリストをlocalStorageに保存
    localStorage.setItem('members', input);
    const members = input.split('、').map(member => member.trim()).filter(member => member !== "");
    
    if (members.length === 0){
        document.getElementById('groupA').innerHTML ='';
        document.getElementById('groupB').innerHTML ='';
        document.getElementById('message').innerHTML = `<div class="notification is-danger is-light">メンバーを入力してください！</div><br>`;
    } else {
        document.getElementById('message').innerHTML ='';
        const shuffled = members.sort(() => 0.5 - Math.random());
        const midpoint = Math.ceil(shuffled.length / 2);
        const groupA = shuffled.slice(0, midpoint);
        const groupB = shuffled.slice(midpoint);
    
        displayGroup('groupA', groupA);
        displayGroup('groupB', groupB);
    }
}

function displayGroup(groupId, members) {
    const groupDiv = document.getElementById(groupId);
    let content = ''; // コンテンツを追加するための一時的な変数

    if (groupId == 'groupA') {
        content += `<div class="box"><strong>グループA</strong><br>`;
    } else {
        content += `<div class="box"><strong>グループB</strong><br>`;
    }

    if (members.length > 0) {
        const leaderIndex = Math.floor(Math.random() * members.length);
        const leader = members[leaderIndex];
        content += `司会: ${leader}<br>`;

        // 司会者をメンバーリストから除外
        members.splice(leaderIndex, 1);

        members.forEach(member => {
            content += `${member}<br>`; // メンバー追加
        });
        content += `</div><br>`; // boxクラスのdivを閉じる
    } else {
        content += `メンバーがいません！</div>`; // ここでもboxクラスのdivを閉じる
    }

    groupDiv.innerHTML = content; // 最終的なコンテンツをgroupDivに設定
}

function clearInput() {
    console.log('clear');
    // テキストエリアの内容をクリア
    document.getElementById('membersInput').value = '';
    // localStorageからメンバーリストを削除
    localStorage.removeItem('members');
    // オプション: メッセージエリアがあれば、その内容もクリアする
    document.getElementById('message').innerText = '';
}
