
import express from 'express';
import EmpresaController from './app/controllers/empresaController.js';
import CampanhaController from './app/controllers/campanhaController.js';
import TecnicoController from './app/controllers/tecnicoController.js';
import ProductorController from './app/controllers/productorController.js';



const app = express();
app.use(express.json());


app.post("/empresas", EmpresaController.store);
app.post("/campanhas", CampanhaController.store);
app.post("/tecnicos", TecnicoController.store);
app.post("/produtores", ProductorController.store);
app.post("/produtores/atribuir", ProductorController.atribuir);



export default app;