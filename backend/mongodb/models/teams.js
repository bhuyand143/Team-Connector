import mongoose from "mongoose";

const teamSchema=mongoose.Schema({
    team_id:{
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    domain:{
        type:String,
        require:true
    },
    members:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
});

const  Team=mongoose.model('Team',teamSchema);

export default Team;