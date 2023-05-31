const express=require('express')
const app=express();
const sequelize=require('./untils/db')
const Score=require('./models/score');
const cors=require('cors');
require('dotenv').config();
const port=process.env.port;




app.use(cors())
app.use(express.json())
  


app.post('/score',async (req,res,next)=>{
    const {uniqueNo,score}=req.body;
    console.log(uniqueNo)
    if(uniqueNo===''){
        console.log('if')
        const generateNumber=Math.floor(Math.random() * 899999 + 100000)
        Score.create({
            point:score,
            uniqueNo:generateNumber,
        })
        res.json({msg:'Successfully Created',flag:true,uniqueNo:generateNumber,score:score})
    }else if(uniqueNo.length>0){
        console.log('else if')
        Score.create({
            point:score,
            uniqueNo:uniqueNo,
        })

        const totalAmount = await Score.sum('point',{
            where:{uniqueNo:uniqueNo}})+parseInt(score);
        
        let scoreData=[]
        let scores=await Score.findAll({attributes:['point','id'],where:{uniqueNo:uniqueNo}});

        scores=[...scores,{id:scores.length+1,point:score}]
        res.json({msg:'Successfully Save',flag:true,score:totalAmount,scoresRecord:scores})

    }
})


sequelize
.sync({})
.then(() => {
  console.log('Models synchronized successfully.');
})
.catch((error) => {
  console.error('Error synchronizing models:', error);
});

app.listen(port,()=>{
    console.log(port)
})