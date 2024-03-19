function divideGroups() {
    const input = document.getElementById('membersInput').value;
    const members = input.split('、').map(member => member.trim()).filter(member => member !== "");
    const shuffled = members.sort(() => 0.5 - Math.random());
    
    const midpoint = Math.ceil(shuffled.length / 2);
    const group1 = shuffled.slice(0, midpoint);
    const group2 = shuffled.slice(midpoint);

    displayGroup('group1', group1);
    displayGroup('group2', group2);
}

function displayGroup(groupId, members) {
    const groupDiv = document.getElementById(groupId);
    groupDiv.innerHTML = '';

    if (members.length > 0) {
        const leader = members[Math.floor(Math.random() * members.length)];
        groupDiv.innerHTML += `<strong>司会: ${leader}</strong><br>`;
        
        members.forEach(member => {
            groupDiv.innerHTML += `${member}<br>`;
        });
    } else {
        groupDiv.innerHTML = 'メンバーがいません！';
    }
}
