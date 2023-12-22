const express = require('express');
const expressWs = require('express-ws');
const WebSocket = require('ws');
const path = require('path');

const port = 3000;

const app = express();
expressWs(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client3.html'));
});

const wsClients = new Map();

app.ws('/chat', (ws, req) => {
    const clientIp = req.socket.remoteAddress;

    console.log('클라이언트 연결 성공:', clientIp);
    
    // 클라이언트로부터 메시지 수신 시 이벤트 처리
    ws.on('message', (message) => {
        const messageString = message.toString('utf8');
        
        // 파싱하여 content와 세션 ID 추출
        const parsedMessage = JSON.parse(messageString);
        const content = parsedMessage.content;
        const username = parsedMessage.username;

        // 세션 ID 설정 (한 번만 설정하면 됨)
        if (username && !wsClients.has(username)) {
            wsClients.set(username, ws);
            broadcastMessage(`[${username}]님이 입장하셨습니다.`);
        }
        
        console.log(`메세지 받기 [${clientIp}]: `, username);

        // 모든 클라이언트에게 메시지 전송
        if (parsedMessage.type !== 'session') {
            wsClients.forEach((client, clientId) => {
                if (client.readyState === WebSocket.OPEN) {
                    const messageType = client === ws ? 'sender' : 'received';
                    const messageObj = {
                        type: messageType,
                        content: content,
                        sender: clientId === username ? '나' : username,
                    };
                    client.send(JSON.stringify(messageObj));
                }
            });
        }
    });

    // 클라이언트와 연결 해제 시 이벤트 처리
    ws.on('close', () => {
        console.log('클라이언트 종료');
        // 연결이 끊긴 클라이언트의 세션을 맵에서 제거
        wsClients.forEach((client, clientId) => {
            if (client === ws) {
                wsClients.delete(clientId);
                broadcastMessage(`[${clientId}]님이 나가셨습니다`);
            }
        });
    });

    // 함수를 사용하여 메시지를 모든 클라이언트에 브로드캐스트
    function broadcastMessage(message) {
        wsClients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                const broadcastObj = {
                    type: 'broad',
                    content: message,
                };
                client.send(JSON.stringify(broadcastObj));
            }
        });
    }
});

// 서버 시작
console.log(`웹 소켓 연결 대기`);

// Start the HTTP server
app.listen(port, () => {
    console.log(`${port}로 열림`);
});