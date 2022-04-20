const { validationResult } = require("express-validator")

const Post = require('../models/post');
const Category = require('../models/category');
const Post_category = require('../models/post_category');



const create_post = async (req, res, next) => {
    let categories = await Category.findAll({})
    console.log(categories);
    res.render('./post',{
        layout: './layout/layout.ejs',

        categories: categories,
        user: req.user ,
        isAuth: req.isAuthenticated()
    })
}
const create_postPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let olds = {'post_title' : req.body.post_title, 'content' : req.body.content, 'categories' : req.body.categories}
        req.flash('olds',olds)
        res.redirect('/create_post');
    } else {
    
    const db_categories = await Category.findAll();
    console.log(db_categories);
    let dbCategories = [];
    db_categories.forEach(element => {
        dbCategories.push(element.title);
    })


    const post = await Post.create({

        title : req.body.post_title,
        content : req.body.content,
        categories : req.body.categories,
        post_face : req.body.post_face,
        authorId : req.user.id,

    })



    }
}


module.exports = {
    create_post,
    create_postPost
}