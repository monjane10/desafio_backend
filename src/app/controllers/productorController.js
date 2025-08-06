import ProdutorRepository from "../repositories/produtorRepository.js";

class ProdutorController {
     async store(req, resp){
                     const productor = req.body;
                     if (!productor.nome || !productor.localizacao) {
                        return resp.status(400).send({ message: "Todos os campos são obrigatórios" });
                     }
                    const linha = await ProdutorRepository.create(productor);
                     resp.json(linha);
                    }
    }
export default new ProdutorController();