async function getUser() {
    // 로딩시 사용자 가져오는 함수
    try {
        const res = await axios.get('/users');
        const users = res.data;
        const list = document.getElementById('list');
        list.innerHTML = '';
        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function (key) {
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            const edit = document.createElement('button');
            edit.textContent = 'adjust';
            edit.addEventListener('click', async () => {
                // 수정버튼 클릭
                const name = prompt('Enter the name that you want to modify');
                if (!name) {
                    return alert('You must put the name on it.');
                }
                try {
                    await axios.put('/user/' + key, { name });
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });
            const remove = document.createElement('button');
            remove.textContent = 'delete';
            remove.addEventListener('click', async () => {
                // 삭제버튼 클릭
                try {
                    await axios.delete('/user/' + key);
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log(res.data);
        });
    } catch (err) {
        console.error(err);
    }
}

window.onload = getUser; // 화면 로딩시 getUser 호출
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if (!name) {
        return alert('Enter name.');
    }
    try {
        await axios.post('/user', { name });
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = '';
});