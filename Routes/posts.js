const express = require('express');
const router = express.Router();

const Product = require('../models/Product');


router.get('/',async (req,res) => {
    console.log("Post Api Called...");
    return;
});

//!Routes
/**
 * @swagger
 * /posts/getAllProducts:
 *      get:
 *          tags:
 *              - Products
 *          description: This Will Return All Products
 *          responses:
 *              '200':
 *                  description: Success
 *              '500':
 *                  description: Failed
 */
router.get('/getAllProducts',async (req,res) => {
    console.log("Getting all products...");
    try{
        const products = await Product.find();
        res.status(200).json(products);
        console.log(products.length + " Products Found.");
        return;
    }catch(err){
        res.status(400).json({message : err});
        console.log("Products Founding Failed !");
        return;
    }
});

/**
 * @swagger
 * /posts/addNewProduct:
 *  post:
 *      tags:
 *          - Products
 *      summary: Add Product
 *      parameters:
 *          - name: requestBody
 *            description: product details
 *            in: body
 *            schema:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                  price:
 *                      type: number
 *      responses:
 *          '201':
 *              description: Product Added Successfully
 *          '422':
 *              description: Product Add Failed
 */
router.post('/addNewProduct',async (req,res) => {
    console.log("Adding New product...");
    console.log(req.body);
    if(!req.body.title){
        console.log("Product Add Failed !");
        return res.status(400).json(
            {
                status : 'error',
                message : 'Please Provide Title'
            }
        );
    }
    if(!req.body.price){
        console.log("Product Add Failed !");
        return res.status(400).json(
            {
                status : 'error',
                message : 'Please Provide Price'
            }
        );
    }

    const product = new Product({
        title: req.body.title,
        price: req.body.price
    });
    try{
        const addedProduct = await product.save();
        res.status(200).json({
            status: 'success',
            product : addedProduct
        });
        console.log("New Product Added !");
        return;
    }catch (err){
        res.json({message : err});
        console.log("Product Add Failed !");
    }
});



module.exports = router;