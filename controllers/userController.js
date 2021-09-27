const User = require('../models/User')
const Certificados = require('../models/Certificados')

exports.cadastro = function (req, res) {
    let user = new User()
    user.recuperarTiposCursos()
        .then(function (tipos_cursos_recuperados) {
            res.render('pages/cadastro', { tipos_cursos_recuperado: tipos_cursos_recuperados, layout: 'pages/cadastro' })
        })
        .catch(function (err) {
            res.send(err)
        })
}

exports.cursos_json = function (req, res) {
    let user = new User()
    user.recuperarCursos(req.params.id_tipo_curso_fk)
        .then(function (cursos_recuperados) {
            // res.render('pages/cadastro', { tipos_cursos_recuperado: cursos_recuperados, layout: 'pages/cadastro' })
            res.json({ cursos_recuperados: cursos_recuperados })
        })
        .catch(function (err) {
            res.send(err)
        })
}

exports.login_form = function (req, res) {
    res.render('pages/login', { layout: 'pages/login' })
}

exports.login = function (req, res) {
    let user = new User(req.body);
    user
        .login()
        .then(function (result) {
            console.log(result);
            req.session.user = {
                nome: usuarioRecuperado.nome,
                sobrenome: usuarioRecuperado.sobrenome,
                curso: usuarioRecuperado.curso,
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

            req.session.save(function () {
                res.redirect('/home')
            })
        })
        .catch(function (err) {
            res.send(err)
        })
}

exports.logout = function (req, res) {
    req.session.destroy(function () {
        res.redirect("/")
    })
}

exports.mustBeLoggedIn = function (req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/')
    }
}

exports.esqueciASenha = function (req, res) {
    res.render('pages/esqueciAsenha', { layout: 'pages/esqueciAsenha' })

}

exports.home = function (req, res) {
    if (req.session.user) {
        res.render('pages/home')
    } else {
        res.render('pages/home')
    }
}

exports.atividadesComplementares = function (req, res) {
    res.render('pages/atividadesComplementares')
}

exports.extensao = function (req, res) {
    res.render('pages/extensao')
}

exports.estatisticas = function (req, res) {
    res.render('pages/estatisticas')
}

exports.perfilDoAluno = function (req, res) {
    if (req.session.user) {
        res.render('pages/perfilDoAluno')
    } else {
        res.render('pages/perfilDoAluno')
    }
}

exports.alterarDados = function (req, res) {
    let user = new User(req.body);
    user
        .alterarDados(), user.readByEmail()
            .then(function (result) {
                req.session.user = {
                    nome: usuarioRecuperado.nome,
                    sobrenome: usuarioRecuperado.sobrenome,
                    curso: usuarioRecuperado.curso,
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
                res.redirect('/perfilDoAluno')
            })
            .catch(function (err) {
                res.send(err)
            })
}

exports.cadastrar = function (req, res) {
    // console.log(req.body);
    let user = new User(req.body);
    user.create()
        .then(function (result) {
            res.render('pages/login', { layout: 'pages/login' });
        })
        .catch(function (err) {
            res.send(err);
        });
};