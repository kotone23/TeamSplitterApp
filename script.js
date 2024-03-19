function divideGroups() {
    const input = document.getElementById('membersInput').value;
    const members = input.split('、').map(member => member.trim()).filter(member => member !== "");
    
    if (members.length === 0){
        document.getElementById('groupA').innerHTML ='';
        document.getElementById('groupB').innerHTML ='';
        document.getElementById('message').innerHTML = `<p class='has-text-danger-dark'>メンバーを入力してください！</p><br>`;
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
    groupDiv.innerHTML = '';

    if (groupId == 'groupA') {
        groupDiv.innerHTML = `<strong>グループA</strong><br>`;
    } else {
        groupDiv.innerHTML = `<strong>グループB</strong><br>`;
    }

    if (members.length > 0) {
        const leaderIndex = Math.floor(Math.random() * members.length);
        const leader = members[leaderIndex];
        groupDiv.innerHTML += `司会: ${leader}<br>`;

        // 司会者をメンバーリストから除外
        members.splice(leaderIndex, 1);
        
        members.forEach(member => {
            groupDiv.innerHTML += `${member}<br>`;
        });
    } else {
        groupDiv.innerHTML += `メンバーがいません！`;
    }
}
