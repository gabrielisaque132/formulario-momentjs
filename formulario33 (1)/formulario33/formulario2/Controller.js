//Constantes
const express=require('express');
const bodyParser=require('body-parser');
const model=require('./models')

const cors=require('cors');

let app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//routes

//rota da tabela User Formulario de apontamento de tareafas
app.post('/Formulario',async(req,res)=>{
  let reqs = await model.Formulario.create({
    'tarefa':req.body.nameTarefa,
    'horaInicial':req.body.nameHora,
    'horaFinal':req.body.nameHorafinal,
    'difHora':req.body.nameDifhora,
    'peso':req.body.namePeso,
    'material':req.body.nameMaterial,
    'observacao':req.body.nameTexto,
    'createdAt': new Date(),
    'updatedAt':new Date(),
    
  });
  
  if(reqs){
      res.send(JSON.stringify('os dados foram salvos no banco com sucesso'))
  }

});
//rota da tabela Ponto Formulario de apontamento de tareafas
app.post('/Ponto',async(req,res)=>{
  let reqs = await model.Ponto.create({
    'equipamentos':req.body.nameEquipamento,
    'turnos':req.body.nameTurno,
    'contInicial':req.body.nameContinicial,
    'contFinal':req.body.nameContfinal,
    'createdAt': new Date(),
    'updatedAt':new Date(),
    
  });

  
  if(reqs){
      res.send(JSON.stringify('os dados foram salvos no banco com sucesso'))
  }

});

//rota da tabela Ponto Formulario de apontamento de horas improdutivas
app.post('/Horaimprodutiva',async(req,res)=>{
  let reqs = await model.resgistroHoraImprodutiva.create({
    'codHoraImprodutiva':req.body.namecodHoraImprodutiva,
    'horainicial':req.body.nameHora,
    'contFinal':req.body.nameHorafinal,
    'createdAt': new Date(),
    'updatedAt':new Date(),
    
  });

  
  if(reqs){
      res.send(JSON.stringify('os dados foram salvos no banco com sucesso'))
  }

});

// Rota para a requisção da informação da tabela ponto para a exibiçao no frontend na flatlist
app.post('/teste',async(req,res)=>{
  console.log(req.body.teste)
   const pontos = await model.Ponto.findAll();
   // true
  console.log("All pontos:", JSON.stringify(pontos, null, 2));
  
  if(pontos){
    res.send(JSON.stringify(pontos))
}

    });


//start server
let port=process.env.PORT || 3000;
app.listen(port, (req,res)=>{
  console.log('Servidor rodou eu acho');
  console.log(port);
});