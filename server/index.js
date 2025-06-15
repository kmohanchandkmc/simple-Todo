const express=require('express')
const cors =require('cors')
const app=express();
const mysql=require('mysql2')

app.use(express.json())
app.use(cors())

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:"admin@123",
    database:'todo'
})

db.connect((err)=>{
    if(!err){
        console.log('connected to database successfully')
    }else{
        console.log(err);
    }
})

app.post('/new-task',(req,res)=>{
    console.log(req.body);
    const q= 'insert into todos (task,createAt,status) values (?,?,?)';
    db.query(q,[req.body.task,new Date(),'active'],(err,result)=>{
        if(err){
            console.log("Faild to store task")
        }else{
            console.log("todo saved");
            const updatedTask='select * from todos';
            db.query(updatedTask,(error,newList)=>{
                res.send(newList)
            })
        }
    })
})

app.get('/read-tasks',(req,res)=>{
    const q='select * from todos';
    db.query(q,(err,result)=>{
        if(err){
            console.log("failed to read tasks");
        }else{
            console.log('get from db');
            res.send(result)
        }
    })
})

app.put('/update-task/:id',(req,res)=>{
    const {id}=req.params;
    const {task}=req.body;
    const q='update todos set task=? where id=?';
    db.query(q,[task,id],(err,result)=>{
        if(err){
            console.log('failed to update');
        }else{
            const updatedTask='select * from todos';
            db.query(updatedTask,(error,newList)=>{
                res.send(newList)
            })
        }
    })
})

app.delete('/delete-task/:id', (req, res) => {
    const { id } = req.params;
    const q = 'DELETE FROM todos WHERE id = ?';
    db.query(q, [id], (err, result) => {
        if (err) {
            console.log('failed to delete task');
            res.status(500).send('Failed to delete task');
        } else {
            const updatedTask = 'SELECT * FROM todos';
            db.query(updatedTask, (error, newList) => {
                if (error) {
                    console.log('failed to fetch updated list');
                    res.status(500).send('Failed to fetch updated list');
                } else {
                    res.send(newList);
                }
            });
        }
    });
});

app.put('/complete-task/:id', (req, res) => {
    const { id } = req.params;
    const q = "UPDATE todos SET status = 'completed' WHERE id = ?";
    db.query(q, [id], (err, result) => {
        if (err) {
            console.log('failed to mark as completed');
            res.status(500).send('Failed to mark as completed');
        } else {
            const updatedTask = 'SELECT * FROM todos';
            db.query(updatedTask, (error, newList) => {
                if (error) {
                    console.log('failed to fetch updated list');
                    res.status(500).send('Failed to fetch updated list');
                } else {
                    res.send(newList);
                }
            });
        }
    });
});

app.listen(5000,()=>{console.log('server stated')})