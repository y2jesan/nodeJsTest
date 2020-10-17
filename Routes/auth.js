const router = require('express').Router();
const User  = require('../models/User');

//! VALIDATION
const Joi = require('@hapi/joi');

const schema = Joi.object({
    username : Joi.string().min(5).required(),
    email : Joi.string().min(6).required().email(),
    password : Joi.string().min(4).required()
});

router.get('/',async (req,res) => {
    console.log("Auth Api Called...");
    return;
});

/**
 * @swagger
 * /user/addUser:
 *  post:
 *      tags:
 *          - User
 *      summary: Add User
 *      parameters:
 *          - name: requestBody
 *            description: User details
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  username:
 *                      type: string
 *                      required: true
 *                  email:
 *                      type: string
 *                      required: true
 *                  password:
 *                      type: string
 *                      required: true
 *      responses:
 *          '201':
 *              description: User Added Successfully
 *          '422':
 *              description: User Add Failed
 */


router.post('/addUser', async (req,res) => {
    //!Validate Date
    const {error} = schema.validate(req.body);
    console.log(error);
    //console.log(error.details[0].message);

    if(1 !== 1){
        const user = new User({
            username : req.body.username,
            email : req.body.email,
            password: req.body.password
         });
         try{
             const addedUser = await user.save();
             res.status(200).json({
                 status: 'success',
                 product : addedUser 
     
             });
             console.log("New User Added !");
             return;
         }catch (err){
             res.json({message : err});
             console.log("User Add Failed !");
             return;
         }
    }
    else{
        res.json(error);
        console.log("User Add Failed !");
        return;
    }
});

module.exports = router;