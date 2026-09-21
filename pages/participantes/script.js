const alunosAprovados = document.getElementById("aprovados")
const alunosReprovados = document.getElementById("reprovados")

const btnSair = document.getElementById("sair")



async function carregarParticipantes (){
    const token = localStorage.getItem("token")

    if(!token){
    window.location.href = "../../index.html"
    return
    }

    try{
        const resposta = await fetch(
            "http://localhost:3000/api/participantes",
            {
                method: "GET",
                
                headers:{
                    "Authorization": `Bearer ${token}`
                }
            }
        ) 


        const resultado = await resposta.json()

        if (!resposta.ok){
            console.log(resultado)

            if(resposta.status === 401){
                localStorage.removeItem("token")
                window.location.href = "../../index.html"
                return
            }

            return
        }


        const aprovados = resultado.filter((e)=>{
            return e.pontuacao >=7
        })


        const reprovados = resultado.filter((e)=>{
            return e.pontuacao <7
        })


        aprovados.forEach((e)=>{
            alunosAprovados.innerHTML +=
            `
                 <div>
                    <p>Nome: ${e.nome}</p>
                    <p>CPF: ${e.cpf}</p>
                    <p>Pontuação: ${e.pontuacao}</p>
                    <p>--------------------------</p>
                </div>
            `
        })
        reprovados.forEach((e)=>{
            alunosReprovados.innerHTML +=
            `
                 <div>
                    <p>Nome: ${e.nome}</p>
                    <p>CPF: ${e.cpf}</p>
                    <p>Pontuação: ${e.pontuacao}</p>
                    <p>--------------------------</p>
                </div>
            `
        })

    }catch(error){
        console.log(error)
    }

}

btnSair.addEventListener('click' , ()=>{
    localStorage.removeItem("token")
    window.location.href = "../../index.html"
})

carregarParticipantes()