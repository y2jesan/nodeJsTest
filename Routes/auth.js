const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validation = require('./validation');
//? can be imported only single validation model too
//const {registerValidation} = require('./validation');

router.get('/', async (req, res) => {
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
 *          '421':
 *              description: User Already Exists
 */


router.post('/addUser', async (req, res) => {
    //!Validate Date
    const {
        error
    } = validation.registerValidation(req.body);

    //!If InValid
    if (error) {
        console.log("User Add Failed !");
        return res.status(422).json(error.details[0]);
    }

    //!Chek if User Already Exists Or Not
    const userExists = await User.findOne({
        email: req.body.email
    });
    if (userExists) return res.status(421).json({
        message: `User Already Exists!`
    });

    //!Hash The Password 
    //? Should be taken to another file
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const addedUser = await user.save();
        res.status(200).json({
            status: 'success',
            product: {
                _id: addedUser._id,
                username: addedUser.username
            }
        });
        console.log("New User Added !");
        return;
    } catch (err) {
        res.status(422).json({
            message: err
        });
        console.log("User Add Failed !");
        return;
    }
});

/**
 * @swagger
 * /user/login:
 *  post:
 *      tags:
 *          - Login
 *      summary: User Login
 *      parameters:
 *          - name: requestBody
 *            description: User Credential
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      required: true
 *                  password:
 *                      type: string
 *                      required: true
 *      responses:
 *          '200':
 *              description: Log In Successful
 *          '400':
 *              description: Log In Failed
 */
router.post('/login', async (req, res) => {
    const {
        error
    } = validation.loginValidation(req.body);
    //!If InValid
    if (error) {
        console.log("Log In Failed !");
        return res.status(400).json(error.details[0]);
    }
    //!Check if User Already Exists Or Not
    const user = await User.findOne({
        email: req.body.email
    });
    if (!user) {
        console.log(`User Log In Failed!`);
        return res.status(400).json({
            message: `User Does Not Exist!`
        });
    }
    //!Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass){
        console.log(`User Log In Failed!`);
        return res.status(400).json({
            message: `Invalid Pasword!`
        });
    } 
    console.log(`${user.username} - Logged in...`);
    return res.status(200).json({
        _id: user._id,
        username: user.username,
        date: user.date 
    });
});

module.exports = router;