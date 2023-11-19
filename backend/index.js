import express, { query } from 'express'
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import seedDB from './mongodb/seeds/index.js';
import mongoose from 'mongoose';
import User from './mongodb/models/users.js';
import Team from './mongodb/models/teams.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));


//Get routes

app.get('/', async (req, res) => {
    res.send('Hello from Heliverse!');
})   


//user

//get
app.route('/api/users').get(async (req, res) => {
    try{
        let page=Number(req.query.page)||0;
        let filter={};
        const {domain,gender,available}=req.query;
        if(!(domain==="null" || domain===""))
        {
            filter.domain=domain;
        }
        if(!(gender==="null" || gender===""))
        {
            filter.gender=gender;
        }
        if(available==='false')
        {
            delete filter.available;
        }
        if(available==='true') filter.available=1;
        const num=await User.find(filter);
        const users=await User.find(filter).skip((page-1)*20).limit(20);
        res.status(200).json({success:true,data:users,total:num});
    }catch(error){
        res.status(500).json({success:false,message:error})
    }
})

app.route('/api/users/:id/').get(async (req, res) => {
    try{
        const user=await User.findOne({'id':req.params.id});
        res.status(200).json({success:true,data:user})
    }catch(error){
        res.status(500).json({success:false,message:error})
    }
})

//post

app.route('/api/users/').post(async(req,res)=>{
    try{
        const {id,firstname,lastname,email,gender,avatar,domain,available}=req.body;
        let avail=(available==='on')?1:0;
        const user=await User.create({id,firstname,lastname,email,gender,avatar,domain,available:avail});
        res.status(200).json({success:true,data:user});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:error})
    }
})


app.route('/api/users/:id').put(async (req, res) => {
        try {
            const filter={'id':req.params.id};
            const user=await User.find({'id':req.params.id});
            const updatedUser = await User.findOneAndUpdate(filter,{
                $set : req.body
            },
            {new :true}
            );
            res.status(200).json({success:true,data:updatedUser});
        } catch (error) {
            res.status(500).json({success:false,message:error});
        }
})

app.route('/api/users/:id').delete(async(req,res)=>{
    try {
        const filter={'id':req.params.id};
        const deletedUser = await User.findOneAndDelete(filter);
        res.status(200).json({success:true,data:deletedUser});
    } catch (error) {
        res.status(500).json({success:false,message:error});
    }
})


//team

app.route('/api/team/:id').get(async(req,res)=>{
    try{
        const teams=await Team.find({'team_id':req.params.id});
        res.status(200).json({success:true,data:teams})
    }catch(error){
        res.status(500).json({success:false,message:error})
    }
})

app.route('/api/team/').post(async(req,res)=>{
    try{
        const crteam={};
        //domain logic
        //  await Team.create(crteam);
        res.status(200).json({success:true,data:crteam});
    }catch(error){
        res.status(500).json({succes:false,message:error});
    }
})

const startServer = async () => {
    try {
        connectDB(process.env.LOCAL_URL);
        app.listen(4000, () => {
            console.log('Server started on port http://localhost:4000');
        })
    } catch (error) {
        console.log(error);
    }
}
startServer();
// seedDB().then(() => {
//     mongoose.connection.close();
// });