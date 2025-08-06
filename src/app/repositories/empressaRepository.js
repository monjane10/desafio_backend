import conexao from "../database/conexao.js";

class EmpresaRepository {


    create(empresa) {
         const sql = "INSERT INTO empresas(nome,cnpj, telefone, email) VALUES (?, ?, ?, ?)";
         const valores = [empresa.nome, empresa.cnpj, empresa.telefone, empresa.email];
         return new Promise((resolve, reject) => {
         conexao.query(sql, valores, (erro, resultado) => {
          if (erro) {
             return reject("Não foi possível cadastrar o trabalhador");
         } else {
             return resolve(resultado);
        }
    });
  });

    }

     findAll() {
  const sql = "SELECT * FROM empresas";
  
  return new Promise((resolve, reject) => {
    conexao.query(sql, (erro, resultado) => {
      if (erro) {
        return reject("Não foi possível localizar as empresas" + erro);
      } else {
        return resolve(resultado);
      }
    });
  });
}
}

export default new EmpresaRepository();