const router=require ('express').Router();
const mongoose=require('mongoose');

const Post=mongoose.model("Post");
const Comment=mongoose.model("Comment");

//get all
router.get("/",async (req,res)=>{
   
        const posts=await Post.find({});
        res.send(posts);
   
});

//get by id

router.get("/:postId", async(req,res)=>{
 
        const post=await Post.findOne({_id:req.params.postId});
        res.send(post);

  
});

//post 
router.post("/", async (req,res)=>{
  
    const post=new Post();
    post.title=req.body.title;
    post.content=req.body.content;
    await post.save();
    res.send(post);

   
});

//post updated
router.put("/:postId",async(req,res)=>{


        const post=await Post.findByIdAndUpdate(
            {
                _id:req.params.postId
            },
                req.body,
            {
                runValidators:true, //to check all the mongoose validators
                new:true //return the updated object
            }
        );
        res.send(post);
   
});

//post delete

router.delete("/:postId",async(req,res)=>{

        const post= await Post.findByIdAndRemove({_id:req.params.postId});
        res.send(post);

});


//add comment

router.post("/:postId/comment",async(req,res)=>{

    //finding a post
    const post=await Post.findOne({_id:req.params.postId});

    //creating a comment
    const comment=new Comment();
    comment.content=req.body.comment;
    //relating with post
    comment.post=post._id;
    await comment.save();

    //realtion with post
    post.comments.push(comment._id);
    await post.save();

    res.send(comment);

});

//read comment 

router.get("/:postId/comment",async(req,res)=>{
    const comment=await Post.findOne({_id:req.params.postId}).populate("comments");
    res.send(comment);
});

//update cooment

router.put("/comment/:cId",async(req,res)=>{
    const comment=await Comment.findByIdAndUpdate(
        {_id:req.params.cId},
        req.body,
        {
            runValidators:true, //to check all the mongoose validators
                new:true //return the updated object
        }
    )
    res.send(comment);
});

//delete a comment

router.delete("/comment/:cId",async(req,res)=>{
    const comment=await Comment.findByIdAndDelete({_id:req.params.cId});
    res.send({"message":"Successfully deleted"});
});

module.exports=router;