let participantes = JSON.parse(localStorage.getItem( "participantes")) || []

let aprovados = participantes.filter((e)=>{
    return e.statusBolsaAluno >=7
})

let reprovados = participantes.filter((e)=>{
   return e.statusBolsaAluno <7
})

const alunosAprovados = document.getElementById("aprovados")
const alunosReprovados = document.getElementById("reprovados")

const btnSair = document.getElementById("sair")

function voltarHome (){
    window.location.href ="../../index.html"
}
btnSair.addEventListener('click', ()=>{
    voltarHome()
})

aprovados.forEach((e)=>{
    
    alunosAprovados.innerHTML +=`
    <div>
        <p>Nome: ${e.nomeAluno}</p>
        <p>Cpf: ${e.cpfAluno}</p>
        <p>Pontuação: ${e.statusBolsaAluno} </p>
        <p>--------------------------</p>
    </div>

    `

})

reprovados.forEach((e)=>{

    alunosReprovados.innerHTML += `
        <div>
            <p>Nome: ${e.nomeAluno}</p>
            <p>Cpf: ${e.cpfAluno}</p>
            <p>Pontuação: ${e.statusBolsaAluno} </p>
            <p>--------------------------</p>
        </div>
    
    `
})


