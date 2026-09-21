const jwt = require("jsonwebtoken")

function verificarToken(req,res,next){
    try{
        const autorizacao = req.headers.authorization

        if(!autorizacao){
            return res.status(401).json({
                mensagem : "Token não informado"
            })
        }

        const partes = autorizacao.split(" ")
        
        const tipo = partes[0]
        const token = partes[1]


        if (tipo !== "Bearer" || !token){
            return res.status(401).json({
                mensagem : "Formato de Token invalido"
            })
        }

        const usuario = jwt.verify(
            token, process.env.JWT_SECRET
        )

        req.usuario = usuario

        next()

    }catch(error){
        console.log(error)

      return res.status(401).json({
            mensagem : "Token inválido ou expirado"
        })
    }
}

module.exports = verificarToken