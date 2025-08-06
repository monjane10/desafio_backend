import app from "./src/index.js";



const porta = 3000;



app.listen(porta, () => {
  console.log("servidor rondando na porta" + " " + porta);
});
