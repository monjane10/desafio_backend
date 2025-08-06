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


    atribuirProdutor(produtor_id, tecnico_id, campanha_id) {
    const sql = `
      INSERT INTO produtores_campanhas(produtor_id, tecnico_id, campanha_id)
      VALUES (?, ?, ?)
    `;
    const valores = [produtor_id, tecnico_id, campanha_id];

    return new Promise((resolve, reject) => {
      conexao.query(sql, valores, (erro, resultado) => {
        if (erro) {
          console.error(erro);
         return reject({
             mensagem: "Não foi possível atribuir o produtor ao técnico.",
            erro: erro.sqlMessage || erro.message || erro
        });
        } else {
          return resolve({
            mensagem: "Produtor atribuído ao técnico com sucesso.",
            relacionamento: {
              produtor_id,
              tecnico_id,
              campanha_id
            }
          });
        }
      });
    });
  }
}



export default new ProdutorRepository();    