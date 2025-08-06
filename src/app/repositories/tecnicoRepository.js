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


 async listarProdutoresPorTecnico(tecnico_id) {
  const sql = `
    SELECT 
      p.id, 
      p.nome, 
      p.localizacao
    FROM produtores p
    INNER JOIN produtores_campanhas pc ON pc.produtor_id = p.id
    WHERE pc.tecnico_id = ?
  `;
  return new Promise((resolve, reject) => {
    conexao.query(sql, [tecnico_id], (erro, resultado) => {
      if (erro) {
        console.error("Erro na consulta SQL:", erro);
        return reject(new Error("Erro ao buscar produtores por técnico"));
      }
      resolve(resultado); 
    });
  });
}
}


export default new TecnicoRepository();