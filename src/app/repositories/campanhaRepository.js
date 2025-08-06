
import conexao from "../database/conexao.js";


class CampanhaRepository {

    create(campanha) {
         const sql = "INSERT INTO campanhas(nome,empresa_id, data_inicio, data_fim) VALUES (?, ?, ?, ?)";
         const valores = [campanha.nome, campanha.empresa_id, campanha.data_inicio, campanha.data_fim];
         return new Promise((resolve, reject) => {
         conexao.query(sql, valores, (erro, resultado) => {
          if (erro) {
             return reject("Não foi possível cadastrar a campanha");
         } else {
             return resolve(resultado);
        }
    });
  });
  }

}


export default new CampanhaRepository();