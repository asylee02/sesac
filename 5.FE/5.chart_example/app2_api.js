const express = require('express');
const sqlite3 = require('sqlite3');
const path = require('path');

const app = express();
const port = 3008;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'monthly_revenue2.html'));
});

app.get('/api/chart-data', (req, res) => {

    const db = new sqlite3.Database('user.db');

    // 1. db 접속
    // 2. db 쿼리문
    // orders.orderAt 보고 YYYY-MM 포멧으로 월과
    // group by 통해서 monthly revende 구하는 쿼리 작성
    db.all(
        `Select 
            strftime('%Y-%m', o.OrderAt) AS YearMonth,
            SUM(i.UnitPrice) AS MonthlyRevenue
        From 
            orders o
        JOIN 
            orderitems oi ON o.ID = oi.OrderID
        JOIN
            items i ON oi.ItemID = i.ID
        WHERE
            o.OrderAt >= date('now', '-1 year')
        GROUP BY
            YearMonth
        ORDER BY 
            YearMonth
    `
    , (err, rows) => {
        if (err) {

        } else {
            console.log(rows);
            const labels = (rows.map((row) => row.YearMonth));
            const revenues = (rows.map((row) => row.MonthlyRevenue));
            console.log(labels, revenues);
            res.json({ labels: labels, revenues: revenues });
        };
    });
    // monthly reveue 쿼리로 테이블 그리기
    // 3. db 접속 종료
    db.close();
});

app.listen(port, () => {
    console.log(`${port} 준비 완료`);
});