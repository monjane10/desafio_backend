import { Router } from "express"
import EmpresaController from './app/controllers/empresaController.js';
import CampanhaController from './app/controllers/campanhaController.js';
import TecnicoController from './app/controllers/tecnicoController.js';
import ProductorController from './app/controllers/productorController.js';


const router = Router();


router.post("/empresas", EmpresaController.store);
router.post("/campanhas", CampanhaController.store);
router.post("/tecnicos", TecnicoController.store);
router.post("/produtores", ProductorController.store);
router.post("/produtores/atribuir", ProductorController.atribuir);
router.put("/produtores/transferir", ProductorController.transferir);
router.get('/tecnicos/:id/produtores', TecnicoController.listarProdutoresPorTecnico);


export default router;