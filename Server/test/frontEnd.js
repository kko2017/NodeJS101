async function getUser() {
    try {
        const res = await axios.get('/users');
        const users = res.data;
        const list = document.getElementById('list');
        list.innerHTML = '';
        Object.keys(users).map((key) => {
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            const edit = document.createElement('button');
            edit.textContent = 'adjust';
            edit.addEventListener('click', async () => {
                const name = prompt('Enter the name that you want to change');
                if (!name) {
                    return alert('Enter name please');
                }
                try {
                    await axios.put(`/user/${key}`, { name });
                    getUser();
                } catch (err) {
                    console.error(err);
                }                
            });
            const remove = document.createElement('button');
            remove.textContent = 'remove';
            remove.addEventListener('click', async () => {
                try {
                    await axios.delete(`/user/${key}`);
                    getUser();
                } catch (err) {
                    console.error(err);
                }
            })
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

window.onload = getUser;
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if (!name) {
        return alert('Enter your name please');
    }
    try {
        await axios.post('/user', { name });
        getUser();
    } catch (err) {
        console.error(err);
    }
    e.target.username.value = '';
});