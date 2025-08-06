
import express from 'express';
import EmpresaController from './app/controllers/empresaController.js';
import CampanhaController from './app/controllers/campanhaController.js';



const app = express();
app.use(express.json());


app.post("/empresas", EmpresaController.store);
app.post("/campanhas", CampanhaController.store);


export default app;