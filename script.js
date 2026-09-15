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

let statusBolsa = 0 


let participantes = JSON.parse(localStorage.getItem("participantes")) || []

function valida (cpf){
    let  ok = false
    const validar = participantes.forEach((e)=>{
        if (cpf === e.cpfAluno){
            ok = true
        }
    }
)
return ok 
}
form.addEventListener('submit', (e) =>{
    
    e.preventDefault()
    
    let cpfValue = cpf.value
    let nomeValue = nome.value
    let rendaValue = Number(renda.value)
    let estruFamiValue = String(estruFami.value)
    let relaComPaiValue = String(relaComPai.value)
    let colegioPartiValue = String(colegioParti.value)
    let racasValue = String(racas.value)
    

    if (!nomeValue|| !rendaValue || !racasValue ||!estruFamiValue|| !relaComPaiValue||!colegioPartiValue || !cpfValue)
        {
            mensagem.innerHTML = `Preencha os campos vazios` 
        return
        }
        if(cpf.value.length !== 11){
            mensagem.innerHTML = `Preencha corretamente o cpf`
            return
        }

  
        let boolean = valida(cpfValue)
        
        if (boolean === true){
            mensagem.innerHTML = `Cpf ja cadastrado no sistema, para conseguir uma bolsa`
            return
        }

    //-----------------------------------------
        if (rendaValue <= 3400){
            statusBolsa += 3 
        }

        if(estruFamiValue === "nao"){
            statusBolsa += 3
        }

        if(relaComPaiValue === "nao"){
            statusBolsa += 3
        }
        if(colegioPartiValue === "nao"){
            statusBolsa += 3
        }
        if(racasValue === "preta" || racasValue ==="indigina")  {
            statusBolsa += 3
        }
        
        if (statusBolsa >=7){
            mensagem.innerHTML= `Aluno(a) ${nomeValue} foi Aprovado(a)
             com uma pontuação de requerimento à bolsa de ${statusBolsa} pontos.` 
        }else{
            mensagem.innerHTML = `Acreditamos aparti das suas respostas ao questionario,
            que existam mais pessoas que precisam dessa bolsa de estudos. Obrigado ${nomeValue} `
        }

    

            participantes.push( {
                nomeAluno: nomeValue,
                cpfAluno : cpfValue,
                statusBolsaAluno : statusBolsa
            }) 
        
            localStorage.setItem("participantes", JSON.stringify(participantes))

        zeraPontuação()

})


btnVerificar.addEventListener('click',()=>{
    
    let cpfVerificarValue = cpfVerifi.value
    
    verificarStatus(cpfVerificarValue)
})

const informacao = document.querySelector("#informacao")

function zeraPontuação (){
    statusBolsa = 0
}
function verificarStatus(cpf){
    
    const status = participantes.find((e)=>{
        return cpf === e.cpfAluno
    })
 
    if (status){
             
            informacao.innerHTML = `
            Aluno(a) ${status.nomeAluno} 
            <br> CPF = ${status.cpfAluno} 
            <br> Nota = ${status.statusBolsaAluno} 
            `            
    }   else{
            informacao.innerHTML = `CPF não consta no sistema` 
        }
    
}
            



