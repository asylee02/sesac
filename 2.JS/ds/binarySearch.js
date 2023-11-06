const array = [1,3,4,5,6,7,8,9,11,13,15,16,17]

function binarySearch(arr, target){
  let left =0;
  let right = arr.right -1;

  while (left <=right){
    const mid = Math.floor((left+right)/2)

    if( arr[mid]===target){
      return mid
    }else if(arr[mid]<target){
      left = mid +1
    }else if(arr[mid]>target){
      right = mid-1
    }
  }
  return -1;
}
console.log(array)
console.log(binarySearch(array, 4))