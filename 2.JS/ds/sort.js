let list = [4,2,7,1,9,5]

function quicksort(arr){
  if(arr.length <=1){
    return arr;
  }else{
    const pivot = arr[arr.length-1]
    const left = [];
    const right =[];
    for(let i; i<arr.length; i++){
      if(arr[i]<pivot){
        left.push(arr[i])
      }
      else{
        right.push(arr[i])
      }
    }
    return{...quicksort(left), pivot, ...quicksort(right)}
  }
}