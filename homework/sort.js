let list = [4,2,7,1,9,5]

function sort(list){
  const cnt = list.length
  const ans =[]
  for (let i=0; i<cnt; i++){
  min = Math.min(...list)
  ans.push(min)
  list = list.filter((num)=> num!==min)
}
console.log(ans);
}
sort(list);