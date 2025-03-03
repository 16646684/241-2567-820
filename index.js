const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');
const app = express();

app.use(bodyParser.json());
const port = 8000;

// เก็บ user ที่ส่งมาจาก client
let users = [];

let conn = null;

/*
GET /users สำหรับ get ข้อมูล user ทั้งหมด
POST /user สำหรับสร้าง user ใหม่บันทึกเข้าไป
GET /user/:id สำหรับ get ข้อมูล user รายคนที่ต้องการ
*/
const initmysql = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user:'root',
        password: 'root',
        database: 'webdb',
        port: 8830
    })
}


/*app.get('/testdb-new', async (req, res) => {

    try {
        const results = await conn.query('SELECT * FROM users')
        res.json(results[0]) // ส่งข้อมูลกลับไปที่ results ในรูปแบบ json
    } catch (error) { 
        console.log('Erro fetching users:', error.message)
        res.status(500).json({error:'Error fetching users'})
        
    }
    
})*/

// path = GET /users
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users')
    res.json(results[0]);
});

// path = POST /user
app.post('/users', async (req, res) => {
    try{
        let user = req.body;
    const results = await conn.query('INSERT INTO users SET?',user)
    console.log('results',results)
    res.json({
        message: 'User created',
        data: results[0]
    })
    } catch(error) {
        console.error('errorMessage',error.Message)
        res.status(500).json({
            message:'Something went wrong',
            errorMessage: error.message
        }) 


    }

});

// path = PUT /user/:id
app.put('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;
    // หา index ของ user ที่ต้องการแก้ไข
    let selsctedIndex = users.findIndex(user =>user.id == id )
    // update user
    if(updateUser.firstname){
        users[selsctedIndex].firstname = updateUser.firstname;
    }

    if(updateUser.lastname){
        users[selsctedIndex].lastname = updateUser.lastname;
    }
    

    res.json({
        message : "User updated",
      data:{
        user : updateUser,
        indexUpdate : selsctedIndex
      }
    });
});

// path = DELETE /user/:id
app.delete('/user/:id', (req, res) => {
    let id = req.params.id;
    // หา index ของ user ที่ต้องการลบ
    let selsctedIndex = users.findIndex(user =>user.id == id)

    users.splice(selsctedIndex, 1);   
    res.json({
        message : "User deleted",
        indexDeleted : selsctedIndex
    });
});

app.listen(port, async(req, res) => {
    await initmysql();
    console.log('Server is running on port' + port);
});
