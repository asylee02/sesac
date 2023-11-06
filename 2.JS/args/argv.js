
let numRecords = process.argv[1];
let displayFormat = process.argv[3];
console.log(process.argv)

for (let i =0; i<numRecords.length; i++){
  // console.log(i)
}

if(displayFormat=='csv'){
  console.log('Printing result to csv..')
}
else if(displayFormat=='html'){
  console.log('Printing result to html..')
  }
else{
  console.log('Printing to screen...')
}