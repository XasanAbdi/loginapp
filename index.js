import express from 'express';
import mongoose from 'mongoose'
import User from './modules/usermodules.js';
import dotenv from 'dotenv'



dotenv.config()

const app =express();
const port=3000;
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('welcome to node js and expresss')
})

app.get('/:id',async(req,res)=>{
   const { id} = req.params;

   const user = await User.findById(id);
   if (user) {
    res.json(user);
    
   }

})

app.post('/',async(req,res)=>{
    const {name,email,password}=req.body
    const user= new User({
        name,email,password
    });
    const newData= await user.save();
    res.status(201).json(newData);
})

app.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const user= await User.findOne({email});

    if (user) {
        res.status(200).json(user)
    }
})

app.put('/:id',async(req,res)=>{
    const{id}=req.params
    const user=await User.findByIdAndUpdate(id,req.body)
    if(user){
        const updateuser=await User.findById(id);
        res.json(updateuser);
    }
})

app.delete('/:id',async(req,res)=>{
    const{id}=req.params
    const user=await User.findByIdAndDelete(id);
    res.json({message:'succesfully deleted'})
})


app.listen(port,()=>{
    console.log('server is runing on port ${port}')
})

mongoose.connect(process.env.MOGOURL)
.then(()=>{
    console.log('connected to database')
}).catch((e)=>
{
    console.log(e)
})