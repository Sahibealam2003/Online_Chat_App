require('dotenv').config() 
const express =require('express')
const  connect  = require('./src/config/connect.js')
const app = express()
const cors = require('cors')
const cookie = require('cookie-parser')
const authRoute = require('./src/routes/authRoutes.js')

cors({
    origin : '*'
})
app.use(express.json())
app.use(cookie())


app.use('/api/auth',authRoute)


try {
    connect()
    app.listen(process.env.PORT,()=>{
        console.log("Server is runnig on porrt "+process.env.PORT);
        
    })
} catch (error) {
    console.log('Server is not runnig')
    
}