

import mysql from "mysql2";

const conexao = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "olamundo",
    database: "desafio_db"

})


export default conexao;