const url = require('url')

const myUrl = 'https://docs.google.com/spreadsheets/d/1qfquu8JxodSCRwDBhwKl_0DyN5cTI69xHJM7G2NV9rA/edit#gid=72532790.robots.txt'

const parseUrl = url.parse(myUrl, true);

console.log('파싱된 url: '+ parseUrl)
console.log('호스트 : '+ parseUrl.host)
console.log('경로 : '+ parseUrl.pathname)
console.log(parseUrl.query[0])
for(let i; i<parseUrl.length; i ++){
  console.log(parseUrl[i])
}
// console.log('쿼리 : '+ parseUrl.query)
