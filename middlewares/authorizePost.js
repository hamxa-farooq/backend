import jwt_decode from 'jwt-decode'
import Post from '../models/postModel.js';

const authorizePost = (httpMethod) => {
    return (req, res, next) => {
        console.log("Authorization");
        console.log(httpMethod);
        
        switch(httpMethod){
            case 'put': {
                console.log('in put method of authorization');
                const token = req.headers['secret_token'];
                const decodedUser = jwt_decode(token).user;

                Post.findOne({_id: req.params.id})
                .then((post) => {
                    if(post.userId.toString() === decodedUser._id.toString())
                        next();
                    else
                        res.status(403).send({message: 'Unauthorized Access'});
                    
                })
                .catch((err)=>{
                    next(err);
                })
                
                break;
            }
            case 'get': {
                console.log('in get method of authorization');
                const token = req.headers['secret_token'];
                const decodedUser = jwt_decode(token).user;
                req.params.userId.toString() === decodedUser._id.toString() ? next() : res.status(403).send({message: 'Unauthorized Access'});
             
            }
            
        }
    }
}
export default authorizePost;