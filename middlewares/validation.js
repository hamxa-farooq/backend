import { body, param, query } from 'express-validator';


const validate = (method) => {
  switch (method) {
    case 'getPosts': {
      return [
        query('option', 'option does not exist').exists(),
        query('option', 'option is empty').notEmpty(),
        query('option', 'option is not a string').isString(),
        param('userId', "userId doesn't exist").exists(),
        param('userId', 'userId is empty').notEmpty(),
        param('userId', 'userId is not a valid mongo id').isMongoId(),
      ];
    }
    case 'loginUser': {
      return [
        body('email', 'email does not exist').exists(),
        body('email', 'email is empty').notEmpty(),
        body('email', 'email is invalid').isEmail(),
        body('password', 'password does not exist').exists(),
        body('password', 'password is empty').notEmpty(),
        body('password', 'password is not a string').isString(),
      ];
    }
    case 'addPost': { 
      return [
        body('title', "title doesn't exist").exists(),
        body('title', 'title is empty').notEmpty(),
        body('title', 'title is not a string').isString(),
        body('body', "body doesn't exist").exists(),
        body('body', 'body is empty').notEmpty(),
        body('body', 'body is not a string').isString(),
        body('userId', "userId doesn't exist").exists(),
        body('userId', 'userId is empty').notEmpty(),
        body('userId', 'userId is not a valid mongo id').isMongoId(),
      ];
    }
    case 'updatePost': {
      return [
        body('title', "title doesn't exist").exists().optional(),
        body('title', 'title is empty').notEmpty().optional(),
        body('title', 'title is not a string').isString().optional(),
        body('body', "body doesn't exist").exists().optional(),
        body('body', 'body is empty').notEmpty().optional(),
        body('body', 'body is not a string').isString().optional(),
        query('userId', "userId doesn't exist").exists(),//cch
        query('userId', 'userId is empty').notEmpty(),
        query('userId', 'userId is not a valid mongo id').isMongoId(),
        param('id', 'post id is not a a valid mongo id').isMongoId(),
      ];
    }
    case 'deletePost': {
      return param('id', 'post id is not a valid mongo id').isMongoId();
    }
    case 'deleteAllDrafts': {
      return param('userId', 'userId is not a valid mongo id').isMongoId();
    }
    case 'publishDraft': {
      return [
        param('id', 'id is not a valid mongo id').isMongoId()
      ];
    }
  }
};

export default validate;
