const login = document.querySelector("#login")
const senha = document.querySelector("#senha")

const entrar = document.getElementById("entrar")

const form = document.querySelector('form')

let mensagem = document.querySelector("#mensagem")




function irParaParticipantes (){
    window.location.href = "../participantes/resulParti.html";
}

entrar.addEventListener('click', async ()=>{


    let loginValue = login.value.trim()
    let senhaValue = senha.value.trim()

    if(!loginValue || !senhaValue ){
        mensagem.innerHTML = `preencha os campos nescessarios` 
        return
    }
   try{
    const resposta = await fetch(
        
        "http://localhost:3000/api/administradores/login",
        {
            method: "POST",

            headers:{
                "Content-Type": "application/json"
            },

            body : JSON.stringify({
                login : loginValue,
                senha : senhaValue
            })
        }
    )


    const resultado = await resposta.json()



    if(!resposta.ok){
        if(resultado.erros){
            mensagem.innerHTML = resultado.erros.join("<br>")
        }else{
            mensagem.innerHTML = resultado.mensagem
        }

        return
    }

    localStorage.setItem("token",resultado.token)

    mensagem.innerHTML = `login realizado com sucesso`

    irParaParticipantes()
            

   }catch(error){
        console.log(error)

        mensagem.innerHTML = `Não foi possivel conectar ao servidor` 
   }
    
})

const cadastrar = document.getElementById("cadastrar")

cadastrar.addEventListener("click", async () => {

    const loginValue = login.value.trim()
    const senhaValue = senha.value.trim()

    if (!loginValue || !senhaValue) {
        mensagem.innerHTML = "Preencha os campos necessários"
        return
    }
    try {

        const resposta = await fetch(
            "http://localhost:3000/api/administradores",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    login: loginValue,
                    senha: senhaValue
                })
            }
        )

        const resultado = await resposta.json()

       if(!resposta.ok){
        if(resultado.erros){
            mensagem.innerHTML = resultado.erros.join("<br>")
        }else{
            mensagem.innerHTML = resultado.mensagem
        }

        return
    }

        mensagem.innerHTML = "Administrador cadastrado com sucesso!"

    } catch (error) {

        console.log(error)

        mensagem.innerHTML =
            "Não foi possível conectar ao servidor"
    }
})
