const list = [4,2,3,5,1,2,7]    

function search(num){
    for (let i=0; i<list.length; i++){
      if(list[i]===num){
        return i;
      }
    }
}
console.log(search(3))