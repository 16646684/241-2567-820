const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json())
const port = 8000;

// เก็บ user
let users = []
let counter = 1 

/*
GET users สำหรับ user ทั้งหมด
POST user สำหรับสร้าง user
Get user/:id สำหรับดู user ตาม id รายคน
PUT user/:id สำหรับแก้ไข user ตาม id รายคน
DELETE user/:id สำหรับลบ user ตาม id รายคน

*/

// path = GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

// path = POST /user
app.post('/user', (req, res) => {
  let user = req.body;
  user.id = counter
  counter += 1
  users.push(user);
  res.json({message: "User created",user: user});
}); 

// path = PUT /user/:id
app.put('/user/:id', (req, res) => {
  let id = req.params.id;
  let updateUser  = req.body;
  //หา user จาก id ที่ส่งมา
  let selectedIndex = users.findIndex(user => user.id == id) 
  //update user นั้น
  if (updateUser.firstname) {
    users[selectedIndex].firstname = updateUser.firstname
  }
  if (updateUser.lastnamename) {
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname
  }

  res.json({
    message: "User updated",
    date: {
      user: updateUser,
      indexUpdared: selectedIndex
    }
  });
  //ส่งข้อมูล user ที่ update กลับที่เดิม
  res.send(id)
});

//path = DELETE /user/:id
app.delete('/user/:id', (req, res) => {
  let id = req.params.id;

  let selectedIndex = users.findIndex(user => user.id == id) 

  users.splice(selectedIndex, 1)
  res.json({message: "Delete Completer",indexDeleted: selectedIndex})
});
app.listen(port, (req, res) => {
  console.log('Server is running on port' + port);
});


