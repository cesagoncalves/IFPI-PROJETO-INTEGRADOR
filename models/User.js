const pool = require("../db")
const bcrypt = require("bcryptjs")
const moment = require("moment")


let User = function (data) {
    this.data = data
    this.errors = []
}

User.prototype.login = function () {
    return new Promise((resolve, reject) => {
        this.readByEmail().then((usuarioRecuperado) => {
            if (usuarioRecuperado && bcrypt.compareSync(this.data.senha, usuarioRecuperado.senha)) {
                resolve('Login confere')
            } else {
                reject('Dados de login não conferem')
            }
        }).catch(() => { });
    });
};

User.prototype.readByEmail = function () {
    const consulta = "SELECT * FROM users u WHERE u.email= $1";
    const values = [this.data.email];

    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("E-mail não encontrado");
            } else {
                usuarioRecuperado = results.rows[0];
                console.log(usuarioRecuperado)
                resolve(usuarioRecuperado);

            }
        });
    });
};



User.prototype.create = function () {
    let salt = bcrypt.genSaltSync(10)
    this.data.senha = bcrypt.hashSync(this.data.senha, salt)
    const consulta = 'INSERT INTO users(nome, sobrenome, email, cpf, telefone, instituicao, cidade, senha, nascimento, curso) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)'
    const values = [this.data.nome, this.data.sobrenome, this.data.email, this.data.cpf, this.data.telefone, this.data.instituicao, this.data.cidade, this.data.senha, this.data.nascimento, this.data.curso]
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

User.prototype.recuperarTiposCursos = function () {
    const consulta = 'select * from tipo_curso'
    const values = []
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao cadastrar o aluno!")
            } else {
                tipos_cursos_recuperados = results.rows
                console.log(tipos_cursos_recuperados)
                // resolve("Usuário inserido com sucesso!")
                resolve(tipos_cursos_recuperados)
            }
        });
    });
};

User.prototype.recuperarCursos = function (tipo_curso) {
    const consulta = 'SELECT * from cursos inner join tipo_curso' +
        ' ON (cursos.id_tipo_curso_fk = tipo_curso.id_tipo_curso)' +
        ` WHERE id_tipo_curso_fk = ${tipo_curso}`

    console.log(consulta)
    const values = []
    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Erro ao retornar cursos de um determinado tipo!")
            } else {
                cursos_recuperado = results.rows
                console.log(cursos_recuperado)
                // resolve("Usuário inserido com sucesso!")
                resolve(cursos_recuperado)
            }
        });
    });
};

User.prototype.alterarDados = function () {

    const consulta = "UPDATE users set nome=$1, nascimento=$2 WHERE email=$3";
    const values = [this.data.nome, this.data.nascimento, this.data.email];
    console.log(consulta)

    return new Promise((resolve, reject) => {
        pool.query(consulta, values, (error, results) => {
            if (error) {
                reject("Não foi possivel alterar os Dados");
            } else {
                resolve("Informações alteradas com sucesso");
            }
        });
    });
};

module.exports = User