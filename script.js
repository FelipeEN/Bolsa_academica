const nome = document.querySelector("#nome")
const renda = document.querySelector("#renda")
const estruFami = document.querySelector("#estruFami")
const relaComPai = document.querySelector("#relaComPai")
const colegioParti = document.querySelector("#colegioParti")
const racas = document.querySelector("#racas")

const cpf = document.querySelector("#cpf")
const cpfVerifi = document.querySelector("#cpfVerifi")

let mensagem = document.querySelector("#mensagem")

const btnVerificar = document.getElementById("btnVerificar")

const form = document.querySelector('form')


form.addEventListener('submit', async (e) =>{
    
    e.preventDefault()
    
    let cpfValue = cpf.value
    let nomeValue = nome.value
    let rendaValue = Number(renda.value)
    let estruFamiValue = String(estruFami.value)
    let relaComPaiValue = String(relaComPai.value)
    let colegioPartiValue = String(colegioParti.value)
    let racasValue = String(racas.value)
    

    if (!nomeValue|| 
            !rendaValue ||
            !racasValue ||
            !estruFamiValue||
            !relaComPaiValue||
            !colegioPartiValue ||
            !cpfValue )
        {
            mensagem.innerHTML = `Preencha os campos vazios` 
        return
        }
        if(cpf.value.length !== 11){
            mensagem.innerHTML = `Preencha corretamente o cpf`
            return
        }

    //-----------------------------------------
       const dados = {
        nome : nomeValue,
        cpf: cpfValue,
        renda: rendaValue,

        pais_juntos : estruFamiValue === "sim",
        contato_pai : relaComPaiValue === "sim",
        estudou_escola_particular : colegioPartiValue === "sim",
        

        raca : racasValue
       }
    
       console.log("Eviando dados para API",dados)

       const {resposta,resultado} = await cadastrarParticipantes(dados)

       if (resposta.status === 409){
        mensagem.innerHTML = resultado.mensagem
        return
       }

       if(resposta.status === 400){
        mensagem.innerHTML = resultado.erros.join("<br>")
        return
       }

       if(!resposta.ok){
        mensagem.innerHTML = resultado.mensagem || `Erro ao cadastrar participante`
        return
       }


       if(resposta.status === 201){
            if(resultado.status_bolsa === "aprovado"){
                mensagem.innerHTML = 
                `
                    Aluno(a) ${resultado.nome} foi Aprovado(a)
                    com uma pontuação de requerimento à bolsa de
                    ${resultado.pontuacao} pontos.
                `
            }else{
                mensagem.innerHTML = 
                `
                    Acreditamos a partir das suas respostas ao questionário,
                    que existam mais pessoas que precisam dessa bolsa de estudos.
                    Obrigado ${resultado.nome}.
                `
            }
       }
})
                


btnVerificar.addEventListener('click',()=>{
    
    const cpfVerificarValue = cpfVerifi.value.trim()
    
    verificarStatus(cpfVerificarValue)
})

const informacao = document.querySelector("#informacao")


async function verificarStatus(cpf){
    
    if(!cpf){
        mensagem.innerHTML= `Digite um CPF`
        return
    }

    if(cpf.length !== 11){
        mensagem.innerHTML= `Digite um CPF com 11 numeros`
        return
    }

    try{
        const resposta = await fetch(
            `http://localhost:3000/api/participantes/${cpf}`

        )
        const resultado = await resposta.json()

        if(resposta.status === 404){
            informacao.innerHTML =`CPF não consta no sistema` 
            return
        }

        if (!resposta.ok){
            informacao.innerHTML = resultado.mensagem || "Erro ao consultar CPF"
            return
        }

        informacao.innerHTML = `
            Aluno(a): ${resultado.nome}
            <br>
            CPF: ${resultado.cpf}
            <br>
            Pontuação:${resultado.pontuacao}
            <br>
            Status: ${resultado.status_bolsa}

        `

    }catch(error){
        console.log(error)
        informacao.innerHTML =`Não foi possivel consultar no sistema`
    }
 
   
    
}

const btnIrAdm = document.getElementById("irAdm")

function irAdm (){
        window.location.href = "./pages/adm/adm.html";
    }
    btnIrAdm.addEventListener('click', ()=>{
    irAdm()
})

async function cadastrarParticipantes(dados){
  const resposta = await fetch(
      "http://localhost:3000/api/participantes",
      
      {
          method: "POST",

          headers:{
              "Content-Type": "application/json"
          },
          
          body : JSON.stringify(dados)
      }
  )
    const resultado = await resposta.json()

  return{
    resposta,
    resultado
  }  
      
}
