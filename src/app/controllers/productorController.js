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
      
      
     async atribuir(req, resp) {
            const { produtor_id, tecnico_id, campanha_id } = req.body;
             if (!produtor_id || !tecnico_id || !campanha_id) {
              return resp.status(400).json({ message: "os IDs do produtor, tecnico e campanha são obrigatórios." });
             }
             try {
                 const resultado = await ProdutorRepository.atribuirProdutor(produtor_id, tecnico_id, campanha_id);
                  resp.status(201).json(resultado);
             } catch (erro) {
                 resp.status(500).json({ message: erro });
            }
  }
}
    
export default new ProdutorController();