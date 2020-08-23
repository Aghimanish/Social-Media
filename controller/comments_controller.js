const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            }, function(err, comment){
                if(err){req.flash('error', 'Error in Adding Comment'); return res.redirect('back');}
                post.comments.push(comment);
                post.save();
                req.flash('success', 'Comment Added');
                return res.redirect('/');
            });
        }
    }catch(err){
        req.flash('error', 'Post Does not Exists');
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        if(comment.user = req.user.id){
            let postId = comment.post;
            req.flash('success', 'Comment Deleted');
            comment.remove();
            
            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
                return res.redirect('back');
        }else{
            req.flash('error', 'You Are Not Authorized To Delete This Comment');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }  
} 