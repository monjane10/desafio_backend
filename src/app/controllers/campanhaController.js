import CampanhaRepository from "../repositories/campanhaRepository.js";

class CampanhaController {

  async store(req, resp) {
    try {
      const campanha = req.body;
      if (!campanha.nome || !campanha.empresa_id || !campanha.data_fim) {
        return resp.status(400).send({ message: "Todos os campos são obrigatórios" });
      }
      const linha = await CampanhaRepository.create(campanha);
      return resp.json(linha);
    } catch (error) {
      console.error("Erro ao criar campanha:", error);
      return resp.status(500).send({ message: "Erro interno ao criar campanha", erro: error.message });
    }
  }
}


export default new CampanhaController();