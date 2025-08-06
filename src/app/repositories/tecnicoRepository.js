import conexao, {consulta} from "../database/conexao.js";


class TecnicoRepository {
     
create(tecnico) {
  const sql = "INSERT INTO tecnicos(nome,campanha_id) VALUES (?, ?)";
  const valores = [tecnico.nome, tecnico.campanha_id];
  return consulta(sql, valores, "Erro ao cadastrar o tecnico")
    .then((resultado) => {
        return {
          id: resultado.insertId,            
          nome: tecnico.nome,
          campanha_id: tecnico.campanha_id
        };
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
 return consulta(sql,tecnico_id, "Não foi possível listar os produtores do técnico")
}
}


export default new TecnicoRepository();