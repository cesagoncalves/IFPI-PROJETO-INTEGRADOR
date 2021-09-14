const express = require('express')
const router = express.Router()
const multer = require('multer')
const multerConfig = require('./config/multer')
const User = require('./models/User')
const Certificados = require('./models/Certificados')

const userController = require('./controllers/userController')
const postController = require('./controllers/postController')

//roteamentos do usuário
router.get('/', userController.login_form)
router.post('/login', userController.login)
router.get('/home', userController.home)
router.get('/cadastro', userController.cadastro)
router.get('/esqueciASenha', userController.esqueciASenha)
router.get('/perfilDoAluno', userController.mustBeLoggedIn, userController.perfilDoAluno)
router.post('/cadastrar', userController.cadastrar)
router.get('/logout', userController.logout)
router.post('/alterarDados', userController.mustBeLoggedIn, userController.alterarDados)
router.get('/estatisticas', userController.mustBeLoggedIn, postController.pegarAtividades, userController.estatisticas)

//roteamento de post

router.get('/postACs', userController.mustBeLoggedIn, postController.postACs)
router.get('/postAEs', userController.mustBeLoggedIn, postController.postAEs)
router.get('/apagarCertificadoACs/:id_certificado', userController.mustBeLoggedIn, postController.apagarCertificadoACs)
router.get('/apagarCertificadoAEs/:id_certificado', userController.mustBeLoggedIn, postController.apagarCertificadoAEs)

router.post('/uploadACs', multer(multerConfig).single('certificados'), (req, res) => {
    let certificados = new Certificados(req.file, req.body, req.session.user.email)
    certificados
        .create().then(certificados.contabilizarHorasACs())
        .then(function(result) {
            res.render('pages/home')
        })
        .catch(function(err) {
            res.send('err')
        })
});

router.post('/uploadAEs', multer(multerConfig).single('certificados'), (req, res) => {
    let certificados = new Certificados(req.file, req.body, req.session.user.email)
    certificados
        .create().then(certificados.contabilizarHorasAEs())
        .then(function(result) {
            
            res.render('pages/home')
        })
        .catch(function(err) {
            res.send('err')
        })
});


//roteamento de certificados
router.get('/atividadesComplementares', userController.mustBeLoggedIn, postController.getAllACs, userController.atividadesComplementares)
router.get('/extensao', userController.mustBeLoggedIn, postController.getAllAEs, userController.extensao)
router.get('/estatisticas', userController.mustBeLoggedIn, userController.estatisticas)
router.get('/mostrar_ac/:id_certificado', userController.mustBeLoggedIn, postController.getByIdAc)
router.get('/mostrar_ae/:id_certificado', userController.mustBeLoggedIn, postController.getByIdAe)
module.exports = router