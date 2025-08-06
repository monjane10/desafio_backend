import TecnicoRepository from "../repositories/tecnicoRepository.js";

class TecnicoController {
        async store(req, resp){
                 const tecnico = req.body;
                 if (!tecnico.nome || !tecnico.campanha_id) {
                    return resp.status(400).send({ message: "Todos os campos são obrigatórios" });
                 }
                const linha = await TecnicoRepository.create(tecnico);
                 resp.json(linha);
                }
}

export default new TecnicoController();