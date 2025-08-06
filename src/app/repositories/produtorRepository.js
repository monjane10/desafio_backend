import conexao, { consulta } from "../database/conexao.js";

class ProdutorRepository {

  create(productor) {
    const sql = "INSERT INTO produtores(nome, localizacao) VALUES (?, ?)";
    const valores = [productor.nome, productor.localizacao];
    return consulta(sql, valores, "Erro ao cadastrar o produtor")
      .then((resultado) => {
        return {
          id: resultado.insertId,
          nome: productor.nome,
          localizacao: productor.localizacao
        };
      });
  }


  atribuirProdutorATecnico(produtor_id, tecnico_id, campanha_id) {
    const sql = `
      INSERT INTO produtores_campanhas(produtor_id, tecnico_id, campanha_id)
      VALUES (?, ?, ?)
    `;
    const valores = [produtor_id, tecnico_id, campanha_id];
    return consulta(sql, valores, "Erro ao atribuir produtor ao técnico")
      .then((resultado) => {
        return {
          id: resultado.insertId,
          produtor_id: produtor_id,
          tecnico_id: tecnico_id,
          campanha_id: campanha_id
        };
      });
  }

  async transferirProdutor(produtor_id, tecnico_antigo_id, tecnico_novo_id, campanha_id) {
    const verificarRelacionamento = `
      SELECT * FROM produtores_campanhas
      WHERE produtor_id = ? AND tecnico_id = ? AND campanha_id = ?
    `;
    const apagarRelacionamento = `
      DELETE FROM produtores_campanhas
      WHERE produtor_id = ? AND tecnico_id = ? AND campanha_id = ?
    `;
    const criarRelacionamento = `
      INSERT INTO produtores_campanhas (produtor_id, tecnico_id, campanha_id, data_transferencia)
      VALUES (?, ?, ?, NOW())
    `;

    return new Promise((resolve, reject) => {
      conexao.query(verificarRelacionamento, [produtor_id, tecnico_antigo_id, campanha_id], (erro, resultados) => {
        if (erro || resultados.length === 0) {
          return reject("Relação anterior não encontrada.");
        }
        conexao.query(apagarRelacionamento, [produtor_id, tecnico_antigo_id, campanha_id], (erroDel) => {
          if (erroDel) {
            return reject("Erro ao remover técnico antigo.");
          }
          conexao.query(criarRelacionamento, [produtor_id, tecnico_novo_id, campanha_id], (erroIns) => {
            if (erroIns) {
              return reject({
                mensagem: "Não foi possível atribuir o produtor ao técnico.",
                erro: erroIns.sqlMessage || erroIns.message || erroIns
              });
            }
            return resolve({
              mensagem: "Transferência realizada com sucesso.",
              relacionamento: {
                produtor_id,
                tecnico_novo_id,
                campanha_id,
                data_transferencia: new Date().toISOString()
              }
            });
          });
        });
      });
    });
  }


}




export default new ProdutorRepository();    