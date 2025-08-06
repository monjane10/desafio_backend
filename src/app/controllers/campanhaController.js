import CampanhaRepository from "../repositories/campanhaRepository.js";

class CampanhaController {

    async store(req, resp){
             const campanha = req.body;
             if (!campanha.nome || !campanha.empresa_id || !campanha.data_inicio || !campanha.data_fim) {
                return resp.status(400).send({ message: "Todos os campos são obrigatórios" });
             }
            const linha = await CampanhaRepository.create(campanha);
             resp.json(linha);
            }
    
}

export default new CampanhaController();