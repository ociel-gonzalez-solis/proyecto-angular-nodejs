'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({uploadDir: './uploads'});

router.get('/home', ProjectController.home);

router.post('/test', ProjectController.test);

router.post('/save-project', ProjectController.saveProject);

router.get('/project/:id?', ProjectController.getProject);

router.get('/projects', ProjectController.getProjects);

router.put('/project/:id', ProjectController.updateProject);

router.delete('/project/:id', ProjectController.deleteProject);

router.post('/upload-img/:id', multipartMiddleware,ProjectController.uploadImg);

router.get('/get-img/:img', ProjectController.getImgFile);

module.exports = router;