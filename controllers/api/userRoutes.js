const router = require('express').Router();
const User = require('../models/users');
const Pet = require ('../models/pets');
const Post= require ('../models/posts');
const Comment= require ('../models/comments');
const bcrypt=require('bcrypt');
const userAuth = require('../utils/auth');