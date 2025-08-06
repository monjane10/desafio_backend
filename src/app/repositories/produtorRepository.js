import conexao from "../database/conexao.js";

class ProdutorRepository {
     create(productor) {
         const sql = "INSERT INTO produtores(nome,localizacao) VALUES (?, ?)";
         const valores = [productor.nome, productor.localizacao];
         return new Promise((resolve, reject) => {
         conexao.query(sql, valores, (erro, resultado) => {
          if (erro) {
             return reject("Não foi possível cadastrar o productor");
         } else {
             return resolve(resultado);
        }
    });
  });
  }
}


export default new ProdutorRepository();    