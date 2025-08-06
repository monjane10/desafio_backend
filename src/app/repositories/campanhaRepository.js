
import conexao from "../database/conexao.js";


class CampanhaRepository {

  create(campanha) {
    const sql = "INSERT INTO campanhas(nome,empresa_id, data_fim) VALUES (?, ?, ?)";
    const valores = [campanha.nome, campanha.empresa_id, campanha.data_fim];
 
     return new Promise((resolve, reject) => {
       try {
         conexao.query(sql, valores, (erro, resultado) => {
         if (erro) {
           return reject("Não foi possível cadastrar a campanha");
         } else {
         return resolve({
            id: resultado.insertId,
            nome: campanha.nome,
            empresa_id: campanha.empresa_id,
            data_fim: campanha.data_fim
          });
        }
      });
    } catch (error) {
      reject("Erro inesperado ao cadastrar a campanha");
    }
  });
}


}


export default new CampanhaRepository();