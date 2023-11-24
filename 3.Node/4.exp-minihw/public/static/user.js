document.addEventListener('DOMContentLoaded', async() => {
    const form = document.getElementById('form');
    const username = document.getElementById('username')

    console.log(form, username);
    //페이지 최초 로딩시 백엔드에 사용자 데이터 요청
    await updateTable()


    // submit시, Input 값을 서버에 전달
    form.addEventListener('submit', async (ev) => {
        // form 원래 기능인 다른 페이지 요청하는 것 못하게
        ev.preventDefault();
        const name = username.value;
        username.value=''

        if (!name) {
            alert('이름을 입력하세요')
            return
        } 

        // fetch로 내가 원하는 API 정보 불러옴
        // 이름을 JSON 형식으로 바디에 담아서 POST 요청
        try {
            const response = await fetch('/user', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({name}),
            })
    
            if (response.ok) {
                alert('등록 성공')
                // 등록 성공시 화면 컴포넌트 추가
                updateTable();
            } else {
                const errorMessage = await response.text()
                alert(`등록 실패: ${errorMessage}`)
            }
        } catch (error) {
            console.error('등록 중 오류 발생:', error);
            alert('등록 중 오류 발생')
        }
    })
})


// 최신 정보 갱신
async function updateTable() {
    // 갱신을 위한 최신 정보 가져오기 
    await fetch('/user')
        .then(response => response.json())
        .then(users => displayaUsers(users))
        .catch(error => console.error("사용자 정보 불러오기 실패", error));
}

// 정보를 Users로 뽑아오기
function displayaUsers(users) {
    // users에는 json 포맷의 사용자 데이터를 다 가지고 있음
    const userTable = document.getElementById('userTable');
    //테이블 초기화해서 두번씩 안뜨게하기
    userTable.innerHTML = '';
    if (Object.keys(users).length === 0) {
        const messageBox = document.createElement('div')
        messageBox.textContent = '등록된 사용자가 없다'
        userTable.appendChild(messageBox);
    } else {
        for (const key in users) {
            const row = document.createElement('div')
            row.innerHTML = `<string>ID:</string> ${key}, <string>Name: </string>${users[key]}
            <button onclick="modifyUser(${key})">수정</button>
            <button onclick="deleteUser(${key})">삭제</button>`
            userTable.appendChild(row);
        }
    }
}

async function deleteUser(userId){

    //사용자에게 삭제 유무 확인
    const confirmDelete = confirm(`${userId}를 정말로 삭제하시겠습니까?`)
    if(confirmDelete){
        const response = await fetch(`/user/${userId}`,{
            method:'DELETE',
        });
    
        if(response.ok){
            //화면 갱신
            await updateTable();
        }else{
            const errorMessage = await response.text();
            throw new Error(`삭제 실패 : ${errorMessage}`)
        }
    }
    
    
}

async function modifyUser(userId){

    const confirmModify = prompt(`수정할 이름을 입력하세요.`)

    await fetch(`/user/${userId}`,{
        method:'PUT',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
            id: userId,
            name: confirmModify,
        })
    }).then(async(res)=>{
    if(res.ok){
        await updateTable();
    }
    })
}