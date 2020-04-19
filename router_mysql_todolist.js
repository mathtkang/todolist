const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000

app.listen(port, () => console.log(`start http://localhost:3000`)) 

var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost', // DB를 관리하는 서버주소
    user : 'root',
    password : 'zheld1124',
    database : 'todolist'
});
connection.connect();
app.use(cors());

// todo 라우터로 들어오면 todo 테이블 row 콘솔찍기
app.get('/todo', (req, res) => {
    var sql = 'select * from todolist'
    connection.query(sql, function(err, rows, fields){
        if (err) {
            console.log('에러 발생')
        }
        res.send(rows)
    });
})

// todo/:id -> 해당 아이디만 가져오기
app.get('/todo/:id', (req, res) => {
    var sql = 'select * from todolist where id = ?'
    connection.query(sql,[req.params.id], function(err, rows, fields){
        if (err) {
            console.log('에러 발생')
        }
        res.send(rows)
    });
})

// 해당 아이디의 completed 변경
app.get('/todo/update/:id/:completed', (req, res) => {
    var sql = 'update todolist set completed = ? where id = ?'
    console.log(sql)
    console.log(req.params.completed)
    console.log(req.params.id)
    connection.query(sql,[req.params.completed, req.params.id], function(err, rows, fields){
        if (err) {
            console.log('에러 발생')
        }
        res.send(rows)
    });
})

// 해당 아이디 삭제
app.get('/todo/delete/:id', (req, res) => {
    var sql = 'delete from todolist where id = ?'
    connection.query(sql,[req.params.id], function(err, rows, fields){
        if (err) {
            console.log('에러 발생')
        }
        res.send(rows)
    });
})

// 추가하는 부분
app.get('/todo/insert/:title', (req, res) => {
    var sql = 'insert into todolist(title) values(?)'
    connection.query(sql,[req.params.title], function(err, rows, fields){
        if (err) {
            console.log('에러 발생')
        }
        res.send(rows)
    });
})