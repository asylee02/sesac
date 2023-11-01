const os = require('os')

const hostname = os.hostname();

const cpus = os.cpus();

// console.log(hostname, cpus)

const totalMemory = os.totalmem();

const GB = totalMemory/1024/1024/1024

console.log(GB, 'GB');

console.log(Math.round(GB))
