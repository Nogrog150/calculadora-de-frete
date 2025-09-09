// IMPORTANDO OS MODULOS QUE SERÃO UTILIZADOS NA APLICAÇÃO
const express =require("express");
// PERMITE QUE O SERVIDOR ACEITE REQUISIÇÕES DE DIFERENTES ORIGENS(DOMÍNIOS)
const cors =require("cors");

//CRIAR UMA INSTÂNCIA DA APLICAÇÃO 
const app = express();

// DEFINIR A PORTA QUE O SERVIDOR IRÁ ESCUTAR
const port =3001;
// CONFIGURAR O EXPRESS PARA ANALISR REQUISIÇÕES NO CORPO DA PÁGINA COM FORMATO JSON
app.use(express.json());
// HABILITA O CORS PARA QUE TODAS AS ROTAS DA APLICAÇÃO SEJA PERMITIDA.
app.use(cors());

// OBJETO QUE REPRESENTA COMO UMA TABELA DO BANCO DE DADOS, 
const precos={
    bicicleta:5.90, //PREÇO POR KM PARA BIKE
    carro:9.50, //PREÇO POR KM PARA CARRO
    drone:13.50 //PREÇO POR KM PARA DRONE
}

// CRIANDO A ROTA DA API DO TIPO POST
app.post("/calcularfrete",(req,res)=>{

    // desestruturação com as requisições que serão utilizadas no corpo
    const {distancia, tipoTransporte}= req.body

    if(distancia === undefined || tipoTransporte === undefined) {
        return res.status(400).json({error:"Distância e Tipo de transportes obrigatórios"})
    }
    // Busca o preço por km no objeto convertenddo o tipo de transpore para minúsculas
    const precoPorKm = precos[tipoTransporte.toLowerCase()];

    if(precoPorKm === undefined){
         return res.status(400).json({error:"tipo de transporte inválido"})
    }

    // CALCULAR O VALOR TOTAL DO FRETE 

    const valorTotal = distancia * precoPorKm; 
    res.json({valorTotal: valorTotal.toFixed(2)})//arredonda para 2 casas decimais
})


// INICIA O SERVIDOR PARA QUE POSSA ESCUTAR AS REQUISIÇÕES
app.listen(port,()=>{
    console.log("Servidor Rodando em http://localhost:3001")
})
