const express=require('express');
const { signup, signin } = require('../controller/auth.controller');
const router=express.Router();

router.route('/signup').post(signup)
router.route('/signin').post(signin)

module.exports=router;