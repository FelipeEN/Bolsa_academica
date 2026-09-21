require("dotenv").config()
const express = require("express")
const cors = require("cors")

const participantesRoutes = require("./routes/participantes.routes")
const administradoresRoutes = require("./routes/administradores.routes")

const app = express()

app.use(cors())
app.use(express.json())


app.get("/", (req, res) => {
    res.json({
        mensagem: "API Bolsa Acadêmica funcionando!"
    })
})

app.get("/api/teste", async (req,res)=>{
    res.json({
        mensagem : "rota do api funcionando"
    })    
})

app.use("/api/participantes", participantesRoutes)
app.use("/api/administradores" , administradoresRoutes)

const porta = 3000

app.listen(porta, () => {
    console.log("Servidor rodando na porta 3000")
})
