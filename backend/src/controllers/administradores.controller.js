const bcrypt = require ("bcrypt")
const pool = require("../database/connection")

const jwt = require("jsonwebtoken")

async function cadastrarAdministrador (req,res){
    try{
        const {login,senha} =req.body 
        
        const erros = []

        if(!login || login.trim() === ""){
            erros.push("Login é obrigatório")
            
        }
        if(!senha || senha.trim() === ""){
            erros.push("Senha é obrigatório")
         
        }

        if (senha && senha.length <6){
            erros.push("Senha deve ter pelo menos 6 digitos")
          
        }

        if (erros.length >0){
            return  res.status(400).json({
                mensagem : "Dados Invalidos",
                erros
            })
        }

   

        const senhaHash  = await bcrypt.hash(senha,10)

        const resultado = await pool.query(
            `
                INSERT INTO administradores (
                    login,
                    senha_hash
                )VALUES ($1,$2)
                RETURNING id, login, criado_em
                
            `,
            [login,senhaHash]
        )

        res.status(201).json(resultado.rows[0])

 

    }catch(error){
            console.log(error)

            if(error.code === "23505"){
               return res.status(409).json({
                    mensagem: "Login ja cadastrado"
                })
            }
            res.status(500).json({
                mensagem : "Erro ao cadastrar administrador"
            })
    }
}

async function loginAdministrador (req,res){
    try{
        const {login,senha}= req.body

        if (!login || !senha){
            return res.status(400).json({
                mensagem : "Login e senha são obrigatórios"
            })
        }

        const resultado = await pool.query(
            `
                SELECT * FROM administradores
                WHERE login = $1
            `, 
            [login]
        )

        if (resultado.rows.length === 0){
            return res.status(401).json({
                mensagem : "Senha ou login inválidos"
            })
        }

        const administrador = resultado.rows[0]

        const senhaCorreta = await bcrypt.compare(senha, administrador.senha_hash)

        if (!senhaCorreta){
            return res.status(401).json({
                mensagem : "Senha ou login inválidos"
            })
        }

        const token =jwt.sign(
            {
                id: administrador.id,
                login: administrador.login
            }
            ,process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        res.json({
            mensagem : "Login realizado com sucesso",
            token : token,
            administrador :{
                id : administrador.id,
                login : administrador.login
            }
        })

    }catch(error){

        console.log(error)

        res.status(500).json({
            mensagem: "Erro ao realizar login"
        })
    
    }
}

async function perfilAdministrador (req,res){
    res.json({
        mensagem : "Token Válido",
        administrador : req.usuario
    })
}
module.exports = {
    cadastrarAdministrador,
    loginAdministrador,
    perfilAdministrador
}