const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

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
    console.log(error);

    //!If Valid
    if (error === undefined) {

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
                    _id : addedUser._id,
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
    } else {
        res.status(422).json(error.details[0]);
        console.log("User Add Failed !");
        return;
    }
});

module.exports = router;