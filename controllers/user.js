'use strict'

var fs = require('fs');
var path = require('path');
var bcrypt = require('bcrypt-nodejs'); // Encriptar nuestra contraseña
var User = require('../models/user');
var jwt = require('../services/jwt');

function save_user(req, res) {
    var user = new User();

    var params = req.body;
    
    console.log('Register request received:', params);

    user.name = params.name;
    user.username = params.username;

    if(params.password) {
        // Encriptar contraseña y guardar datos 
        bcrypt.hash(params.password, null, null, async function(err, hash) {
            if(err) {
                return res.status(500).send({message:'Error al encriptar la contraseña'});
            }
            user.password = hash;
            if(user.name != null && user.username != null) {
                // Guardar el usuario
                try{
                    const result = await user.save()
                    if(!result) {
                            res.status(404).send({message:'No se ha registrado el usuario'});
                        } else {
                            res.status(200).send({user: result});
                        }
                }catch(err){
                    console.log(err)
                       res.status(500).send({message:'Error al guardar el usuario', error: err.message});  
                }
            } else {
                res.status(200).send({message:'Rellena todos los campos'});                
            }
        });
    } else {
        res.status(200).send({message:'Introduce la contraseña'});
    }
}

async function login_user(req, res) {
    var params = req.body;

    var username = params.username;
    var password = params.password;

    try {
        var user = await User.findOne({username: username.toLowerCase()});
        if(!user) return res.status(404).send({message: 'El usuario no existe'});

        bcrypt.compare(password, user.password, (err, check) => {
            if(check) {
                if(params.gethash) {
                    res.status(200).send({
                        token: jwt.createToken(user)
                    });
                } else {
                    res.status(200).send({user});
                }
            } else {
                res.status(404).send({message:'El usuario no ha podido loguearse'});
            }
        });
    } catch(err) {
        res.status(500).send({message: 'Error en la peticion'});
    }
}

async function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    if(userId != req.user.sub) {
        return res.status(500).send({message: 'No tienes permiso'});
    }

    try {
        var userUpdated = await User.findByIdAndUpdate(userId, update, {new: true});
        if(!userUpdated) {
            res.status(404).send({message: 'No se ha podido actualizar'});
        } else {
            res.status(200).send({user: userUpdated});
        }
    } catch(err) {
        res.status(500).send({message: 'Error al actualizar'});
    }
}

async function findUser(req, res) {
    var userId = req.params.id;

    try {
        var user = await User.findById(userId);
        if(!user) {
            res.status(404).send({message: 'No se ha podido encontrar'});
        } else {
            res.status(200).send({user});
        }
    } catch(err) {
        res.status(500).send({message: 'Error al econtrar'});
    }
}

module.exports = {
    save_user,
    login_user,
    updateUser,
    findUser
};