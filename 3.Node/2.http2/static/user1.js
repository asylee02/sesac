// Fetch를 이용한 DELETE 와 Put 메서드 코드

export async function handleDelete(userId){

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

export async function handle(userId){

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