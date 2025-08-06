import conexao from "../database/conexao.js";


class TecnicoRepository {
     create(tecnico) {
         const sql = "INSERT INTO tecnicos(nome,campanha_id) VALUES (?, ?)";
         const valores = [tecnico.nome, tecnico.campanha_id,];
         return new Promise((resolve, reject) => {
         conexao.query(sql, valores, (erro, resultado) => {
          if (erro) {
             return reject("Não foi possível cadastrar o tecnico");
         } else {
             return resolve(resultado);
        }
    });
  });
  }
}


export default new TecnicoRepository();