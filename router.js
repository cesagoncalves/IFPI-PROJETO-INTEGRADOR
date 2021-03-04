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
router.get('/atividadesComplementares', userController.mustBeLoggedIn, postController.getAllACs, userController.atividadesComplementares)
router.get('/extensao', userController.mustBeLoggedIn, postController.getAllAEs, userController.extensao)
router.get('/perfilDoAluno', userController.mustBeLoggedIn, userController.perfilDoAluno)
router.post('/cadastrar', userController.cadastrar)
router.get('/logout', userController.logout)

//roteamento de post

router.get('/postACs', userController.mustBeLoggedIn, postController.postACs)
router.get('/postAEs', userController.mustBeLoggedIn, postController.postAEs)


router.post('/upload', multer(multerConfig).single('certificados'), (req, res) => {
    let certificados = new Certificados(req.file, req.body, req.session.user.email)
    certificados
        .create()
        .then(function(result) {
            res.render('pages/home')
        })
        .catch(function(err) {
            res.send('err')
        })
});

module.exports = router