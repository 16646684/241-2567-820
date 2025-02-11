// import http module เพื่อสร้าง server
const http = require('http');

const host = 'localhost' // กำหนด host ที่ server 0ะรอรับ request www.example.com
const port = 8000 // กำหนด port ที่ server รอรับ request ที่เป็น http request

// กำหนดค่า้ริ่มต้นของ server
const requestListener = function (req, res) {
    res.writeHead(200); //ส่ง status code 200 กลับไปให้ client
    res.end('My first server!');// ส่ง response กลับไปให้ client 
}

const server = http.createServer(requestListener);//สร้าง server ด้วย http.createServer โดยส่ง requestListener ไปเป็น argument
server.listen(port, host, () => { // กำหนดให้ server ทำงานที่ port 8000 และ host คือ localhost
    console.log(`Server is running on http://${host}:${port}`);// แสดงข้อความว่า server กำลังทำงานอยู่ที่ http://localhost:8000
})

