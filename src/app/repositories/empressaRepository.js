import conexao, { consulta } from "../database/conexao.js";

class EmpresaRepository {


  create(empresa) {
    const sql = "INSERT INTO empresas(nome,cnpj, telefone, email) VALUES (?, ?, ?, ?)";
    const valores = [empresa.nome, empresa.cnpj, empresa.telefone, empresa.email];
    return consulta(sql, valores, "Erro ao cadastrar a empresa")
      .then((resultado) => {
        return {
          id: resultado.insertId,
          nome: empresa.nome,
          cnpj: empresa.cnpj,
          telefone: empresa.telefone,
          email: empresa.email
        };
      });


  }
}

export default new EmpresaRepository();