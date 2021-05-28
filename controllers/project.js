'use estrict'

var Project = require('../models/project');
var fs = require('fs');
var path = require('path');

var controler = {
    home: function (req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el test del controlador'
        });
    },
    saveProject: function (req, res) {
        var project = new Project();

        var params = req.body;
        project.name = params.name;
        project.desc = params.desc;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.img = params.null;
        project.save((e, projectStored) => {
            if (e) return res.status(500).send({
                message: 'Error en la peticion'
            });
            if (!projectStored) return res.status(404).send({
                message: 'No se a podido guardar enn el proyecto'
            });

            return res.status(200).send({
                project: projectStored
            });
        });

        // return res.status(200).send({
        //     // params: params,
        //     project: project,
        //     message: "Metodo save Project"
        // });
    },
    getProject: function (req, res) {
        var projectId = req.params.id;

        if (projectId == null) {
            return res.status(404).send({
                message: 'El proyecto no existe'
            });
        }

        Project.findById(projectId, (e, project) => {
            if (e) return res.status(500).send({
                message: 'Error al devolver los datos'
            });
            if (!project) return res.status(404).send({
                message: 'El proyecto no existe'
            });

            return res.status(200).send({
                project
            });
        });
    },
    getProjects: function (req, res){
        Project.find({}).sort('+year').exec((e, projects) =>{
            if (e) return res.status(500).send({message: 'Error al devolver los datos'});
            
            if (!projects) return res.status(404).send({message: 'No hay proyectos que mostrar'});
            
            return res.status(200).send({projects});
        });
    },
    updateProject: function (req, res){
        var projectId = req.params.id;
        var update = req.body;

        Project.findByIdAndUpdate(projectId, update, (e, projectUpdated) => {
            if (e) return res.status(500).send({message: 'Error al actualizar'});

            if (!projectUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },
    deleteProject: function (req,res){
        var projectId = req.params.id;
        Project.findByIdAndRemove(projectId, (e, projectRemoved)=>{
            if (e) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});
            if (!projectRemoved) return res.status(404).send({message: 'No se a podido eliminar ese proyecto'});
            return res.status(200).send({project: projectRemoved});
        });
    },
    uploadImg: function(req,res){
        var projectId = req.params.id;
        var fileName = 'Imagen no subida...';

        if (req.files){
            var filePath = req.files.img.path;
            var fileSplit = filePath.split('/');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileEXT = extSplit[1];

            if (fileEXT == 'png' || fileEXT == 'jpg' || fileEXT == 'jpeg' || fileEXT == 'gif') {
                    Project.findByIdAndUpdate(projectId, {img: fileName}, {new: true},(e, projectUpdated) => {
                    if (e) return res.status(500).send({message: 'La imagen no  se ha subido'});

                    if(!projectUpdated) return res.status(404).send({message: 'El proyecto no existe y no se a asignado la imagen'});

                    return res.status(200).send({
                        project: projectUpdated
                    });
                });
            } else{
                fs.unlink(filePath, (e) => {
                    return res.status(200).send({message: 'Extension invalida'});
                });
            }
        } else{
            return res.status(200).send({
                message: fileName
            });
        }
    },
    getImgFile: function(req,res){
        var file = req.params.img;
        var path_file = './uploads/'+file;
        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else{
                return res.status(200).send({
                    message: 'No existe la imagen'
                });
            }
        });
    }
};

module.exports = controler;