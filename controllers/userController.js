const User = require('../models/User')
const Certificados = require('../models/Certificados')

exports.cadastro = function(req, res) {
    res.render('pages/cadastro', { layout: 'pages/cadastro' })
}

exports.login_form = function(req, res) {
    res.render('pages/login', { layout: 'pages/login' })
}



exports.login = function(req, res) {
    let user = new User(req.body);
    user
        .login()
        .then(function(result) {
            console.log(result);
            req.session.user = {
                nome: usuarioRecuperado.nome,
                sobrenome: usuarioRecuperado.sobrenome,
                email: user.data.email,
                cpf: usuarioRecuperado.cpf,
                telefone: usuarioRecuperado.telefone,
                instituicao: usuarioRecuperado.instituicao,
                cidade: usuarioRecuperado.cidade,
                senha: user.data.senha,
                nascimento: usuarioRecuperado.nascimento,
                horas_acs: usuarioRecuperado.horas_acs,
                horas_aes: usuarioRecuperado.horas_aes,
            }
            req.session.save(function() {
                res.redirect('/home')
            })
        })
        .catch(function(err) {
            res.send(err)
        })
}


exports.logout = function(req, res) {
    req.session.destroy(function() {
        res.redirect("/")
    })
}

exports.mustBeLoggedIn = function(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/')
    }
}

exports.esqueciASenha = function(req, res) {
    res.render('pages/esqueciAsenha', { layout: 'pages/esqueciAsenha' })

}

exports.home = function(req, res) {
    if (req.session.user) {
        res.render('pages/home')
    } else {
        res.render('pages/home')
    }
}

exports.atividadesComplementares = function(req, res) {
    res.render('pages/atividadesComplementares')
}


exports.extensao = function(req, res) {
    res.render('pages/extensao')
}

exports.perfilDoAluno = function(req, res) {
    if (req.session.user) {
        res.render('pages/perfilDoAluno')
    } else {
        res.render('pages/perfilDoAluno')
    }
}

exports.cadastrar = function(req, res) {
    // console.log(req.body);
    let user = new User(req.body);
    user
        .create()
        .then(function(result) {
            res.render('pages/login', { layout: 'pages/login' });
        })
        .catch(function(err) {
            res.send(err);
        });
};