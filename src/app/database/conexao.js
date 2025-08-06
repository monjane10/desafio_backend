import mysql from "mysql2";
import dotenv from 'dotenv';


dotenv.config();

const conexao = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "desafio_db"

})

conexao.connect()

/**
 * Executa um código sql com ou sem valores
 * @param {string} sql instrução sql a ser executada
 * @param {string=id | [selecao, id]} valores valores a serem passados para o sql
 * @param {string} mensagemReject mensagem a ser exibida 
 * @returns objecto da Promisse
 */
export const consulta = (sql, valores = '', mensagemReject) => {
  return new Promise((resolve, reject) => {
    try {
      conexao.query(sql, valores, (erro, resultado) => {
        if (erro) {
          return reject(mensagemReject);
        } else {
          const row = JSON.parse(JSON.stringify(resultado));
          return resolve(row);
        }
      });
    } catch (erro) {
      return reject(`Erro inesperado: ${erro.message || erro}`);
    }
  });
};




export default conexao;