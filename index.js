import express from "express"
import connectDB from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import fileRoutes from './routes/file.routes.js'
import mailRoutes from './routes/mail.routes.js'

const app = express();
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/files', fileRoutes)
app.use('/api/mails', mailRoutes)

connectDB()

app.get('/', (req, res)=>{
    res.send("Coldmailer API is running");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});