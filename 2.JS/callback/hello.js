function greet(name, callback){
  const message = `안녕 ${name}`
  callback(message);
}

function displayGreeting(greeting){
  console.log(greeting);
}

greet("예제",displayGreeting)