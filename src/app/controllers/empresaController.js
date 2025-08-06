import EmpresaRepository from "../repositories/empressaRepository.js";

class EmpresaController {



       async store(req, resp){
  const empresa = req.body;
  if (!empresa.nome || !empresa.cnpj || !empresa.telefone || !empresa.email) {
    return resp.status(400).send({ message: "Todos os campos são obrigatórios" });
  }
  const linha = await EmpresaRepository.create(empresa);
  resp.json(linha);
}
}


export default new EmpresaController();