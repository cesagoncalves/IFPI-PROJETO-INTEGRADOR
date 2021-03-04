const pool = require("../db")

let Certificados = function(data, data2, email) {
    this.data = data
    this.data2 = data2
    this.email = email
    this.errors = []
}

Certificados.prototype.create = function() {
    const consulta = 'INSERT INTO  certificados (tipo_de_atividade,categoria_atividade,subcategoria_atividade,qtd_horas,nome,tamanho,chave,url, email_fk) values ($1,$2,$3,$4,$5,$6,$7,$8,$9)'
    const values = [this.data2.tipo_de_atividade, this.data2.categoria_atividade, this.data2.subcategoria_atividade, this.data2.qtd_horas, this.data.filename, this.data.size, this.data.originalname, this.data.path, this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao inserir certificado!" + error)
            } else {
                resolve("Certificado inserido com sucesso!")
            }
        });
    });
}

Certificados.prototype.readAllACs = function() {
    const consulta = "SELECT * FROM certificados u where u.email_fk=$1 and u.tipo_de_atividade='Atividades Complementares'";
    const values = [this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar os certificados!" + error)
            } else {
                resultado = results.rows
                resolve(resultado);
            }
        });
    });
}

Certificados.prototype.readAllAEs = function() {
    const consulta = "SELECT * FROM certificados u where u.email_fk=$1 and u.tipo_de_atividade='Atividades De Extensão'";
    const values = [this.email]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao recuperar os certificados!" + error)
            } else {
                resultado = results.rows
                resolve(resultado);
            }
        });
    });
}

module.exports = Certificados