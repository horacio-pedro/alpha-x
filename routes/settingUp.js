const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireDir = require('require-dir');
const User = mongoose.model('users');
requireDir("../models");

// SETTINGS
    // Main Settings
        router.get('/', (req, res) => {
            res.render("pages/dashboard/index",
            {
                title: 'Alpha X || Dashboard',
                systemDescription: 'Descrição do sistem aqui',
                favicon: ['light.png'],
                css: ['stylesheet.bundle.css'],
                js: ['bootstrap.bundle.min.js', 'script.bundle.js']
            })
        });
    // End Main Settings
    // Users
    router.get('/utilizadores', (req, res) => {
        res.render("pages/settings/users/index",
        {
            title: 'Alpha X || Utilizadores',
            systemDescription: 'Descrição do sistema aqui',
            favicon: ['light.png'],
            css: ['stylesheet.bundle.css'],
            js: ['bootstrap.bundle.min.js', 'script.bundle.js']
        })
    })
        // Main Users
            router.get('/utilizador/meu-perfil', (req, res) => {
                res.render("pages/settings/users/myProfile",
                {
                    title: 'Alpha X || Meu Perfil',
                    systemDescription: 'Descrição do sistem aqui',
                    favicon: ['light.png'],
                    css: ['stylesheet.bundle.css'],
                    js: ['bootstrap.bundle.min.js', 'script.bundle.js']
                })
            });
        // End Main Users
        // Create User
        router.get('/utilizador/criar-novo', (req, res) => {
            res.render("pages/settings/users/createUser",
            {
                title: 'Alpha X || Criar Utilizador',
                systemDescription: 'Descrição do sistem aqui',
                favicon: ['light.png'],
                css: ['stylesheet.bundle.css'],
                js: ['bootstrap.bundle.min.js', 'script.bundle.js']
            })
        })
        router.post('/utilizador/adicionar', (req, res) => {
            var erros = []
            
            if(!req.body.firstName || typeof req.body.firstName == undefined || req.body.firstName ==  null){
                erros.push({texto: "Nome invalido"})
            }

            if(!req.body.lastName || typeof req.body.lastName == undefined || req.body.lastName ==  null){
                erros.push({texto: "Nome invalido"})
            }

            if(!req.body.email || typeof req.body.email == undefined || req.body.email ==  null){
                erros.push({texto: "Nome invalido"})
            }

            if(!req.body.password || typeof req.body.password == undefined || req.body.password ==  null){
                erros.push({texto: "Nome invalido"})
            }

            if(req.body.password.length < 4){
                erros.push({texto: "Senha demasiado curta, caracters minimos aceites 4"})
            }

            if(req.body.password != req.body.password2){
                erros.push({texto: "As palavras-passe nao coincidem, tente novamente!"})
            }

            if(!req.body.picture || typeof req.body.picture == undefined || req.body.picture ==  null){
                erros.push({texto: "Imagem/Avatar invalido"})
            }

            if(erros.length > 0){
                res.render("pages/settings/users/createUser", {erros: erros})
            }else{
                User.findOne({email: req.body.email}).then( (users) => {
                    if(users){
                        req.body.flash("error_msg", "Ja existe uma conta com este email no sistem")
                        res.redirect('/utilizador/criar-novo')
                    }else{
                        const newUser = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            email: req.body.email,
                            password: req.body.password,
                            picture: req.body.picture
                        })

                        bcrypt.genSalt(10, (erro, salt) => {
                            bcrypt.hash(newUser.password, salt, (erro, hash) => {
                                if(erro){
                                    req.flash("error_msg", "Houve um erro ao salvar o utilizador");
                                    res.redirect("/utilizadores");
                                }

                                newUser.password = hash

                                newUser.save().then(() => {
                                    req.flash("success_msg", "Utilizador criado com sucesso!");
                                    res.redirect("/utilizadores");
                                }).catch((err) => {
                                    req.flash("error_msg", "Houve um erro ao criar utilizador, tente novamente!");
                                    res.redirect("/utilizador/criar-novo");
                                })

                            });
                        });

                    }
                }).catch( (err) => {
                    req.flash("error_msg", "Houve um erro interno, contacte o administrador")
                    res.redirect('/utilizadores')
                })
            }
        });
        // End Create User
        // Delete User
        // End Delete User
    // End Users
// END SETTINGS

module.exports = router