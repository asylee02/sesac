function showhide(){
  const divElement = document.querySelector("#myDiv")
  const button = document.querySelector('button')
  if(divElement.style.display === 'none'){
    divElement.style.display = ''
    button.innerText='Hide'
  }
  else if(divElement.style.display === ''){
    divElement.style.display = 'none'
    button.innerText='Show'
  } 
}
setTimeout(()=>{ 
  console.log('reload'); 
  window.reload},3000)
