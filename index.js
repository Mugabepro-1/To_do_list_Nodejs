const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require("body-parser")
const Todo = require('./models/todo')
const mongodb = require('mongodb')
const app = express()

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
mongoose.set("strictQuery", false)


 mongoose.connect("mongodb+srv://admin:12345678promesse@firstclu.foa4nut.mongodb.net/?retryWrites=true&w=majority&appName=Firstclu", {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
        console.log("Connected to the database")
    })
    .catch((error)=> {
        console.log("Failed to connect to the database")
    })


app.post('/', (req, res) =>{
    const todo = new Todo({
        todo : req.body.todoValue
    })
    todo.save()
    .then(result =>{
        res.redirect("/")
    })

})


//To give the entered todo below the input
app.get('/', (req, res) =>{
    Todo.find()
    .then(result =>{
        res.render("index",{data:result})
    })
})

//To delete the data from the database
app.delete('/', (req, res)=>{
     
})

const port = 3000;

app.listen(port, ()=>{
    console.log("App is running on port"+ port)
})