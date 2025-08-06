
import express from 'express';
import EmpresaController from './app/controllers/empresaController.js';



const app = express();
app.use(express.json());


app.post("/empresas", EmpresaController.store);


export default app;