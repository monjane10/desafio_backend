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


     async listarProdutoresPorTecnico(req, res) {
  const tecnico_id = req.params.id;

  if (!tecnico_id) {
    return res.status(400).send({ message: "O ID do técnico é obrigatório" });
  }

  try {
    const produtores = await TecnicoRepository.listarProdutoresPorTecnico(tecnico_id);

    if (!produtores || produtores.length === 0) {
      return res.status(404).send({ message: "Nenhum produtor encontrado para este técnico." });
    }

    return res.status(200).json(produtores);
  } catch (erro) {
    console.error("Erro ao buscar produtores:", erro);
    return res.status(500).send({ message: "Erro ao buscar produtores", erro: erro.message });
  }
}

}

export default new TecnicoController();