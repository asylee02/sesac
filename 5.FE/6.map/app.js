const express = require('express');
const nunjucks = require('nunjucks');
const {getSeoulPopulationData} = require('./data');

const app = express();
const port = 3000;

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');


app.get('/', (req, res) => {
    const seoulData = getSeoulPopulationData();
    console.log(seoulData);
    res.render('location.html',seoulData);
});

app.listen(port, () =>{
    console.log('서버레디');
})