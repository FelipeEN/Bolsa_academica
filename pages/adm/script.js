const login = document.querySelector("#login")
const senha = document.querySelector("#senha")

const entrar = document.getElementById("entrar")

const form = document.querySelector('form')

let mensagem = document.querySelector("#mensagem")

let adms = JSON.parse(localStorage.getItem("adms")) || []

function verificarAdm (login){
    let verificar = adms.find((e)=>{
     return login === e.login 
    })
    return verificar   
}
function verificarCadastro (login,senha){
    let verificar = adms.find((e)=>{
     return login === e.login && senha === e.senha
    })
    return verificar   
}

function irParaParticipantes (){
    window.location.href = "../participantes/resulParti.html";
}

form.addEventListener('submit', (e)=>{

    e.preventDefault()

    let loginValue = login.value
    let senhaValue = senha.value

    if(!loginValue || !senhaValue ){
        mensagem.innerHTML = `preencha os campos nescessarios` 
        return
    }

    let status = verificarAdm(loginValue) 
    if (status){
        mensagem.innerHTML = `Usuário ja cadastrado` 
        return
    }

    adms.push({
        login : loginValue,
        senha: senhaValue
    })

    localStorage.setItem("adms", JSON.stringify(adms))
    
    mensagem.innerHTML = `Adm Cadastrado com sucesso` 
    
})


entrar.addEventListener("click", ()=>{
  
    const loginValue = login.value
    const senhaValue = senha.value

    let status = verificarCadastro (loginValue, senhaValue)

    if (!status){
         mensagem.innerHTML = `Senha ou login incorretos` 
         return
    }else{

        irParaParticipantes()
    }
    
})
