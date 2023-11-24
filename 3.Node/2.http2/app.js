const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const querystring = require('querystring')
const parse = querystring.parse

const SUCCESS = 200;
const SERVER_ERROR = 500;
const NOT_FOUND = 404;

const users = {};

// 서버의 개체 생성
const server = http.createServer(async (req, res) => {
    console.log(req.method, req.url);
    try {

        if (req.method === 'GET' && req.url.startsWith('/static')) {
            // URL 파싱해서 파일 불러와서 반환한다
           const filePath = '.'+req.url;
           console.log('filePath는 ',filePath)
           const data = await fs.readFile(filePath);
           const contentType = getContentType(filePath);
           res.writeHead(200, {'Content-Type': contentType});
           return res.end(data);
        }
        if (req.method === 'GET') {
            if (req.url === '/') {
                const data = await fs.readFile('./index.html')
                res.writeHead(SUCCESS, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(data)
            } else if (req.url === '/about') {
                const data = await fs.readFile('./about.html')
                res.writeHead(SUCCESS, {'Content-Type': 'text/html; charset=utf-8'})
                res.end(data)
            }
            else if (req.url === '/user') {
                res.writeHead(SUCCESS, {'Content-Type': 'text/html; charset=utf-8'})
                console.log('사용자 조회')
                console.log(users)
                res.end(JSON.stringify(users))
            // } else if (req.url === '/images/tree.jpg'){
            //     const data = await fs.readFile('../images/tree.jpg');
            //     res.writeHead(SUCCESS, {'Content-Type': 'image/jpg'});
            //     res.end(data);
            } else {
                // Step4. 동적 이미지 요청 핸들링
                const imageMatch = req.url.match(/^\/image\/(.+)$/);
                if (imageMatch) {
                    const imageName = imageMatch[1];
                    const imagePath = path.join(__dirname, './static/', imageName);
                    try {
                        const imageData = await fs.readFile(imagePath);
                        console.log(imageData);
                        const contentType = getContentType(imagePath);
                        console.log(contentType);
                        res.writeHead(200, { 'Content-Type': contentType });
                        return res.end(imageData);
                    } catch (error) {
                        res.writeHead(404);
                        return res.end('Not Found');
                    }
                } else {
                    res.writeHead(404);
                    return res.end('Not Found');
                }
            }

        } else if (req.method === 'POST') {
            // 요청을 생성할 때
            // 요청 request를 파싱해서.. 처리
            let body=''
           req.on('data', (data) =>{
            body += data
        })
           req.on('end', () =>{
              const formData = JSON.parse(body);
              console.log(body)
              console.log('----------------------------------')
              console.log(formData)

              const username = formData.name;
              const datekey = Date.now()
              console.log(datekey)
              users[datekey] = username;

              console.log('수정완료')
           })
           console.log(body)
            // 결과 response 주는 코드
            res.writeHead(201,{'Content-Type': 'text/plain; charset=utf-8'});
            res.end(body);
        } else if (req.method === 'PUT') {
            console.log('PUT입력')
            let body =''
            if(req.url.startsWith('/user')){
              console.log('user까지 들어옴')
            base_name = req.url.split('/')[2]
            req.on('data', (data) =>{
                body += data
            })
            req.on('end', ()=>{
                const modData = JSON.parse(body);
                console.log(modData)
              const username = modData.name
              const userId = modData.id
              users[userId]=username
            })
          }
          res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
          // 요청을 수정할 때
          res.end('수정 성공')
          
        } else if (req.method === 'DELETE') {
          if(req.url.startsWith('/user')){
            base_name = req.url.split('/')[2]
            delete users[base_name]
          }
          console.log('삭제 성공')
          res.writeHead(200,{'Content-Type': 'text/plain; charset=utf-8'});
            // 요청을 삭제할 때
            res.end('삭제 성공')
        }
    } catch(err) {
        // console.error(err);
        console.error('오류발생', err.message)
        res.writeHead(SERVER_ERROR, {'Content-Type': 'text/plain; charset=utf-8'})
        res.end('서버 오류')
    }
});

// 서버의 포트 정리
const port = 3000;
server.listen(port, () => {
    console.log(`${port}번 포트 열려있음`)
    console.log(`http://localhost:${port}`)
})

// filePath - URL 경로 기반 요청한 내용이 무엇인지 판단해 Content-type 반환
function getContentType(filePath) {
    const extname = path.extname(filePath);
    console.log(extname);
    switch (extname) {
        case '.html':
            return 'text/html; charset=utf-8';
        case '.js':
            return 'application/javascript; charset=utf-8';
        case '.jpg':
            return  'image/jpeg';
        default:
            return 'application/octet-stream';
    }
}