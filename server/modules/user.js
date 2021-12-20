import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name : { type:String, required: true},
    email : { type:String, required:true},
    password : {type:String, require:true},
    id: {type:String}
})

const user =mongoose.model("User", userSchema);

export default user;