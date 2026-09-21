const pool = require("../database/connection")
const calcularBolsa = require ("../services/bolsa.service")

async function listarParticipantes (req,res){
    try{
        const resultado = await pool.query(
            "SELECT * FROM participantes"
        )

        res.json(resultado.rows)
    }catch(error){
        console.log(error)
    
        res.status(500).json({
            mensagem: "erro ao buscar participantes"
        })
    }
    
}
async function cadastrarParticipante (req,res){

    try{
          const {
            nome,
            cpf,
            renda,
            pais_juntos,
            contato_pai,
            estudou_escola_particular,
            raca
       
        } = req.body

        const erros = []

        if(!nome || nome.trim() === ""){
            erros.push("Nome é Obrigatorio")
        }

        if (!cpf || ! /^\d{11}$/.test(String(cpf))){
            erros.push("CPF deve ter 11 números")
        }

        if (renda ===undefined ||
            renda ===null||
            renda ===""||
            Number.isNaN(Number(renda))||
            Number(renda) < 0
        ){
            erros.push("Renda deve ser maior ou igual a 0")
        }

        if (typeof pais_juntos !== "boolean"){
            erros.push("Pais_juntos deve ser true ou false")
        }
        if (typeof  contato_pai!== "boolean"){
            erros.push("contato_pai deve ser true ou false")
        }
        if (typeof estudou_escola_particular !== "boolean"){
            erros.push("estudou_escola_particular deve ser true ou false")
        }
        if(!raca || raca.trim() === ""){
            erros.push("Raça é obrigatoria")
        }

        if(erros.length > 0 ){
            return res.status(400).json({
                mensagem : "Dados Invalidos",
                erros
            })
        }

        const resultadoBolsa = calcularBolsa({
            renda,
            pais_juntos,
            contato_pai,
            estudou_escola_particular,
            raca
        })

        const resultado = await pool.query(
            `
                INSERT INTO participantes
                (
                    nome,
                    cpf,
                    renda,
                    pais_juntos,
                    contato_pai,
                    estudou_escola_particular,
                    raca,
                    pontuacao,
                    status_bolsa
                )
                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
                RETURNING *
            `,
            [
                nome,
                cpf,
                renda,
                pais_juntos,
                contato_pai,
                estudou_escola_particular,
                raca,
                resultadoBolsa.pontuacao,
                resultadoBolsa.status_bolsa
            ]
        )
        res.status(201).json(resultado.rows[0])
    }
    catch(error){
        console.log(error)
        if(error.code ==="23505"){

            return res.status(409).json({
                mensagem: "CPF já cadastrado"
            })
        }
        res.status(500).json({
            mensagem: "erro ao cadastrar o participante "
        })
    }

}

async function buscarParticipantePorCpf (req,res){
    try{
        const {cpf} = req.params

        const resultado = await pool.query(
            `
                SELECT * FROM participantes
                WHERE cpf = $1 
            `,
            [cpf]
        )
         if (resultado.rows.length === 0){
            
            return res.status(404).json({
                mensagem : "Participante não encontrado"
            })
         }
         
         res.json(resultado.rows[0])

    }catch(error){
        console.log(error)
        
        res.status(500).json({
            mensagem: "Erro ao buscar participante"
        })
    }
}

module.exports={
    listarParticipantes,
    cadastrarParticipante,
    buscarParticipantePorCpf
}