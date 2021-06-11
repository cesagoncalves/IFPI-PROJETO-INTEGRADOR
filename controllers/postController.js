const Certificados = require('../models/Certificados');
exports.postACs = function(req, res) {
    res.render('pages/postACs', {layout: 'pages/postACs'})
}

exports.postAEs = function(req, res) {
    res.render('pages/postAEs', {layout: 'pages/postAEs'})
}

exports.getAllACs = function(req, res) {
    let certificado = new Certificados(req.file, null, req.session.user.email)
    certificado.readAllACs().then(function(resultado) {
        res.render("pages/atividadesComplementares", { certificados: resultado })
    }).catch(function(err) {
        res.send(err);
    })
}
exports.getAllAEs = function(req, res) {
    let certificado = new Certificados(req.file, null, req.session.user.email)
    certificado.readAllAEs().then(function(resultado) {
        res.render("pages/extensao", { certificados: resultado })
    }).catch(function(err) {
        res.send(err);
    })
}