function calcularBolsa ({
    renda,
    pais_juntos,
    contato_pai,
    estudou_escola_particular,
    raca
}){
    let pontuacao = 0

    if(Number(renda) <=3400){
        pontuacao +=3
    }
    if (pais_juntos === false){
        pontuacao +=3
    }
    if (contato_pai === false){
        pontuacao +=3
    }
    if (estudou_escola_particular === false){
        pontuacao +=3
    }
    if (raca === "preta" || raca === "indigina"){
        pontuacao +=3
    }
    

    const status_bolsa = pontuacao >=7 ? "aprovado" : "reprovado"
    
    return{
        pontuacao,
        status_bolsa
    }
}

module.exports = calcularBolsa