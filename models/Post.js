const mongoose =require('mongoose');

const post_schema=new mongoose.Schema({
    title:{
        type:String,
        required:"Title is required"
    },
    content:{
        type:String,
        required:"Comment is required"
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment",
            required:"Comment is Required"
        }
    ]
});


module.exports=mongoose.model("Post",post_schema);