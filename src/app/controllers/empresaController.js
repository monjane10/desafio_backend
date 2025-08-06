import EmpresaRepository from "../repositories/empressaRepository.js";

class EmpresaController {



  async store(req, resp) {
    try {
      const empresa = req.body;
      if (!empresa.nome || !empresa.cnpj || !empresa.telefone || !empresa.email) {
        return resp.status(400).send({ message: "Todos os campos são obrigatórios" });
      }
      const linha = await EmpresaRepository.create(empresa);
      resp.json(linha);
    } catch (error) {
      console.error("Erro ao criar empresa:", error);
      return resp.status(500).send({ message: "Erro interno ao criar empresa", erro: error.message });
    }
  }



}




export default new EmpresaController();