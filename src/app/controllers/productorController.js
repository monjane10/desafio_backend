import ProdutorRepository from "../repositories/produtorRepository.js";

class ProdutorController {
   async store(req, resp) {
      try {
         const productor = req.body;
         if (!productor.nome || !productor.localizacao) {
            return resp.status(400).send({ message: "Todos os campos são obrigatórios" });
         }
         const linha = await ProdutorRepository.create(productor);
         resp.json(linha);
      } catch (error) {
         console.error("Erro ao criar produtor:", error);
         return resp.status(500).send({ message: "Erro interno ao criar produtor", erro: error.message });
      }
   }

   /***
  * Author: Lourenco Monjane
  * Metodo para atribuir um produtor a um técnico */

   async atribuir(req, resp) {
      const { produtor_id, tecnico_id, campanha_id } = req.body;
      if (!produtor_id || !tecnico_id || !campanha_id) {
         return resp.status(400).json({ message: "os IDs do produtor, tecnico e campanha são obrigatórios." });
      }
      try {
         const resultado = await ProdutorRepository.atribuirProdutorATecnico(produtor_id, tecnico_id, campanha_id);
         resp.status(201).json(resultado);
      } catch (erro) {
         resp.status(500).json({ message: erro.message });
      }
   }

   /***
    * Author: Lourenco Monjane
    * Metodo para transferir um produtor de um técnico para outro*/

   async transferir(req, resp) {
      const { produtor_id, tecnico_antigo_id, tecnico_novo_id, campanha_id } = req.body;
      if (!produtor_id || !tecnico_antigo_id || !tecnico_novo_id || !campanha_id) {
         return resp.status(400).json({
            message: "os IDs do produtor, do antigo tecnico, do novo tecnico e da campanha são obrigatórios."
         });
      }

      try {
         const resultado = await ProdutorRepository.transferirProdutor(
            produtor_id,
            tecnico_antigo_id,
            tecnico_novo_id,
            campanha_id
         );
         return resp.status(200).json(resultado);
      } catch (erro) {
         return resp.status(500).json({ message: erro });
      }
   }
}


export default new ProdutorController();