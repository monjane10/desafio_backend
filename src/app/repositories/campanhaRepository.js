
import conexao, { consulta } from "../database/conexao.js";


class CampanhaRepository {

  create(campanha) {
    const sql = "INSERT INTO campanhas(nome,empresa_id, data_fim) VALUES (?, ?, ?)";
    const valores = [campanha.nome, campanha.empresa_id, campanha.data_fim];
    return consulta(sql, valores, "Erro ao cadastrar a campanha")
      .then((resultado) => {
        return {
          id: resultado.insertId,
          nome: campanha.nome,
          empresa_id: campanha.empresa_id,
          data_fim: campanha.data_fim
        };
      });
  }


}


export default new CampanhaRepository();