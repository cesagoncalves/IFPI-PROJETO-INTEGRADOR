const pool = require("../db")
const bcrypt = require("bcryptjs")

let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        this.readByEmail().then((usuarioRecuperado) => {
            if (usuarioRecuperado && bcrypt.compareSync(this.data.senha, usuarioRecuperado.senha)) {
                resolve('Login confere')
            } else {
                reject('Dados de login não conferem')
            }
        }).catch(() => {
            reject('Erro ao fazer login')
        });
    });
};

User.prototype.readByEmail = function() {
    const consulta = "SELECT * FROM users u WHERE u.email=$1";
    const values = [this.data.email];

    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("E-mail não encontrado");
            } else {
                usuarioRecuperado = results.rows[0];
                resolve(usuarioRecuperado);
                console.log(usuarioRecuperado);
            }
        });
    });
};

User.prototype.create = function() {
    let salt = bcrypt.genSaltSync(10)
    this.data.senha = bcrypt.hashSync(this.data.senha, salt)
    const consulta = 'INSERT INTO users(nome, sobrenome, email, cpf, telefone, instituicao, cidade, senha, nascimento) values($1, $2, $3, $4, $5, $6, $7, $8, $9)'
    const values = [this.data.nome, this.data.sobrenome, this.data.email, this.data.cpf, this.data.telefone, this.data.instituicao, this.data.cidade, this.data.senha, this.data.nascimento]
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao cadastrar o aluno!")
            } else {
                resolve("Usuário inserido com sucesso!")
            }
        });
    });
};

module.exports = User