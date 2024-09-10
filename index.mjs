import express from 'express';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 5001;

app.use(express.json());

app.use(cors({
    origin: ['http://localhost:3001', "*"],
    credentials: true
}));

let users = [];

app.get("/" , (req , res) => {
    res.send("hello world");
});

app.get("/users" , (req, res) => {
    res.send({status: "success" , users: users});
})

app.post("/user" , (req, res) => {
    console.log("API HITTED");
    let body = req.body;
    let user = {"name" : body.name, "father_name": body.fatherName, "roll_number": body.rollNumber}
    users.push(user);
    res.send({status: "success" , message: "User Created Success Fully"});
})

app.get("/user/:id" , (req, res) => {
    let user = {"address" : "orangi town" , "phone": "03422080316", "email": "abc@gmail.com"};
    for(let i=0; i < users.length; i++){
        if(users[i]?.roll_number == req.params?.id){
            user = {...user , ...users[i]};
        }
    }
    res.send({status: "success" , user: user});
})

app.delete("/user/:id" , (req, res) => {
    users = users.filter((user , i) => user?.roll_number != req.params?.id);
    res.send({status: "success" , message: `User with roll number ${req.params?.id} has been deleted`});
})

app.put("/user/:id" , (req, res) => {
    let body = req.body;
    let user = {"name" : body.name, "father_name": body.fatherName, "roll_number": req.params?.id}
    for(let i=0; i < users.length; i++){
        if(users[i]?.roll_number == req.params?.id){
            users[i] = user;
        }
    }
    res.send({status: "success" , message: `User with roll number ${req.params?.id} has been Updated`});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})