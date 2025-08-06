import conexao from "../database/conexao.js";

class EmpresaRepository {


  create(empresa) {
  const sql = "INSERT INTO empresas(nome,cnpj, telefone, email) VALUES (?, ?, ?, ?)";
  const valores = [empresa.nome, empresa.cnpj, empresa.telefone, empresa.email];
  
  return new Promise((resolve, reject) => {
    try {
      conexao.query(sql, valores, (erro, resultado) => {
        if (erro) {
          return reject("Não foi possível cadastrar o trabalhador");
        } else {
         return resolve({
            id: resultado.insertId,
            nome: empresa.nome,
            cpnj: empresa.cnpj,
            telefone: empresa.telefone,
            email: empresa.email
          });
        }
      });
    } catch (error) {
      reject("Erro inesperado ao cadastrar o trabalhador");
    }
  });
}


}

export default new EmpresaRepository();